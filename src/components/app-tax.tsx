import { Component, h } from '@stencil/core';
import { GC } from '../global/app';

@Component({
  tag: 'app-tax',
})
export class AppTax {
  private serviceData: any;
  private headerTitles = ["Name", "Rate", "Include Tip", "Renew On", GC.thCreated, GC.thModified, GC.thDelete];
  private headerKeys = ["name", "rate", "includeTip", "renewOn", "created", "modified"];
  private pageID = GC.id_tax;
  private pageTitle = "Tax Category";
  private newTDclasses = ["name", "text", "text", "date"];

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
      { "name": "Nevada Local", "rate": "18%", "includeTip": "No", "renewOn": "01/01/2022" },
      { "name": "Internatioal Shippig", "rate": "26%", "includeTip": "No", "renewOn": "07/01/2021" },
      { "name": "Colorado Local", "rate": "15%", "includeTip": "No", "renewOn": "06/01/2023" },
      { "name": "California Local", "rate": "20%", "includeTip": "No", "renewOn": "01/01/2022" },
    ];
  }

  componentDidLoad() {

  }
}
