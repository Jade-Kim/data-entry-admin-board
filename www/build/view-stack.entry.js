import { r as registerInstance, h, g as getElement } from './index-6b8c719e.js';

const viewStackCss = "";

const ViewStack = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.index = 0;
        this.eachFade = 400;
        this._animatedElements = [];
        this._elementNames = [];
        this._currentIndex = this.index;
        this._inTransition = false;
        this._rapidChangeDirty = false;
        this._init = true;
    }
    setIndex(newValue, oldValue = null) {
        if (this._init) {
            this._currentIndex = newValue;
            return;
        }
        if (newValue !== oldValue && !this._inTransition) {
            this._transitionTo(newValue);
        }
        else {
            this._rapidChangeDirty = true;
        }
    }
    setViewById(newValue, oldValue = null) {
        if (!newValue || newValue === "") {
            this.index = 0;
            return;
        }
        for (let i = 0; i < this._elementNames.length; i++) {
            if (this._elementNames[i] === newValue) {
                this.index = i;
                return;
            }
        }
        this.index = 0;
        return oldValue;
    }
    _transitionTo(vIndex) {
        this._inTransition = true;
        if (isNaN(vIndex) || vIndex > this._animatedElements.length) {
            vIndex = 0;
        }
        M.anime({
            targets: this._animatedElements[this._currentIndex],
            opacity: [1.0, 0.0],
            easing: 'linear',
            duration: this.eachFade,
            complete: () => {
                for (let n = 0; n < this._animatedElements[this._currentIndex].length; n++) {
                    this._animatedElements[this._currentIndex][n].style.display = "none";
                }
                for (let i = 0; i < this._animatedElements[vIndex].length; i++) {
                    this._animatedElements[vIndex][i].style.display = "";
                }
                M.anime({
                    targets: this._animatedElements[vIndex],
                    opacity: [0.0, 1.0],
                    easing: 'linear',
                    duration: this.eachFade,
                    complete: () => {
                        if (this._rapidChangeDirty) {
                            this._rapidChangeDirty = false;
                            this._transitionTo(this.index);
                        }
                    }
                });
                this._currentIndex = vIndex;
                this._inTransition = false;
                let tsW = 'scrollTo';
                window[tsW]({ top: 0, left: 0, behavior: 'instant' });
            }
        });
    }
    render() {
        return (h("slot", null));
    }
    trackAnimatableElements() {
        this._animatedElements = [];
        this._elementNames = [];
        let children = this.dashboardElement.children;
        if (children.length > 0) {
            for (let i = 0; i < children.length; i++) {
                this._elementNames.push(children[i].getAttribute("id"));
                this._animatedElements.push([children[i]]);
            }
        }
    }
    componentDidLoad() {
        this.trackAnimatableElements(); // TODO: Catch slot change events for dynamic updates.
        this._currentIndex = this.index;
        if (this.view) {
            this.setViewById(this.view);
        }
        for (let i = 0; i < this._animatedElements.length; i++) {
            if (i !== this.index) {
                for (let n = 0; n < this._animatedElements[i].length; n++) {
                    this._animatedElements[i][n].style.display = "none";
                    this._animatedElements[i][n].style.opacity = "0.0";
                }
            }
        }
        this._init = false;
    }
    get dashboardElement() { return getElement(this); }
    static get watchers() { return {
        "index": ["setIndex"],
        "view": ["setViewById"]
    }; }
};
ViewStack.style = viewStackCss;

export { ViewStack as view_stack };
