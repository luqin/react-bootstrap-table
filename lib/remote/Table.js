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

var _BootstrapTable = require('../BootstrapTable');

var _BootstrapTable2 = _interopRequireDefault(_BootstrapTable);

var _storeTableDataStore = require('../store/TableDataStore');

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var isArray = Array.isArray;

var Table = (function (_React$Component) {
  _inherits(Table, _React$Component);

  function Table(props) {
    _classCallCheck(this, Table);

    _get(Object.getPrototypeOf(Table.prototype), 'constructor', this).call(this, props);

    this.dataSet = new _storeTableDataStore.TableDataSet([]);

    this.loading = false;
    this.query = {
      pageSize: 10,
      page: 1,
      sortInfo: []
    };

    this.state = {
      dataTotalSize: 0,
      options: {
        page: 1,
        onPageChange: this.onPageChange.bind(this),
        onSortChange: this.onSortChange.bind(this)
      }
    };
  }

  _createClass(Table, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (this.isRemoteDataSource(this.props)) {
        this.loadDataSource(this.props.dataSource, this.props);
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.isRemoteDataSource(nextProps)) {
        if (nextProps.reload) {
          this.loadDataSource(nextProps.dataSource, nextProps);
        }
      }
    }
  }, {
    key: 'onPageChange',
    value: function onPageChange(page, pageSize) {
      console.log('pageChange', arguments);

      this.query.page = page;
      this.query.pageSize = pageSize;

      this.reload();
    }
  }, {
    key: 'onSortChange',
    value: function onSortChange(sortField, order, options) {
      console.info('handleSort', arguments);

      var sortInfo = [];
      if (sortField) {
        sortInfo.push({
          name: sortField,
          dir: order
        });
      }
      this.query.sortInfo = sortInfo;

      this.reload();
    }
  }, {
    key: 'onDataSourceResponse',
    value: function onDataSourceResponse(result) {
      var pageInfo = result.pageInfo;

      var dataTotalSize = pageInfo.dataSize;

      var newOptions = (0, _objectAssign2['default'])({}, this.state.options, {
        page: pageInfo.page
      });

      var newData = result.data;

      // this.query = query;

      this.setState({
        dataTotalSize: dataTotalSize,
        options: newOptions
      }, function cb() {
        this.dataSet.setData(newData);
      });
    }
  }, {
    key: 'setPageSize',
    value: function setPageSize(pageSize) {
      this.query.pageSize = pageSize;
      this.reload();
    }

    /**
     * Returns true if in the current configuration,
     * the datagrid should load its data remotely.
     *
     * @param  {Object}  [props] Optional. If not given, this.props will be used
     * @return {Boolean}
     */
  }, {
    key: 'isRemoteDataSource',
    value: function isRemoteDataSource(props) {
      props = props || this.props;

      return props.dataSource && !isArray(props.dataSource);
    }
  }, {
    key: 'gotoPage',
    value: function gotoPage(page) {
      if (typeof this.props.onPageChange === 'function') {
        this.props.onPageChange(page);
      } else {
        this.query.page = page;

        return this.reload();
      }
    }

    /**
     * Loads remote data
     *
     * @param  {String/Function/Promise} [dataSource]
     * @param  {Object} [props]
     */
  }, {
    key: 'loadDataSource',
    value: function loadDataSource(dataSource, props) {
      props = props || this.props;

      if (!arguments.length) {
        dataSource = props.dataSource;
      }

      // let dataSourceQuery = {};
      //
      // dataSourceQuery.sortInfo = props.sortInfo;

      var dataSourceQuery = this.query;

      if (typeof dataSource === 'function') {
        dataSource = dataSource(dataSourceQuery, props);
      }

      if (dataSource && dataSource.then) {
        dataSource.then(this.onDataSourceResponse.bind(this), this.onDataSourceResponse.bind(this));
      }
    }
  }, {
    key: 'reload',
    value: function reload() {
      if (this.dataSource) {
        return this.loadDataSource(this.dataSource, this.props);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var data = _props.data;
      var dataSource = _props.dataSource;
      var pagination = _props.pagination;
      var fetchInfo = _props.fetchInfo;
      var options = _props.options;

      var other = _objectWithoutProperties(_props, ['data', 'dataSource', 'pagination', 'fetchInfo', 'options']);

      this.dataSource = dataSource;

      var remote = this.isRemoteDataSource();

      var tableProps = {
        remote: remote,
        options: this.state.options
      };

      if (remote) {
        tableProps.data = this.dataSet;
        tableProps.fetchInfo = { dataTotalSize: this.state.dataTotalSize };
        if ('pagination' in this.props) {
          tableProps.pagination = pagination;
        } else {
          tableProps.pagination = true;
        }
      } else {
        tableProps.pagination = pagination;
        tableProps.data = dataSource || data;
      }

      return _react2['default'].createElement(
        _BootstrapTable2['default'],
        _extends({}, other, tableProps),
        this.props.children
      );
    }
  }]);

  return Table;
})(_react2['default'].Component);

exports['default'] = Table;
module.exports = exports['default'];