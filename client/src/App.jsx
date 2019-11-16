import React, { Component } from "react";
import UIShell from "./components/UIShell";
import "./App.scss";
import {StockItemMockService} from "./services/stock-item-mock.service";

class App extends Component {
  constructor(props) {
    super(props);

    this.stockService = props.stockService || new StockItemMockService();
  }

  render() {
    return (
      <div className="App">
        <UIShell stockService={this.stockService}/>
      </div>
    );
  }
}

export default App;
