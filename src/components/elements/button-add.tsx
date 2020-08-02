import { Component, ComponentInterface, Host, h } from '@stencil/core';

@Component({
  tag: 'button-add',
  // styleUrl: 'delete-button.css',
  // shadow: true,
})
export class ButtonAdd implements ComponentInterface {

  render() {
    return (
      <Host>
        <slot><button class="waves-effect waves-light btn-large orange accent-3 addBtns">ADD ROW</button></slot>
      </Host>
    );
  }

}
