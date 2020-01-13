'use strict'

const os = require('os')
const fs = require('fs')
const path = require('path')
const async = require('async')
const check = require('check-types')
const FileProcessor = require('./FileProcessor')
const lodash = require('lodash');

class Crate {
  constructor () {
  }

  _addFields (schema, options) {
    const fields = {}

    Object.keys(options.fields).forEach((field) => {
      fields[field] = options.fields[field].processor.createFieldSchema()

      if (options.fields[field].array) {
        fields[field] = [fields[field]]
      }
    })

    schema.add(fields)
  }

  _validateOptions (options) {
    check.assert.object(options, 'No options were specified!')
    check.assert.object(options.fields, 'No fields were specified!')

    if (!options.tempDir) {
      options.tempDir = os.tmpdir()
    }

    Object.keys(options.fields).forEach((field) => {
      if (!options.fields[field].processor) {
        options.fields[field].processor = new FileProcessor()
      }

      check.assert.function(options.fields[field].processor.createFieldSchema, 'FileProcessor object should implement the createFieldSchema method!')
      check.assert.function(options.fields[field].processor.willOverwrite, 'FileProcessor object should implement the willOverwrite method!')
      check.assert.function(options.fields[field].processor.process, 'FileProcessor object should implement the process method!')
      check.assert.function(options.fields[field].processor.remove, 'FileProcessor object should implement the remove method!')
    })
  }

  _validateProvider (options) {
    check.assert.object(options.storage, 'Please pass a StorageProvider!')
    check.assert.function(options.storage.save, 'Storage object should implement the save method!')
    check.assert.function(options.storage.remove, 'Storage object should implement the remove method!')
  }

  plugin (schema, options) {
    this._validateOptions(options)
    this._validateProvider(options)
    this._addFields(schema, options)

    const self = this

    schema.methods.attach = function (field, attachment, callback) {
      if (!options.fields[field]) {
        const error = new Error('Field "' + field + '" was not registered as an attachment property')

        if (callback) {
          return callback(error)
        }

        return Promise.reject(error)
      }

      if (!attachment || (!attachment.path && !attachment.buffer && !attachment.stream)) {
        const error = new Error('Attachment has no path|buffer|stream property!')

        if (callback) {
          return callback(error)
        }

        return Promise.reject(error)
      }

      let model = this
      let modelArray

      if (options.fields[field].array) {
        modelArray = lodash.get(model,field,undefined)
        model = {}
        lodash.set(model,field,this[field].create());
      }

      // the things we will do to the file
      const tasks = []
      attachment.date = new Date()
      // make sure the file actually exists
      if (attachment.path) {
        tasks.push(next => {
          fs.exists(attachment.path, function (result) {
            next(!result ? new Error('No file exists at ' + attachment.path) : undefined)
          })
        })
      }

      // make sure there's an original name
      if (!attachment.name && attachment.path) {
        tasks.push(next => {
          attachment.name = path.basename(attachment.path)
          next()
        })
      }

      // get the filesize
      if (!attachment.size) {
        if (attachment.path) {
          tasks.push(next => {
            fs.stat(attachment.path, (error, stats) => {
              attachment.size = stats.size
              next(error)
            })
          })
        } else if (attachment.buffer) {
          tasks.push(next => {
            attachment.size = attachment.buffer.length
            next()
          })
        }
      }

      // remove the old file if one already exists
      if (options.fields[field].processor.willOverwrite( lodash.get(model,field,undefined)) ) {
        tasks.push(next => {
          options.fields[field].processor.remove(options.storage, lodash.get(model,field,undefined) , next)
        })
      }

      // process the attachment
      tasks.push(next => {
        options.fields[field].processor.process(attachment, options.storage, lodash.get(model,field,undefined), next)
      })

      const attach = next => {
        async.series(tasks, (error) => {
          if (error) {
            return next(error)
          }

          if (options.fields[field].array) {
            modelArray.push(lodash.get(model,field,undefined))
          }

          next()
        })
      }

      if (!callback) {
        return new Promise((resolve, reject) => {
          attach((error) => {
            if (error) {
              return reject(error)
            }

            resolve()
          })
        })
      }

      attach(callback)
    }

    // register a hook to clean up files before models are deleted
    schema.pre('remove', function (next) {
      const model = this
      const tasks = []

      Object.keys(options.fields).forEach((field) => {
        if (options.fields[field].array) {
            lodash.get(model,field,[]).forEach((arrayField) => {
                tasks.push((callback) => {
                  options.fields[field].processor.remove(options.storage, arrayField, callback)
                })
            })
        } else {
          tasks.push((callback) => {
            options.fields[field].processor.remove(options.storage, lodash.get(model,field,undefined), callback)
          })
        }
      })

      async.parallel(tasks, function (error) {
        next(error)
      })
    })

    schema.virtual('__cached_attachments').get(function () {
      return this.___cached_attachments
    })

    schema.virtual('__cached_attachments').set(function (value) {
      this.___cached_attachments = value
    })

    // store a copy of every attachment property
    schema.post('init', (doc) => {
      const model = doc.toObject()
      doc.__cached_attachments = {}

      Object.keys(options.fields).forEach((field) => {
        if ( lodash.get(model,field,undefined) ) {
          doc.__cached_attachments[field] = JSON.parse(JSON.stringify( lodash.get(model,field,undefined) ))
        }
      })
    })

    // before saving, tidy up any attachments that have been deleted
    schema.pre('save', function (next) {
      const model = this
      const tasks = []

      if (!model.__cached_attachments) {
        return next()
      }

      Object.keys(options.fields).forEach((field) => {
        if (!model.__cached_attachments[field]) {
          return
        }

        if (options.fields[field].array) {
          // deal with attachments that have been deleted from arrays
          model.__cached_attachments[field].forEach((oldDoc) => {
            let present = false

            lodash.get(model,field,[]).forEach((currentDoc) => {
              if (currentDoc._id.equals(oldDoc._id)) {
                present = true
              }
            })

            if (!present) {
              // subDocument has been removed, delete the attachment
              tasks.push((callback) => {
                options.fields[field].processor.remove(options.storage, oldDoc, callback)
              })
            }
          })
        } else if (model.isModified(field)) {
          // if the attachment has been modified and there was an old one, remove the old version
          tasks.push((callback) => {
            options.fields[field].processor.remove(options.storage, model.__cached_attachments[field], callback)
          })
        }
      })

      async.parallel(tasks, (error) => {
        next(error)
      })
    })
  }
}

module.exports = Crate
