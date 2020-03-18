"use strict";var _interopRequireDefault3 = require("@babel/runtime/helpers/interopRequireDefault");var _interopRequireDefault2 = _interopRequireDefault3(require("@babel/runtime/helpers/interopRequireDefault"));Object.defineProperty(exports, "__esModule", { value: true });exports.LocalFsStorageProvider = exports.FileProcessor = exports.StorageProvider = exports.Crate = undefined;var _Crate = require("./classes/Crate");var Crate = (0, _interopRequireDefault2["default"])(_Crate)["default"];
var _StorageProvider = require("./classes/StorageProvider");var StorageProvider = (0, _interopRequireDefault2["default"])(_StorageProvider)["default"];
var _FileProcessor = require("./classes/FileProcessor");var FileProcessor = (0, _interopRequireDefault2["default"])(_FileProcessor)["default"];
var _LocalFsStorageProvider = require("./classes/LocalFsStorageProvider");var LocalFsStorageProvider = (0, _interopRequireDefault2["default"])(_LocalFsStorageProvider)["default"];
var crate = new Crate();exports["default"] =

crate.plugin.bind(crate);exports.

Crate = Crate;exports.
StorageProvider = StorageProvider;exports.
FileProcessor = FileProcessor;exports.
LocalFsStorageProvider = LocalFsStorageProvider;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJDcmF0ZSIsIlN0b3JhZ2VQcm92aWRlciIsIkZpbGVQcm9jZXNzb3IiLCJMb2NhbEZzU3RvcmFnZVByb3ZpZGVyIiwiY3JhdGUiLCJwbHVnaW4iLCJiaW5kIl0sIm1hcHBpbmdzIjoiNlhBQUEsd0MsSUFBT0EsSztBQUNQLDRELElBQU9DLGU7QUFDUCx3RCxJQUFPQyxhO0FBQ1AsMEUsSUFBT0Msc0I7QUFDUCxJQUFNQyxLQUFLLEdBQUcsSUFBSUosS0FBSixFQUFkLEM7O0FBRWVJLEtBQUssQ0FBQ0MsTUFBTixDQUFhQyxJQUFiLENBQWtCRixLQUFsQixDOztBQUVYSixLLEdBQUFBLEs7QUFDQUMsZSxHQUFBQSxlO0FBQ0FDLGEsR0FBQUEsYTtBQUNBQyxzQixHQUFBQSxzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDcmF0ZSBmcm9tICcuL2NsYXNzZXMvQ3JhdGUnXG5pbXBvcnQgU3RvcmFnZVByb3ZpZGVyIGZyb20gJy4vY2xhc3Nlcy9TdG9yYWdlUHJvdmlkZXInXG5pbXBvcnQgRmlsZVByb2Nlc3NvciBmcm9tICcuL2NsYXNzZXMvRmlsZVByb2Nlc3NvcidcbmltcG9ydCBMb2NhbEZzU3RvcmFnZVByb3ZpZGVyIGZyb20gJy4vY2xhc3Nlcy9Mb2NhbEZzU3RvcmFnZVByb3ZpZGVyJ1xuY29uc3QgY3JhdGUgPSBuZXcgQ3JhdGUoKVxuXG5leHBvcnQgZGVmYXVsdCBjcmF0ZS5wbHVnaW4uYmluZChjcmF0ZSlcbmV4cG9ydCB7XG4gICAgQ3JhdGUsXG4gICAgU3RvcmFnZVByb3ZpZGVyLFxuICAgIEZpbGVQcm9jZXNzb3IsXG4gICAgTG9jYWxGc1N0b3JhZ2VQcm92aWRlclxufSJdfQ==