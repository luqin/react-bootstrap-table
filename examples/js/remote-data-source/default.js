import React from 'react';
import {Promise} from 'es6-promise';
import {BootstrapTable, TableHeaderColumn, TableDataSet} from 'react-bootstrap-table';

function queryData(query) {
  let {pageSize, page} = query;

  let data = [];
  let start = pageSize * page;
  for (let i = start; i < start + pageSize; i++) {
    var id = i;
    data.push({
      id: id,
      name: 'Name' + id,
      price: 10 + i,
    });
  }

  let pageInfo = $.extend(true, {}, query);
  pageInfo.dataSize = 1000;

  let result = {
    pageInfo: pageInfo,
    data: data,
  };

  console.info('result', result);

  return new Promise((resolve)=> {
    setTimeout(()=> {
      resolve(result);
    }, 2000);
  });
}

export default class DefaultPaginationTable extends React.Component {
  constructor(props) {
    super(props);

    this.dataSet = new TableDataSet([]);

    this.loading = false;
    this.query = {
      pageSize: 10,
      page: 1,
    };

    this.state = {
      options: {
        page: 1,
        // 远程分页添加内容
        isRemoteLoad: true, // 远程分页
        onPageChange: this.onPageChange.bind(this),
        dataSize: 0,
        onSortChange: this.onSortChange.bind(this),
      },
    };

    this.selectRowProp = {
      mode: 'checkbox',
      onSelect: function () {
        console.log('onRowSelect', arguments);
      },
      onSelectAll: function () {
        console.log('onSelectAll', arguments);
      },
    };
  }

  componentDidMount() {
    this.loadData(this.query);
  }

  onPageChange(page, pageSize) {
    console.log('pageChange', arguments);

    if (this.query.page !== page || this.query.pageSize !== pageSize) {
      this.loadData({
        page: page,
        pageSize: pageSize,
      });
    }
  }

  onSortChange(order, sortField, options) {
    console.info('handleSort', arguments);
  }

  onDataSourceResponse(result) {
    let {pageInfo} = result;

    var newState = $.extend(true, {}, this.state.options);
    newState.page = pageInfo.page;
    newState.dataSize = pageInfo.dataSize;

    var newData = result.data;

    // this.query = query;

    this.setState({ options: newState }, function cb() {
      this.dataSet.setData(newData);
    });
  }

  loadData(query) {
    let dataSource = queryData(query);

    if (dataSource && dataSource.then) {
      dataSource.then(this.onDataSourceResponse.bind(this), this.onDataSourceResponse.bind(this));
    }
  }

  render() {
    return (
      <BootstrapTable
        data={this.dataSet}
        pagination
        selectRow={this.selectRowProp}
        options={this.state.options}
      >
        <TableHeaderColumn dataField="id" dataSort={true} isKey={true}>Product
          ID</TableHeaderColumn>
        <TableHeaderColumn dataField="name">Product Name</TableHeaderColumn>
        <TableHeaderColumn dataField="price">Product Price</TableHeaderColumn>
      </BootstrapTable>
    );
  }
};
