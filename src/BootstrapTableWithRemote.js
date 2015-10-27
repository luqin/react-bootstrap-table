import React from 'react';
import LocalTable from './BootstrapTable';
import RemoteTable from './remote/BootstrapTable';

class BootstrapTable extends React.Component {

  isRemoteDataSource(props) {
    props = props || this.props;

    return props.dataSource && !Array.isArray(props.dataSource);
  }

  render() {
    console.info(1)
    if (this.isRemoteDataSource()) {
      return (
        <RemoteTable {...this.props}>
          {this.props.children}
        </RemoteTable>
      );
    }

    return (
      <LocalTable {...this.props}>
        {this.props.children}
      </LocalTable>
    );
  }
}

export default BootstrapTable;
