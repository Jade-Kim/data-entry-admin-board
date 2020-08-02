import { Component, h } from '@stencil/core';
import { GC } from '../global/app';

@Component({
  tag: 'app-prime',
})
export class AppPrime {
  private serviceData: any;
  private headerTitles = ["Name", "Start Time", "End Time", "Date", GC.thCreated, GC.thModified, GC.thDelete];
  private headerKeys = ["name", "s-time", "e-time", "date", "created", "modified"];
  private pageID = GC.id_prime;
  private pageTitle = "Prime Category";
  private newTDclasses = [ "name", "time", "time", "date"];

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
      { "name": "Brunch", "s-time": "11:00 am", "e-time": "1:00 pm", "date": "All" },
      { "name": "Snack", "s-time": "11:00 am", "e-time": "5:00 pm", "date": "All" },
      { "name": "Dinner", "s-time": "5:00 pm", "e-time": "9:00 pm", "date": "All" },
      { "name": "4th of July", "s-time": "11:00 am", "e-time": "9:00 pm", "date": "Jul 04" },
    ];
  }

  componentDidLoad() {
    
  }



}
