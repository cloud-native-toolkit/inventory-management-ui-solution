import { StockItem } from '../../models/list/StockItem';
import { StockItemMockApi } from './stock-item-mock.api';
import * as superagent from 'superagent';
import timer from '../../util/timer';

export class StockItemMockService implements StockItemMockApi {
    baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl || '/api';
    }

    async getStockItems(): Promise<StockItem[]> {

        await timer(1000);

        return [
            {
                "name": "Item 1",
                "description": "The first item",
                "stock": 10,
                "unitPrice": 100.0,
                "picture": "test",
                "manufacturer": "unknown",
            },
            {
                "name": "Item 2",
                "description": "The second item",
                "stock": 15,
                "unitPrice": 120.5,
                "picture": "test1",
                "manufacturer": "Apple",
            },
            {
                "name": "Item 3",
                "description": "The third item",
                "stock": 20,
                "unitPrice": 75.5,
                "picture": "test1",
                "manufacturer": "Sony",
            }
        ];
    }

}