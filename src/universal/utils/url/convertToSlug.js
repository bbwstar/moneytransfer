/*
* Replace space with dash
* replace spaceDashSpace with dash
* remove non word characters (&, $, %, etc..)
*/
export default function (text) {
  return text.toLowerCase().replace(/ /g, '-').replace(/[-]+/g, '-').replace(/[^\w-]+/g, '');
}
