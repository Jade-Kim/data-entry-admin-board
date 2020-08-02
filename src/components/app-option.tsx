import { Component, h } from '@stencil/core';
import { GC } from '../global/app';

@Component({
  tag: 'app-option',
})
export class AppOption {
  private serviceData: any;
  private headerTitles = ["Name", "Item", GC.thCreated, GC.thModified, GC.thDelete];
  private headerKeys = ["name", "item", "created", "modified"];
  private pageID = GC.id_option;
  private pageTitle = "Option Category";
  private newTDclasses = [ "name", "text"];

  render() {
    return (
      <div>
        <table-component
          headerTitles={this.headerTitles}
          headerKeys={this.headerKeys}
          pageID={this.pageID}
          pageTitle={this.pageTitle}
          newTDclasses={this.newTDclasses}
          serviceData={this.serviceData}
        >
        </table-component>
      </div>
    );
  }

  /* Component Lifecycle */
  componentWillLoad() {
    this.serviceData = [
      { "name": "Burgers", "item": "Ketchup" },
      { "name": "Burgers", "item": "Fried Egg" },
      { "name": "Hot Dogs", "item": "Chilli" },
      { "name": "Hot Dogs", "item": "Mustard" },
      { "name": "Hot Dogs", "item": "Ketchup" },
    ];
  }

  componentDidLoad() {
    
  }


}
