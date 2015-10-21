require('../../../css/react-bootstrap-table.min.css');
import React from 'react';
import Basic from './Basic';

import {Col, Panel} from 'react-bootstrap';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: ''
    };
  }

  componentDidMount() {
    setInterval(function () {
      this.setState({
        date: new Date().toLocaleString()
      });
    }.bind(this), 1000);
  }

  render() {
    return (
      <Col md={8} mdOffset={1}>
        {this.state.date}
        <Panel header={"Default remote data source table"}>
          <h5>Source in /examples/js/remote-data-source/default.js</h5>
          <Basic/>
        </Panel>
      </Col>
    );
  }
}

export default Demo;
