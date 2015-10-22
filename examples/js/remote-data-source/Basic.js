import React from 'react';
import {BootstrapTable} from './table';

function dataSource(query) {
  let {pageSize, page} = query;

  let data = [];
  let start = pageSize * page;
  for (let i = start; i < start + pageSize; i++) {
    data.push({
      id: i,
      pid: i,
      name: 'Name' + i,
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
    }, 1000);
  });
}

class Basic extends React.Component {

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};

    this.columns = [{
      title: 'ID',
      dataField: 'id',
      sortable: true,
      hidden: true,
      textAlign: 'right',
    }, {
      title: 'Product ID',
      dataField: 'pid',
      sortable: true,
    }, {
      title: 'Product Name',
      dataField: 'name',
      sortable: true,
    }, {
      title: 'Product Price',
      dataField: 'price',
      sortable: true,
    }];
  }

  render() {
    let order = [{}];
    return (
      <BootstrapTable
        columns={this.columns}
        dataSource={dataSource}
        rowKey="id"
        rowSelection={{}}
        order={order}
        striped bordered condensed hover
      />
    );
  }
}

export default Basic;
