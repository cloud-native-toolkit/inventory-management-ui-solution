import React, { Component } from "react";
import {
    StructuredListWrapper,
    StructuredListRow,
    StructuredListCell,
    StructuredListHead,
    StructuredListBody,
    StructuredListInput,
    Icon
} from "carbon-components-react";
import { iconCheckmarkSolid } from "carbon-icons";
import Header from "../ui-shell/Header";
import "../ui-shell/patterns.scss";

class StockItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            selectedRow: 0,

        };
    }
    title = 'Stock Items';
    subtitle = 'This is the current inventory of items';
    columns = [
        "name",
        "description",
        "stock",
        "unitPrice",
        "picture",
        "manufacturer",
    ];
    formatters = {};

    async componentDidMount() {
        this.setState({
            data: await this.props.stockService.getStockItems()
        });
    }

    onRowClick = id => {
        this.setState({ selectedRow: id });
    };

    renderRow = (row, id) => {
        return (
            <StructuredListRow key={id} onClick={() => this.onRowClick(id)}>
                <div>
                    <StructuredListInput
                        id={`row-${id}`}
                        value="row-0"
                        title="row-0"
                        name="row-0"
                        //defaultChecked={this.state.selectedRow === id}
                        checked={this.state.selectedRow === id}
                    />
                    <StructuredListCell>
                        <Icon
                            className="bx--structured-list-svg"
                            icon={iconCheckmarkSolid}
                        />
                    </StructuredListCell>
                </div>
                {this.columns.map(col => {
                    const format = this.formatters[col] || function (val) { return val; };
                    return (
                        <StructuredListCell key={col} className="simple-list-row">
                            {format(row[col])}
                        </StructuredListCell>
                    );
                })}
            </StructuredListRow>
        );
    };

    render() {
        const data = this.state.data;
        return (
            <div className="bx--grid pattern-container">
                <Header
                    title={this.title}
                    subtitle={this.subtitle}
                />
                <div className="bx--row">
                    <div className="bx--col-xs-12">
                        <StructuredListWrapper selection border>
                            <StructuredListHead>
                                <StructuredListRow head>
                                    <StructuredListCell head />
                                    {this.columns.map(key => {
                                        return (
                                            <StructuredListCell head key={key}>
                                                {key.charAt(0).toUpperCase() +
                                                    key.slice(1).replace(/([A-Z])/g, " $1")}
                                            </StructuredListCell>
                                        );
                                    })}
                                </StructuredListRow>
                            </StructuredListHead>
                            <StructuredListBody>
                                {data.map((row, i) => {
                                    return this.renderRow(row, i);
                                })}
                            </StructuredListBody>
                        </StructuredListWrapper>
                    </div>
                </div>
            </div>
        );
    }

}

export default StockItemList;
