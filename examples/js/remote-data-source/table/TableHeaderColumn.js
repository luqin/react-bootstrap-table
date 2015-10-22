import React from 'react';
import {TableHeaderColumn} from 'react-bootstrap-table';

class TableHeaderColumn1 extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    dataField: React.PropTypes.string,
    sortable: React.PropTypes.bool,
    textAlign: React.PropTypes.string,
    hidden: React.PropTypes.bool,
    width: React.PropTypes.string,
    render: React.PropTypes.func,
    isKey: React.PropTypes.bool,
  };

  static defaultProps = {
    textAlign: 'left',
    sortable: false,
    hidden: false,
    className: '',
    width: null,
    sortFunc: undefined,
    isKey: false,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  dataFormat(cell, row) {
    console.info(cell);
    return this.props.render && this.props.render(cell, row);
  }

  render() {
    const {sortable, textAlign, render, ...other} = this.props;
    return (
      <TableHeaderColumn
        dataFormat={this.dataFormat.bind(this)}
        {...other}
        dataAlign={textAlign}
        dataSort={sortable}
      >
        {this.props.children}
      </TableHeaderColumn>
    );
  }
}

export default TableHeaderColumn;
