import React from 'react';
import {BootstrapTable} from 'ione-ui/src/table/bootstrapTable';
import {Table} from 'react-bootstrap';

function dataSource(query) {
    // query.order
    return new Promise(function () {

    });
}

class Basic extends React.Component {

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        let columns = [{
            title: 'ID',
            dataField: 'id',
            sortable: true,
            hidden: true,
            textAlign: 'right'
        }, {
            title: 'Product ID',
            dataField: 'pid',
            sortable: true
        }, {
            title: 'Product Name',
            dataField: 'name',
            sortable: true
        }, {
            title: 'Product Price',
            dataField: 'price',
            sortable: true
        }];
        let pagination = {
            current: 1,
            total: 100,
            pageSize: 10
        };
        let order = [{}];
        return (
            <div>
                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td colSpan="2">Larry the Bird</td>
                        <td>@twitter</td>
                    </tr>
                    </tbody>
                </Table>
                <BootstrapTable
                    columns={columns}
                    dataSource={dataSource}
                    rowKey="id"
                    rowSelection={{}}
                    pagination={pagination}
                    order={order}
                    striped bordered condensed hover
                />
            </div>
        );
    }
}

export default Basic;
