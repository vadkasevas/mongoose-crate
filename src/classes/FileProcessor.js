'use strict'

export default class FileProcessor {
    constructor (storage) {
        this.storage = storage;
    }
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

    process (model,attachment, property, callback) {
        this.storage.save(model,attachment, (error, path) => {
            property.size = attachment.size
            property.name = attachment.name
            property.type = attachment.type
            property.path = path
            property.date = new Date();
            callback(error)
        })
    }

    willOverwrite (model) {
        return !!model.path
    }

    remove (property, callback) {
        if (!property.path) {
            return callback()
        }
        this.storage.remove(property, callback)
    }
}
