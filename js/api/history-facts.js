export function getHistoryFact(){
  const baseUrl = 'http://numbersapi.com';
  fetch(baseUrl+'/random/year')
    .then(response => response.json())
    .then(response => resolve(response))
    .catch(error => console.error('Error:',error))
}
