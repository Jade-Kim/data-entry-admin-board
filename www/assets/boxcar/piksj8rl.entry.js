const e=window.boxcar.h;class t{constructor(){this.value=null}setValue(e,t){e!=t&&(boxcarutils.setNavigationPair(this._id,e),this.valueChanged.emit(e))}render(){return e("slot",null)}componentDidLoad(){this._id=this.rkeyElement.getAttribute("id"),this.value&&(boxcarutils.setNavigationPair(this._id,this.value),this.valueChanged.emit(this.value))}static get is(){return"router-key"}static get properties(){return{rkeyElement:{elementRef:!0},value:{type:String,attr:"value",reflectToAttr:!0,watchCallbacks:["setValue"]}}}static get events(){return[{name:"valueChanged",method:"valueChanged",bubbles:!0,cancelable:!0,composed:!0}]}}export{t as RouterKey};