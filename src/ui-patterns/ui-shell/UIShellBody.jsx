import React, { Component } from "react";


import StockItemListView from "../../components/list/StockItemList";


class UIShellBody extends Component {
  components = {
    "Stock Items": StockItemListView
  };
  defaultComponent = "Display Form";

  render() {
    const PatternName = this.components[
      this.props.patternName || this.defaultComponent
    ];
    return (

      <PatternName showDescription={true} />

    );
  }
}
export default UIShellBody;
