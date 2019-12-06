'use strict'

class FileProcessor {

  createFieldSchema () {
    return {
      size: Number,
      name: String,
      type: {
        type: String
      },
      path: String,
      date: Date
    }
  }

  process (attachment, storageProvider, model, callback) {
    storageProvider.save(attachment, (error, path) => {
      model.size = attachment.size
      model.name = attachment.name
      model.type = attachment.type
      model.path = path
      model.date = attachment.date
      callback(error)
    })
  }

  willOverwrite (model) {
    return !!model.path
  }

  remove (storageProvider, model, callback) {
    if (!model.path) {
      return callback()
    }

    storageProvider.remove(model, callback)
  }
}

module.exports = FileProcessor
