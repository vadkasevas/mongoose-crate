'use strict'

import FileProcessor from '../../src/classes/FileProcessor'

const mongoose = require('mongoose')
import crate from '../../src'

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
        })

    // happy path
    storage.save.callsArgWith(2, undefined, randomString(10))
    storage.remove.callsArg(1)
    const processor = new FileProcessor(storage);
    const StubSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        }
    })

    StubSchema.plugin(crate, {
        fields: {
            file: {processor}
        }
    })

    const model = mongoose.model(randomString(10), StubSchema)

    callback(model, storage)
}
