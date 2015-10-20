import React from 'react';
import BSTable from './react-bootstrap-table/BootstrapTable';
import TableHeaderColumn from './TableHeaderColumn';
import BSTableHeaderColumn from './react-bootstrap-table/TableHeaderColumn';

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
        rowSelection: false
    };

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            options: {
                // 远程分页添加内容
                isRemoteLoad: true, // 远程分页
                onPageChange: this.onPageChange.bind(this), //分页变更事件
                dataSize: 30,    //总共数据大小
                onSortChange: this.onSortChange.bind(this) //排序事件
            }
        };
    }

    componentDidMount() {

    }

    onPageChange() {

    }

    onSortChange() {

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
        var products = [{
            id: 1,
            name: "Item name 1",
            price: 100
        },{
            id: 2,
            name: "Item name 2",
            price: 100
        },{
            id: 3,
            name: "Item name 3",
            price: 110
        },{
            id: 4,
            name: "Item name 4",
            price: 100
        },{
            id: 5,
            name: "Item name 5",
            price: 100
        }];

        return <BSTable data={products}>
            <BSTableHeaderColumn dataField="id" isKey={true}>Product ID</BSTableHeaderColumn>
            <BSTableHeaderColumn dataField="name">Product Name</BSTableHeaderColumn>
            <BSTableHeaderColumn dataField="price">Product Price</BSTableHeaderColumn>
        </BSTable>;
        return (
            <BSTable data={products} pagination={true} selectRow={false} options={this.state.options}>
                {this.renderTableHeaderColumns(this.props)}
            </BSTable>
        );
    }
}

export default BootstrapTable;
