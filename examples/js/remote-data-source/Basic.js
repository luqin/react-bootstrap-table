import React from 'react';
import {BootstrapTable} from './table';
import {Button} from 'react-bootstrap';

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
      width: '20px',
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
      render(cell) {
        return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
      },
    }, {
      title: 'Operation',
      sortable: false,
      render(cell, row) {
        return <Button bsSize="small">delete</Button>;
      },
    }];
  }

  dataSource(query) {
    let {pageSize, page, sortInfo} = query;

    let data = [];
    let start = pageSize * page;
    for (let i = start; i < start + pageSize; i++) {
      data.push({
        id: i,
        pid: i,
        name: 'Name-' + new Date().toLocaleString(),
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

  reload() {
    this.refs.grid.reload();
  }

  render() {
    let order = [{}];
    return (
      <div>
        <Button onClick={this.reload.bind(this)}>reload</Button>
        <BootstrapTable
          ref="grid"
          columns={this.columns}
          dataSource={this.dataSource}
          rowKey="id"
          order={order}
          striped
          bordered
          condensed
          hover
        />
        <BootstrapTable
          columns={this.columns}
          dataSource={this.dataSource}
          rowKey="id"
          selectRow={{
            mode: 'radio',
            clickToSelect: true,
            bgColor: 'rgb(238, 193, 213)',
          }}
          order={order}
          striped
          bordered
          condensed
          hover
        />
        <BootstrapTable
          columns={this.columns}
          dataSource={this.dataSource}
          rowKey="id"
          selectRow={{
            mode: 'checkbox'
          }}
          order={order}
          striped
          bordered
          condensed
          hover
        />
      </div>
    );
  }
}

export default Basic;
