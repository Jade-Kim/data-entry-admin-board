import { newSpecPage } from '@stencil/core/testing';
import { TableComponent } from './table-component';

describe('table-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TableComponent],
      html: `<table-component></table-component>`,
    });
    expect(page.root).toEqualHtml(`
      <table-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </table-component>
    `);
  });
});
