import React from 'react';
import {BootstrapTable} from './table/bootstrapTable';

function dataSource(query) {
  // query.order
  return new Promise(function () {

  });
}

class Basic extends React.Component {

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    let columns = [{
      title: 'ID',
      dataField: 'id',
      sortable: true,
      hidden: true,
      textAlign: 'right'
    }, {
      title: 'Product ID',
      dataField: 'pid',
      sortable: true
    }, {
      title: 'Product Name',
      dataField: 'name',
      sortable: true
    }, {
      title: 'Product Price',
      dataField: 'price',
      sortable: true
    }];
    let pagination = {
      current: 1,
      total: 100,
      pageSize: 10
    };
    let order = [{}];
    return (
      <div>
        <BootstrapTable
          columns={columns}
          dataSource={dataSource}
          rowKey="id"
          rowSelection={{}}
          pagination={pagination}
          order={order}
          striped bordered condensed hover
        />
      </div>
    );
  }
}

export default Basic;
