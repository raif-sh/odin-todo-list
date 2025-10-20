import "./styles.css";

import pageLoad from './page-load';
import { homeContent } from './home';
import { menuContent } from './menu';
import { aboutContent } from './about';

// function removeAllChildNodes(parent) {
//   while (parent.firstChild) {
//     parent.removeChild(parent.firstChild);
//   }
// }

// Initial render
pageLoad();

const content = document.querySelector('#content');
const navTabs = document.querySelector('nav');

navTabs.addEventListener('click', (e) => {
  const btnClick = e.target.innerText;
//   removeAllChildNodes(content);

  if (btnClick === 'Home') homeContent();
  else if (btnClick === 'Menu') menuContent();
  else if (btnClick === 'About') aboutContent();
});