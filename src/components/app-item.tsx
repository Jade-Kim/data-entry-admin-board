import { Component, h } from '@stencil/core';
import { GC } from '../global/app';

@Component({
  tag: 'app-item',
})
export class AppItem {
  private serviceData: any;
  private headerTitles = ["Name", "Options", "Price", "Code", GC.thCreated, GC.thModified, GC.thDelete];
  private headerKeys = ["name", "options", "price", "code", "created", "modified"];
  private pageID = GC.id_item;
  private pageTitle = "Item Category";
  private newTDclasses = ["name", "text", "text", "text", "text"];

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
      { "name": "Ketchup", "options": "Yes/No", "price": "$0.20", "code": "KZ44LZ" },
      { "name": "Egg", "options": "Over Easy, Over Medium, Over Hard, Fried", "price": "$0.20", "code": "KZ44LZ" },
      { "name": "FiredEgg", "options": "Yes/No", "price": "$0.20", "code": "KZ44LZ" },
      { "name": "Mustard", "options": "Yes/No", "price": "$0.20", "code": "KZ44LZ" },
    ];
  }

  componentDidLoad() {

  }
}
