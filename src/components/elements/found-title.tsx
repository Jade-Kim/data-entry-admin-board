import { Component, ComponentInterface, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'found-title',
  //styleUrl: 'found-title.css',
  // shadow: true,
})
export class FoundTitle implements ComponentInterface {

  @Prop() length: any;
  @Prop() name: string;

  render() {
    return (
      <Host>
        <slot>
          <h5>Found <span class="blueColor">{this.length} {this.name}</span> items</h5>
        </slot>
      </Host>
    );
  }

}
