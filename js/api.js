import {getCatFact} from './api/cat-facts.js';
import {getTrivia} from './api/jservice-trivia.js';
import {getHistoryFact} from './api/history-facts.js';

//Prompt the user for which API they would like to user
function select_api() {
  let apiModal = document.getElementById('apiModal');
  $('#apiModal').modal('show');
  //Listen for which modal they click on
  $('#apiModal').click((event) => {
    //Determine which API was clicked and return function to use
    let clicked = event.target.closest('span');
    switch (clicked.id) {
      case 'cat-facts-select':
        $('#apiModal').modal('hide');
        return getCatFact();
        break;
      case 'history-facts-select':
        $('#apiModal').modal('hide');
        return getHistoryFact();
        break;
      case 'general-trivia-select':
        $('#apiModal').modal('hide');
        return getTrivia();
        break;
      default:
        break;
    }
  })
}

//Store selection and listen for completion of pomodoro session
let selected_api = window.addEventListener('DOMContentLoaded', select_api);
