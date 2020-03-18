'use strict'

const mongoose = require('mongoose')
import crate, { FileProcessor } from '../../src/index'
const sinon = require('sinon')
const randomString = require('./randomString')

module.exports = (callback) => {
  const storage = {
    save: sinon.stub(),
    remove: sinon.stub()
  }

  // happy path
  storage.save.callsArgWith(2, undefined, randomString(10))
  storage.remove.callsArg(1)

  const StubSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    }
  })
  const processor = new FileProcessor(storage);
  StubSchema.plugin(crate, {
    //storage: storage,
    fields: {
      files: {
        array: true,
          processor
      }
    }
  })

  const model = mongoose.model(randomString(10), StubSchema)

  callback(model, storage)
}
