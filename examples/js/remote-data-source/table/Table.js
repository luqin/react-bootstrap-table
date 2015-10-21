import React from 'react';
import {BootstrapTable, TableHeaderColumn, TableDataSet} from 'react-bootstrap-table';

class Table extends React.Component {
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
  }

  componentDidMount() {
    this.loadData(this.query);
  }

  onPageChange(page, pageSize) {
    console.log('pageChange', arguments);

    this.loadData({
      page: page,
      pageSize: pageSize,
    });
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

    this.setState({options: newState}, function cb() {
      this.dataSet.setData(newData);
    });
  }

  loadData(query) {
    let dataSource = this.props.dataSource(query);

    if (dataSource && dataSource.then) {
      dataSource.then(this.onDataSourceResponse.bind(this), this.onDataSourceResponse.bind(this));
    }
  }

  render() {
    return (
      <BootstrapTable
        {...this.props}
        data={this.dataSet}
        options={this.state.options}
      >
        {this.props.children}
      </BootstrapTable>
    );
  }
}

export default Table;
