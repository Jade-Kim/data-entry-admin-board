const e=window.boxcar.h;class t{render(){return e("slot",null)}updateKeys(e){for(let t=0;t<this.navElement.children.length;t++){let n=this.navElement.children[t].getAttribute("id");n&&(this.navElement.children[t].value=e[n])}}componentDidLoad(){boxcarutils.onNavigationChange(e=>this.updateKeys(e))}static get is(){return"table-router"}static get properties(){return{navElement:{elementRef:!0}}}}export{t as TableRouter};