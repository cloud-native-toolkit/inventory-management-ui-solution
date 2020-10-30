import { StockItem } from "../../models/list/StockItem";
export abstract class StockItemApi {
    abstract async getStockItems(): Promise<StockItem[]>;
}


