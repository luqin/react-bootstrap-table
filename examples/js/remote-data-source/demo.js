require('../../../css/react-bootstrap-table.min.css');
import React from 'react';
import DefaultTable from './default';

import {Col, Panel} from 'react-bootstrap';

class Demo extends React.Component {
  render() {
    return (
      <Col md={8} mdOffset={1}>
        <Panel header={"Default remote data source table"}>
          <h5>Source in /examples/js/remote-data-source/default.js</h5>
          <DefaultTable/>
        </Panel>
      </Col>
    );
  }
}

export default Demo;
