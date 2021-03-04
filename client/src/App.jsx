import React, { Component } from "react";
import UIShell from "./components/UIShell";
import "./App.scss";

import {StockItemService} from "./services/stock-item.service";
import {FeaturesService} from "./services/features.service";

class App extends Component {
  constructor(props) {
    super(props);

    this.stockService = props.stockService || new StockItemService();
    this.featuresService = props.featuresService || new FeaturesService();
  }

  render() {
    return (
      <div className="App">
        <UIShell stockService={this.stockService} featuresService={this.featuresService} />
      </div>
    );
  }
}
export default App;
