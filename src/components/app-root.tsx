import { Component, h, State } from '@stencil/core';
import { GC } from '../global/app';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {
  @State() currentView: string;

  render() {
    return (
      <div>
        <header>
          <a class="btn-floating btn waves-effect waves-light brown darken-2" onClick={_=>this.currentView=GC.id_home} ><i class="material-icons">restaurant</i></a>
          <button class="waves-effect waves-light btn" onClick={_=>this.currentView=GC.id_prime} >Prime Category</button>
          <button class="waves-effect waves-light btn" onClick={_=>this.currentView=GC.id_menu} >Menu Category</button>
          <button class="waves-effect waves-light btn" onClick={_=>this.currentView=GC.id_option} >Options Category</button>
          <button class="waves-effect waves-light btn" onClick={_=>this.currentView=GC.id_item} >Option Items</button>
          <button class="waves-effect waves-light btn" onClick={_=>this.currentView=GC.id_tax} >Tax Category</button>
        </header>

        <main>
        <view-stack view={this.currentView}>
          <app-home id={GC.id_home}></app-home>
          <app-prime id={GC.id_prime}></app-prime>
          <app-menu id={GC.id_menu}></app-menu>
          <app-option id={GC.id_option}></app-option>
          <app-item id={GC.id_item}></app-item>
          <app-tax id={GC.id_tax}></app-tax>
        </view-stack>
        </main>
      </div>
    );
  }

  componentWillLoad(){
    window[GC.id_prime] = [];
    window[GC.id_menu] = [];
    window[GC.id_option] = [];
    window[GC.id_item] = [];
    window[GC.id_tax] = [];
  }
}
