'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Table = require('./Table');

var _Table2 = _interopRequireDefault(_Table);

var _index = require('../index');

var BootstrapTable = (function (_React$Component) {
  _inherits(BootstrapTable, _React$Component);

  _createClass(BootstrapTable, null, [{
    key: 'propTypes',
    value: {
      /**
       * for local data, an array of object to render in the grid. For remote data, a string url, or a function that returns a promise.
       */
      dataSource: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.array, _react2['default'].PropTypes.func]),
      columns: _react2['default'].PropTypes.array,
      rowKey: _react2['default'].PropTypes.string.isRequired,
      pagination: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.bool, _react2['default'].PropTypes.object]),
      order: _react2['default'].PropTypes.array,
      rowSelection: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.array, _react2['default'].PropTypes.object]),

      height: _react2['default'].PropTypes.string,
      striped: _react2['default'].PropTypes.bool,
      bordered: _react2['default'].PropTypes.bool,
      hover: _react2['default'].PropTypes.bool,
      condensed: _react2['default'].PropTypes.bool
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      pagination: false
    },
    enumerable: true
  }]);

  function BootstrapTable(props) {
    _classCallCheck(this, BootstrapTable);

    _get(Object.getPrototypeOf(BootstrapTable.prototype), 'constructor', this).call(this, props);
    this.state = {};
  }

  _createClass(BootstrapTable, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'reload',
    value: function reload() {
      this.refs.grid.reload();
    }
  }, {
    key: 'renderTableHeaderColumns',
    value: function renderTableHeaderColumns(props) {
      return props.columns.map(function (column, idx) {
        var sortable = column.sortable;
        var textAlign = column.textAlign;
        var render = column.render;

        var other = _objectWithoutProperties(column, ['sortable', 'textAlign', 'render']);

        return _react2['default'].createElement(
          _index.TableHeaderColumn,
          _extends({
            key: idx,
            isKey: column.dataField === props.rowKey,
            dataFormat: render
          }, other, {
            dataAlign: textAlign,
            dataSort: sortable
          }),
          column.title
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var dataSource = _props.dataSource;
      var pagination = _props.pagination;
      var rowSelection = _props.rowSelection;

      var other = _objectWithoutProperties(_props, ['dataSource', 'pagination', 'rowSelection']);

      return _react2['default'].createElement(
        _Table2['default'],
        _extends({ ref: 'grid' }, other, { dataSource: dataSource, pagination: true, selectRow: rowSelection }),
        this.renderTableHeaderColumns(this.props)
      );
    }
  }]);

  return BootstrapTable;
})(_react2['default'].Component);

exports['default'] = BootstrapTable;
module.exports = exports['default'];