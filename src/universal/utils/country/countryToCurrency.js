export default function (country) {
  switch (country) {
    case 'czech-republic':
      return 'CZK';
    case 'united-kingdom':
      return 'GBP';

    default:
      return 'USD';
  }
}
