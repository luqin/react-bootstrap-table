import React from 'react';
import BSTable from './Table';
import {TableHeaderColumn} from '../index';

class BootstrapTable extends React.Component {

  static propTypes = {
    /**
     * for local data, an array of object to render in the grid. For remote data, a string url, or a function that returns a promise.
     */
    dataSource: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.func]),
    columns: React.PropTypes.array,
    rowKey: React.PropTypes.string.isRequired,
    order: React.PropTypes.array,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }

  reload() {
    this.refs.grid.reload();
  }

  renderTableHeaderColumns(props) {
    return props.columns.map((column, idx) => {
      const {sortable, textAlign, render, ...other} = column;
      return (
        <TableHeaderColumn
          key={idx}
          isKey={column.dataField === props.rowKey}
          dataFormat={render}
          {...other}
          dataAlign={textAlign}
          dataSort={sortable}
        >
          {column.title}
        </TableHeaderColumn>
      );
    });
  }

  render() {
    const {
      dataSource,
      ...other,
      } = this.props;

    return (
      <BSTable
        ref="grid"
        {...other}
        dataSource={dataSource}
      >
        {this.renderTableHeaderColumns(this.props)}
      </BSTable>
    );
  }
}

export default BootstrapTable;
