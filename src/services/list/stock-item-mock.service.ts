import { StockItem } from '../../models/list/StockItem';
import { StockItemApi } from './stock-item-mock.api';
import * as superagent from 'superagent';

export class StockItemMockService implements StockItemApi {
    baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl || '/api';
    }

    async getStockItems(): Promise<StockItem[]> {

        return superagent
            .get(this.baseUrl + '/stock-items')
            .set('accept', 'application/json')
            .then(res => {
                console.log('Got response: ', res);
                return res.body || [];
            });
    }

}