'use strict';var _interopRequireDefault3 = require("@babel/runtime/helpers/interopRequireDefault");var _interopRequireDefault2 = _interopRequireDefault3(require("@babel/runtime/helpers/interopRequireDefault"));Object.defineProperty(exports, "__esModule", { value: true });exports["default"] = undefined;var _classCallCheck2 = require("@babel/runtime/helpers/classCallCheck");var _classCallCheck = (0, _interopRequireDefault2["default"])(_classCallCheck2)["default"];var _createClass2 = require("@babel/runtime/helpers/createClass");var _createClass = (0, _interopRequireDefault2["default"])(_createClass2)["default"];var

FileProcessor = /*#__PURE__*/function () {
  function FileProcessor(storage) {_classCallCheck(this, FileProcessor);
    this.storage = storage;
  }_createClass(FileProcessor, [{ key: "createFieldSchema", value: function createFieldSchema()
    {
      return {
        size: Number,
        name: String,
        type: {
          type: String },

        path: String,
        date: Date };

    } }, { key: "process", value: function process(

    model, attachment, property, callback) {
      this.storage.save(model, attachment, function (error, path) {
        property.size = attachment.size;
        property.name = attachment.name;
        property.type = attachment.type;
        property.path = path;
        property.date = new Date();
        callback(error);
      });
    } }, { key: "willOverwrite", value: function willOverwrite(

    model) {
      return !!model.path;
    } }, { key: "remove", value: function remove(

    property, callback) {
      if (!property.path) {
        return callback();
      }
      this.storage.remove(property, callback);
    } }]);return FileProcessor;}();exports["default"] = FileProcessor;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGFzc2VzL0ZpbGVQcm9jZXNzb3IuanMiXSwibmFtZXMiOlsiRmlsZVByb2Nlc3NvciIsInN0b3JhZ2UiLCJzaXplIiwiTnVtYmVyIiwibmFtZSIsIlN0cmluZyIsInR5cGUiLCJwYXRoIiwiZGF0ZSIsIkRhdGUiLCJtb2RlbCIsImF0dGFjaG1lbnQiLCJwcm9wZXJ0eSIsImNhbGxiYWNrIiwic2F2ZSIsImVycm9yIiwicmVtb3ZlIl0sIm1hcHBpbmdzIjoiQUFBQSxhOztBQUVxQkEsYTtBQUNqQix5QkFBYUMsT0FBYixFQUFzQjtBQUNsQixTQUFLQSxPQUFMLEdBQWVBLE9BQWY7QUFDSCxHO0FBQ29CO0FBQ2pCLGFBQU87QUFDSEMsUUFBQUEsSUFBSSxFQUFFQyxNQURIO0FBRUhDLFFBQUFBLElBQUksRUFBRUMsTUFGSDtBQUdIQyxRQUFBQSxJQUFJLEVBQUU7QUFDRkEsVUFBQUEsSUFBSSxFQUFFRCxNQURKLEVBSEg7O0FBTUhFLFFBQUFBLElBQUksRUFBRUYsTUFOSDtBQU9IRyxRQUFBQSxJQUFJLEVBQUVDLElBUEgsRUFBUDs7QUFTSCxLOztBQUVRQyxJQUFBQSxLLEVBQU1DLFUsRUFBWUMsUSxFQUFVQyxRLEVBQVU7QUFDM0MsV0FBS1osT0FBTCxDQUFhYSxJQUFiLENBQWtCSixLQUFsQixFQUF3QkMsVUFBeEIsRUFBb0MsVUFBQ0ksS0FBRCxFQUFRUixJQUFSLEVBQWlCO0FBQ2pESyxRQUFBQSxRQUFRLENBQUNWLElBQVQsR0FBZ0JTLFVBQVUsQ0FBQ1QsSUFBM0I7QUFDQVUsUUFBQUEsUUFBUSxDQUFDUixJQUFULEdBQWdCTyxVQUFVLENBQUNQLElBQTNCO0FBQ0FRLFFBQUFBLFFBQVEsQ0FBQ04sSUFBVCxHQUFnQkssVUFBVSxDQUFDTCxJQUEzQjtBQUNBTSxRQUFBQSxRQUFRLENBQUNMLElBQVQsR0FBZ0JBLElBQWhCO0FBQ0FLLFFBQUFBLFFBQVEsQ0FBQ0osSUFBVCxHQUFnQixJQUFJQyxJQUFKLEVBQWhCO0FBQ0FJLFFBQUFBLFFBQVEsQ0FBQ0UsS0FBRCxDQUFSO0FBQ0gsT0FQRDtBQVFILEs7O0FBRWNMLElBQUFBLEssRUFBTztBQUNsQixhQUFPLENBQUMsQ0FBQ0EsS0FBSyxDQUFDSCxJQUFmO0FBQ0gsSzs7QUFFT0ssSUFBQUEsUSxFQUFVQyxRLEVBQVU7QUFDeEIsVUFBSSxDQUFDRCxRQUFRLENBQUNMLElBQWQsRUFBb0I7QUFDaEIsZUFBT00sUUFBUSxFQUFmO0FBQ0g7QUFDRCxXQUFLWixPQUFMLENBQWFlLE1BQWIsQ0FBb0JKLFFBQXBCLEVBQThCQyxRQUE5QjtBQUNILEssbURBcENnQmIsYSIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaWxlUHJvY2Vzc29yIHtcbiAgICBjb25zdHJ1Y3RvciAoc3RvcmFnZSkge1xuICAgICAgICB0aGlzLnN0b3JhZ2UgPSBzdG9yYWdlO1xuICAgIH1cbiAgICBjcmVhdGVGaWVsZFNjaGVtYSAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzaXplOiBOdW1iZXIsXG4gICAgICAgICAgICBuYW1lOiBTdHJpbmcsXG4gICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogU3RyaW5nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGF0aDogU3RyaW5nLFxuICAgICAgICAgICAgZGF0ZTogRGF0ZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvY2VzcyAobW9kZWwsYXR0YWNobWVudCwgcHJvcGVydHksIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuc3RvcmFnZS5zYXZlKG1vZGVsLGF0dGFjaG1lbnQsIChlcnJvciwgcGF0aCkgPT4ge1xuICAgICAgICAgICAgcHJvcGVydHkuc2l6ZSA9IGF0dGFjaG1lbnQuc2l6ZVxuICAgICAgICAgICAgcHJvcGVydHkubmFtZSA9IGF0dGFjaG1lbnQubmFtZVxuICAgICAgICAgICAgcHJvcGVydHkudHlwZSA9IGF0dGFjaG1lbnQudHlwZVxuICAgICAgICAgICAgcHJvcGVydHkucGF0aCA9IHBhdGhcbiAgICAgICAgICAgIHByb3BlcnR5LmRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgY2FsbGJhY2soZXJyb3IpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgd2lsbE92ZXJ3cml0ZSAobW9kZWwpIHtcbiAgICAgICAgcmV0dXJuICEhbW9kZWwucGF0aFxuICAgIH1cblxuICAgIHJlbW92ZSAocHJvcGVydHksIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICghcHJvcGVydHkucGF0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKClcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0b3JhZ2UucmVtb3ZlKHByb3BlcnR5LCBjYWxsYmFjaylcbiAgICB9XG59XG4iXX0=