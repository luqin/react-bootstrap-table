import React from 'react';
import {BootstrapTable, TableDataSet} from '../index';
import objectAssign from 'object-assign';

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
      dataTotalSize: 0,
      options: {
        page: 1,
        onPageChange: this.onPageChange.bind(this),
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
    let dataTotalSize = pageInfo.dataSize;

    let newOptions = objectAssign({}, this.state.options, {
      page: pageInfo.page,
    });

    let newData = result.data;

    // this.query = query;

    this.setState({
      dataTotalSize: dataTotalSize,
      options: newOptions,
    }, function cb() {
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
    let {
      data,
      dataSource,
      pagination,
      fetchInfo,
      options,
      ...other,
      } = this.props;

    this.dataSource = dataSource;

    let remote = this.isRemoteDataSource();

    let tableProps = {
      remote: remote,
      options: this.state.options,
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

    return (
      <BootstrapTable
        {...other}
        {...tableProps}
      >
        {this.props.children}
      </BootstrapTable>
    );
  }
}

export default Table;
