export function getCatFact() {
  const baseUrl = 'https://cat-fact.herokuapp.com'
  fetch(baseUrl + '/facts/random')
    .then(response => response.json())
    .then(response => resolve(response.text))
    .catch(error => console.error('Error:', error))
}
