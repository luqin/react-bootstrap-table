var React = require('react');
var ReactBsTable  = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;

var products = [
{
    id: 1,
    name: "Product1",
    price: 120
},{
    id: 2,
    name: "Product2",
    price: 80
},{
    id: 3,
    name: "Product3",
    price: 207
},{
    id: 4,
    name: "Product4",
    price: 100
},{
    id: 5,
    name: "Product5",
    price: 150
},{
    id: 6,
    name: "Product6",
    price: 160
}
];

function priceFormatter(cell, row){
  return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
}

React.render(
  <BootstrapTable data={products} >
      <TableHeaderColumn dataField="id">Product ID</TableHeaderColumn>
      <TableHeaderColumn dataField="name">Product Name</TableHeaderColumn>
      <TableHeaderColumn dataField="price">Product Price</TableHeaderColumn>
  </BootstrapTable>,
	document.getElementById("basic")
);

React.render(
  <BootstrapTable data={products} striped={true} hover={true} condensed={true}>
      <TableHeaderColumn dataField="id">Product ID</TableHeaderColumn>
      <TableHeaderColumn dataField="name">Product Name</TableHeaderColumn>
      <TableHeaderColumn dataField="price">Product Price</TableHeaderColumn>
  </BootstrapTable>,
	document.getElementById("style")
);

React.render(
  <BootstrapTable data={products} height="120">
      <TableHeaderColumn dataField="id">Product ID</TableHeaderColumn>
      <TableHeaderColumn dataField="name">Product Name</TableHeaderColumn>
      <TableHeaderColumn dataField="price">Product Price</TableHeaderColumn>
  </BootstrapTable>,
	document.getElementById("scroll")
);

React.render(
  <BootstrapTable data={products} >
      <TableHeaderColumn dataField="id" dataAlign="right">Product ID</TableHeaderColumn>
      <TableHeaderColumn dataField="name" dataAlign="center">Product Name</TableHeaderColumn>
      <TableHeaderColumn dataField="price">Product Price</TableHeaderColumn>
  </BootstrapTable>,
	document.getElementById("align")
);

React.render(
  <BootstrapTable data={products} >
      <TableHeaderColumn dataField="id" dataSort={true}>Product ID</TableHeaderColumn>
      <TableHeaderColumn dataField="name" dataSort={true}>Product Name</TableHeaderColumn>
      <TableHeaderColumn dataField="price">Product Price</TableHeaderColumn>
  </BootstrapTable>,
	document.getElementById("sort")
);

React.render(
  <BootstrapTable data={products} >
      <TableHeaderColumn dataField="id">Product ID</TableHeaderColumn>
      <TableHeaderColumn dataField="name">Product Name</TableHeaderColumn>
      <TableHeaderColumn dataField="price" dataFormat={priceFormatter}>Product Price</TableHeaderColumn>
  </BootstrapTable>,
	document.getElementById("format")
);