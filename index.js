'use strict'

const Crate = require('./lib/Crate')
const StorageProvider = require('./lib/StorageProvider')
const FileProcessor = require('./lib/FileProcessor')
const LocalFsStorageProvider = require('./lib/LocalFsStorageProvider')
const crate = new Crate()

module.exports = exports = crate.plugin.bind(crate)
module.exports.StorageProvider = StorageProvider
module.exports.FileProcessor = FileProcessor
module.exports.LocalFsStorageProvider = LocalFsStorageProvider
