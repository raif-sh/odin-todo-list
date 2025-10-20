import { homeContent } from './home';

function pageLoad() {
  const content = document.querySelector('#content');
  content.textContent = ''; // clear if needed
  homeContent(); // render the home module
}

export default pageLoad;