import { Component, Element, Prop, Watch, h } from '@stencil/core';
declare var M: any;
@Component({
  tag: 'view-stack',
  styleUrl: 'view-stack.css'
})
export class ViewStack {
  @Element() dashboardElement: HTMLElement;
  @Prop({mutable: true, reflectToAttr: true}) index: number = 0;
  @Prop() view: string;
  @Prop() eachFade: number = 400;
  @Watch("index")
  setIndex(newValue:number, oldValue:number = null) {
    if(this._init){
      this._currentIndex = newValue;
      return;
    }
    if(newValue !== oldValue && ! this._inTransition) {
      this._transitionTo(newValue);
    } else {
      this._rapidChangeDirty = true;
    }
  }
  @Watch("view")
  setViewById(newValue:string, oldValue:string = null) {
    if(!newValue || newValue === "") {
      this.index = 0;
      return;
    }
    for(let i = 0; i < this._elementNames.length; i++) {
      if(this._elementNames[i] === newValue) {
        this.index = i;
        return;
      }
    }
    this.index = 0;
    return oldValue;
}
  protected _animatedElements: Array<Array<Element>> = [];
  protected _elementNames: Array<string> = [];
  protected _currentIndex = this.index;
  protected _inTransition = false;
  protected _rapidChangeDirty = false;
  protected _init = true;
  protected _transitionTo(vIndex: number) {
    this._inTransition = true;
    if(isNaN(vIndex) || vIndex > this._animatedElements.length) {
      vIndex = 0;
    }
    M.anime({
      targets: this._animatedElements[this._currentIndex],
      opacity: [1.0, 0.0],
      easing: 'linear',
      duration: this.eachFade,
      complete: ()=> {
        for(let n = 0; n < this._animatedElements[this._currentIndex].length; n++) {
          (this._animatedElements[this._currentIndex][n] as HTMLElement).style.display = "none"; 
        }
        for(let i = 0; i < this._animatedElements[vIndex].length; i++) {
          (this._animatedElements[vIndex][i] as HTMLElement).style.display = "";
        }
        M.anime({
          targets: this._animatedElements[vIndex],
          opacity: [0.0, 1.0],
          easing: 'linear',
          duration: this.eachFade,
          complete: ()=> {
            if(this._rapidChangeDirty) {
              this._rapidChangeDirty = false;
              this._transitionTo(this.index);
            }
          }
        });
        this._currentIndex = vIndex;
        this._inTransition = false;
        let tsW = 'scrollTo';
        window[tsW]({top: 0, left: 0, behavior: 'instant'});
      }
    });
  }
  render() {
    return (<slot/>);
  }
  trackAnimatableElements() {
    this._animatedElements = [];
    this._elementNames = [];
    let children = this.dashboardElement.children;
    if(children.length > 0) {
      for(let i = 0; i < children.length; i++) {
        this._elementNames.push(children[i].getAttribute("id"));
        this._animatedElements.push([children[i]]);
      }
    }
  }
  componentDidLoad() {
    this.trackAnimatableElements(); // TODO: Catch slot change events for dynamic updates.
    this._currentIndex = this.index;
    if(this.view) {
      this.setViewById(this.view);
    }
    for(let i = 0; i < this._animatedElements.length; i++) {
      if(i !== this.index) {
        for(let n = 0; n < this._animatedElements[i].length; n++) {
          (this._animatedElements[i][n] as HTMLElement).style.display = "none";
          (this._animatedElements[i][n] as HTMLElement).style.opacity = "0.0";
        }
      }
    }
    this._init = false;
  }
}