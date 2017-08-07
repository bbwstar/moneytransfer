import cleanWordpressHtml from '../cleanWordpressHtml';

describe('cleanWordpressHtml (UTILS)', () => {
  it('removes styles from html', () => {
    const html = '<html><div style="color: red"><span style="style: ahoj">Red</span></div></html>';

    expect(cleanWordpressHtml(html)).toBe('<html><div><span>Red</span></div></html>');
  });
});
