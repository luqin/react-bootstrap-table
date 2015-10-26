import React from 'react';
import {BootstrapTable, TableDataSet} from '../index';

const isArray = Array.isArray;

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.dataSet = new TableDataSet([]);

    this.loading = false;
    this.query = {
      pageSize: 10,
      page: 1,
      sortInfo: [],
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

  componentWillMount() {
    if (this.isRemoteDataSource(this.props)) {
      this.loadDataSource(this.props.dataSource, this.props);
    }
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    if (this.isRemoteDataSource(nextProps)) {
      if (nextProps.reload) {
        this.loadDataSource(nextProps.dataSource, nextProps);
      }
    }
  }

  onPageChange(page, pageSize) {
    console.log('pageChange', arguments);

    this.query.page = page;
    this.query.pageSize = pageSize;

    this.reload();
  }

  onSortChange(order, sortField, options) {
    console.info('handleSort', arguments);

    const sortInfo = [];
    if (sortField) {
      sortInfo.push({
        name: sortField,
        dir: order,
      });
    }
    this.query.sortInfo = sortInfo;

    this.reload();
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

  setPageSize(pageSize) {
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
  isRemoteDataSource(props) {
    props = props || this.props;

    return props.dataSource && !isArray(props.dataSource);
  }

  gotoPage(page) {
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
  loadDataSource(dataSource, props) {
    props = props || this.props;

    if (!arguments.length) {
      dataSource = props.dataSource;
    }

    // let dataSourceQuery = {};
    //
    // dataSourceQuery.sortInfo = props.sortInfo;

    let dataSourceQuery = this.query;

    if (typeof dataSource === 'function') {
      dataSource = dataSource(dataSourceQuery, props);
    }

    if (dataSource && dataSource.then) {
      dataSource.then(this.onDataSourceResponse.bind(this), this.onDataSourceResponse.bind(this));
    }
  }

  reload() {
    if (this.dataSource) {
      return this.loadDataSource(this.dataSource, this.props);
    }
  }

  render() {
    this.dataSource = this.props.dataSource;

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
