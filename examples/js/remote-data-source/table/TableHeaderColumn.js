import React from 'react';
import {TableHeaderColumn as BSTableHeaderColumn} from 'react-bootstrap-table';

class TableHeaderColumn extends React.Component {

  static propTypes = {
    dataField: React.PropTypes.string,
    sortable: React.PropTypes.bool,
    textAlign: React.PropTypes.string,
    hidden: React.PropTypes.bool,
    width: React.PropTypes.string,
    render: React.PropTypes.func,
    isKey: React.PropTypes.bool
  };

  static defaultProps = {
    textAlign: 'left',
    sortable: false,
    hidden: false,
    className: '',
    width: null,
    sortFunc: undefined,
    isKey: false
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    let {sortable, textAlign, ...other} = this.props;
    return (
      <BSTableHeaderColumn
        {...other}
        dataAlign={textAlign}
        dataSort={sortable}
      >
        {this.props.children}
      </BSTableHeaderColumn>
    );
  }
}

export default TableHeaderColumn;
