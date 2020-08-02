import { Component, h } from '@stencil/core';
import { GC } from '../global/app';

@Component({
  tag: 'app-menu',
})
export class AppMenu {
  private serviceData: any;
  private headerTitles = ["Name", "Description", "Image", GC.thCreated, GC.thModified, GC.thDelete];
  private headerKeys = ["name", "description", "image", "created", "modified"];
  private pageID = GC.id_menu;
  private pageTitle = "Menu Category";
  private newTDclasses = ["name", "text", "text"];

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
      { "name": "Tacos", "description": "All tacos are served with refried beans and rice.", "image": "None" },
      { "name": "Pancakes", "description": "All panckaes are served with butter and syrup.", "image": "None" },
      { "name": "Burritos", "description": "All hashes are served with extra salsa.", "image": "None" },
    ];
  }

}
