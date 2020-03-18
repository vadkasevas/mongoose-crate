var fs = require('fs')
var mv = require('mv')
var path = require('path')
var mkdirp = require('mkdirp')
var async = require('async')
var check = require('check-types')
var _ = require('underscore')

export default class LocalFsStorageProvider {
    constructor (options) {
        this._options = options

        check.assert.object(this._options, 'Please pass some options to LocalFS')
        let dirCheck = _.isString(this._options.directory) || _.isFunction(this._options.directory)
        if (!dirCheck) {
            throw new Error('directory must be string or function')
        }
        if (!_.isFunction(this._options.path)) {
            this._options.path = function () {
                return '/' + path.basename(this.path)
            }
        }
    }

    attachmentDir (attachment) {
        let dir = this._options.directory
        if (_.isFunction(dir)) {
            dir = this._options.directory.apply(attachment)
        }
        return dir
    }

    save (model,attachment, callback) {
        let dir = this.attachmentDir(attachment)
        let target = null
        async.series([
            (callback) => {
                let targetOrPromise = this._options.path.apply(attachment)

                function onTargetReolved (target) {
                    if (target.substring(0, dir.length) !== dir) {
                        return callback(new Error('Will only store files under our storage directory'))
                    }
                    callback()
                }

                if (targetOrPromise && targetOrPromise.then) {
                    return targetOrPromise.then((result) => {
                        target = path.resolve(path.join(dir, result))
                        onTargetReolved(target)
                    }, callback)
                } else {
                    target = path.resolve(path.join(dir, targetOrPromise))
                    onTargetReolved(target)
                }
            },
            (callback) => {
                mkdirp(dir, callback)
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
                        fs.stat(target, (error, stats) => {
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
        if (!attachment.path) {
            return callback()
        }
        const dir = this.attachmentDir(attachment)
        if (attachment.path.substring(0, dir.length) !== dir) {
            return callback(new Error('Will not delete files that are not under our storage directory'))
        }
        fs.unlink(attachment.path, (error) => {
            if (error && error.code === 'ENOENT') {
                error = null
            }
            callback(error)
        })
    }
}
