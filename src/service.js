const baseUrl = 'https://gateway.marvel.com/v1/public/characters';
const PUB_KEY = '9f2bf5da8f414dc8ca39296c54eb48ef';
const timestamp = '1566543993';
const md5hash = '1a40761d490c2e791cdd2814975ea5af';
const limit = 30;

export async function fetchCharacters(offset) {
  let api =
    baseUrl +
    '?ts=' +
    timestamp +
    '&apikey=' +
    PUB_KEY +
    '&hash=' +
    md5hash +
    '&limit=' +
    limit;
  if (offset !== 0) {
    api += '&offset=' + offset;
  }

  const response = await fetch(api);
  const charactersData = response.json();
  return charactersData;
}
