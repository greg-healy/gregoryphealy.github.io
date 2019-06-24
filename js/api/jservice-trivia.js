export function getTrivia(){
  const baseUrl = 'http://jservice.io';
  fetch(baseUrl+'/api/random')
    .then(response => response.json())
    .then(response => resolve({
        question: response.question,
        answer: response.answer,
        category: response.category.title
      })
    )
    .catch(error => console.error('Error:',error))
}
