/*
* Clean html received from wordpress
* remove inline styles
*/
export default function (html) {
  return html.replace(/ style=".*?"/g, '');
}
