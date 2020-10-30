import { StockItem } from "../../models/list/StockItem";
export abstract class StockItemMockApi {
    abstract async getStockItems(): Promise<StockItem[]>;
}


