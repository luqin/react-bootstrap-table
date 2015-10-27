'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _BootstrapTableWithRemote = require('./BootstrapTableWithRemote');

var _BootstrapTableWithRemote2 = _interopRequireDefault(_BootstrapTableWithRemote);

var _TableHeaderColumn = require('./TableHeaderColumn');

var _TableHeaderColumn2 = _interopRequireDefault(_TableHeaderColumn);

var _storeTableDataStore = require('./store/TableDataStore');

exports['default'] = {
  BootstrapTable: _BootstrapTableWithRemote2['default'],
  TableHeaderColumn: _TableHeaderColumn2['default'],
  TableDataSet: _storeTableDataStore.TableDataSet
};
module.exports = exports['default'];