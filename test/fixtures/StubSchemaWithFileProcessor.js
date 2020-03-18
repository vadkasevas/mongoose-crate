'use strict'

const mongoose = require('mongoose')
import crate from '../../src';
const sinon = require('sinon')
const randomString = require('./randomString')

module.exports = (processor, callback) => {
  const storage = {
    save: sinon.stub(),
    remove: sinon.stub()
  }

  // happy path
  storage.save.callsArgWith(1, undefined, randomString(10))
  storage.remove.callsArg(1)

  const StubSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    }
  })

  StubSchema.plugin(crate, {
    fields: {
      file: {
        processor: processor
      }
    }
  })

  const model = mongoose.model(randomString(10), StubSchema)

  callback(model, storage)
}
