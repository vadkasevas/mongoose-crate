'use strict'

const mongoose = require('mongoose')
const crate = require('../../index')
const sinon = require('sinon')
const randomString = require('./randomString')

module.exports = (callback) => {
  const storage = {
    save: sinon.stub(),
    remove: sinon.stub()
  }

  delete storage.remove.callCount
  storage.remove._callCount = 0
  Object.defineProperty(storage.remove, 'callCount',
    {
      get: function () {
        return storage.remove._callCount
      },
      set: function (value) {
        storage.remove._callCount = value
      }
  });

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
    storage: storage,
    fields: {
      file: {}
    }
  })

  const model = mongoose.model(randomString(10), StubSchema)

  callback(model, storage)
}
