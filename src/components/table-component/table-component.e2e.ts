import { newE2EPage } from '@stencil/core/testing';

describe('table-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<table-component></table-component>');

    const element = await page.find('table-component');
    expect(element).toHaveClass('hydrated');
  });
});
