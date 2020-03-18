'use strict'

const StorageProvider = require('../../src/classes/StorageProvider')

class StubStorageProvider extends StorageProvider {
  save (path, callback) {
    callback(null, path)
  }

  remove (attachment, callback) {
    callback()
  }
}

module.exports = StubStorageProvider
