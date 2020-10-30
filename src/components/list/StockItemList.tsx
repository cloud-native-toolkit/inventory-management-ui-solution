import React, { Component } from "react";
import StockItemList from '../../ui-patterns/list/StockItemList';
import { Container } from 'typescript-ioc';
import { StockItemApi } from '../../services';

class StockItemListView extends Component<any, any> {
    stockApi: StockItemApi;
    constructor(props: any) {
        super(props);
        this.stockApi = this.stockService()
    }
    stockService(): StockItemApi {
        return Container.get(StockItemApi);
    }

    render() {
        return (
            <div className="pattern-container">
                <StockItemList stockService={this.stockApi} />
            </div>
        );
    }
}
export default StockItemListView;