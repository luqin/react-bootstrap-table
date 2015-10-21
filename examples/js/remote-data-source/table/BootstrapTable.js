import React from 'react';
import BSTable from './Table';
import TableHeaderColumn from './TableHeaderColumn';

class BootstrapTable extends React.Component {

  static propTypes = {
    /**
     * for local data, an array of object to render in the grid. For remote data, a string url, or a function that returns a promise.
     */
    dataSource: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.func]),
    columns: React.PropTypes.array,
    rowKey: React.PropTypes.string.isRequired,
    pagination: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object]),
    order: React.PropTypes.array,
    rowSelection: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object]),

    height: React.PropTypes.string,
    striped: React.PropTypes.bool,
    bordered: React.PropTypes.bool,
    hover: React.PropTypes.bool,
    condensed: React.PropTypes.bool,
  };

  static defaultProps = {
    pagination: false,
    rowSelection: false,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }

  renderTableHeaderColumns(props) {
    return props.columns.map(column => {
      return (
        <TableHeaderColumn
          {...column}
          isKey={column.dataField === props.rowKey}
        >
          {column.title}
        </TableHeaderColumn>
      );
    });
  }

  render() {
    return (
      <BSTable dataSource={this.props.dataSource} pagination={true}>
        {this.renderTableHeaderColumns(this.props)}
      </BSTable>
    );
  }
}

export default BootstrapTable;
