var fs = require('fs')
var mv = require('mv')
var path = require('path')
var mkdirp = require('mkdirp')
var async = require('async')
var check = require('check-types')
var _ = require('underscore')

class LocalFsStorageProvider {
  constructor (options) {
    this._options = options

    check.assert.object(this._options, 'Please pass some options to LocalFS')
    let dirCheck = !_.isString(this._options.directory) && !_.isFunction(this._options.directory)
    if (!dirCheck) {
      throw new Error('directory must be string or function')
    }
    if (_.isFunction(this._options.path)) {
      this._options.path = (attachment) => {
        return '/' + path.basename(attachment.path)
      }
    }
  }

  save (attachment, callback) {
    let dir = this._options.directory
    if (_.isFunction(dir)) {
      dir = this._options.directory.apply(attachment)
    }
    const target = path.resolve(path.join(dir, this._options.path(attachment)))

    if (target.substring(0, this._options.directory.length) !== this._options.directory) {
      return callback(new Error('Will only store files under our storage directory'))
    }

    async.series([(callback) => {
      mkdirp(this._options.directory, callback)
    }, (callback) => {
      if (attachment.path) {
        mv(attachment.path, target, callback)
      } else if (attachment.stream) {
        const writeStream = fs.createWriteStream(target)
        attachment.stream.once('error', callback)
        attachment.stream.pipe(writeStream).once('finish', function () {
          if (attachment.size) {
            return callback()
          }
          fs.stat(attachment.path, (error, stats) => {
            if (!error) {
              attachment.size = stats.size
            }
            callback()
          })
        })
      } else if (attachment.buffer) {
        fs.writeFile(target, attachment.buffer, callback)
      }
    }], (error) => {
      callback(error, target)
    })
  }

  remove (attachment, callback) {
    if (!attachment.url) {
      return callback()
    }

    if (attachment.url.substring(0, this._options.directory.length) !== this._options.directory) {
      return callback(new Error('Will not delete files that are not under our storage directory'))
    }

    fs.unlink(attachment.url, (error) => {
      if (error && error.code === 'ENOENT') {
                // file did not exist before deletion
        error = null
      }

      callback(error)
    })
  }
}

module.exports = LocalFsStorageProvider
