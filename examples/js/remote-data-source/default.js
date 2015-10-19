'use strict';
import React from 'react';
import {BootstrapTable, TableHeaderColumn,TableDataSet} from 'react-bootstrap-table';


function getProducts(quantity, startId) {
  var arr = []
  for (var i = 0; i < quantity; i++) {
    var id = startId + i;
    arr.push({
      id: id,
      name: "Name" + id,
      price: 10 + i
    });
  }
  return arr;
}

function getList(pageInfo) {


  return {
    pageInfo: {},
    data: []
  };
}


export default class DefaultPaginationTable extends React.Component {
  constructor(props) {
    super(props);
    this.dataSet = new TableDataSet(getProducts(40, "defaultData"));

    //分页改变事件
    var changePage = function (page, sizePerPage) {
      console.log(page, sizePerPage);
      var newState = $.extend(true, {}, this.state.options);
      var newProducts = getProducts(5, "changePage");
      newState.page = page; //显示第几页
      newState.dataSize = 20; //数据总数
      newState.sizePerPage = 5; // 每页分页大小数量
      // newState.paginationSize=10; //显示页数按钮分页个数  //未扩展实现
      function cb() {
        this.dataSet.setData(newProducts);
      }

      this.setState({options: newState}, cb);  //设置分页
    }.bind(this)

    //排序事件
    var handleSort = function (order, sortField, options) {
      console.log(order + " " + sortField + " " + options);
      var newState = $.extend(true, {}, this.state.options);
      var newProducts = getProducts(10, "handleSort");
      newState.page = 2; //显示第几页
      newState.dataSize = 60; //数据总数
      newState.sizePerPage = 5; // 每页分页大小数量
      // newState.paginationSize=10; //显示页数按钮分页个数  //为实现
      this.setState({options: newState}, cb);  //设置分页
      function cb() {
        this.dataSet.setData(newProducts);
      }

    }.bind(this)

    this.state = {

      options: {
        page: 0,  //默认显示页数
        sizePerPageList: [5, 10, 30, 50, 100], //分页选择数量
        sizePerPage: 10,  //每页分页大小数量
        paginationSize: 10,  //显示分页数按钮个数

        //远程分页添加内容
        isRemoteLoad: true, // 远程分页
        onPageChange: changePage, //分页变更事件
        dataSize: 30,    //总共数据大小
        onSortChange: handleSort //排序事件
      }


    }
    this.selectRowProp = {
      mode: "checkbox",
      clickToSelect: true,
      // bgColor: "rgb(238, 193, 213)",
      onSelect: function () {
        console.log("onRowSelect")
      },
      onSelectAll: function (isSelect) {
        console.log("onSelectAll")
      },
    };
  }

  render() {
    return (
      <BootstrapTable data={this.dataSet} pagination={true} selectRow={this.selectRowProp} options={this.state.options}>
        <TableHeaderColumn dataField="id" dataSort={true} isKey={true}>Product ID</TableHeaderColumn>
        <TableHeaderColumn dataField="name">Product Name</TableHeaderColumn>
        <TableHeaderColumn dataField="price">Product Price</TableHeaderColumn>
      </BootstrapTable>
    );
  }
};
