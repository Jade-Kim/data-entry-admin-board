import { Component, ComponentInterface, Host, h } from '@stencil/core';

@Component({
  tag: 'arrow-guide',
})
export class ArrowGuide implements ComponentInterface {

  render() {
    return (
      <Host>
        <slot>
          <div><i class="material-icons">arrow_upward</i> Click each cell to edit<br /></div>
        </slot>
      </Host>
    );
  }

}
