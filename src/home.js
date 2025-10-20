import shawarmaImage from "./shawarma-cutting.png";

const homeContent = function() {
const content = document.querySelector('#content');
content.textContent = ''; //clear existing content

const title = "Fuel Your Cravings — One Shawarma at a Time";
const headerTwo = document.createElement('h2');
headerTwo.textContent = title;

const intro = "Late-night hunger? We got you. Juicy meats, garlicky sauces, and fries that slap. Open till late — because good food doesn’t have a curfew."
const paragraph = document.createElement('p');
paragraph.textContent = intro;


const heroImageAlt = "A close-up shot of a shawarma wrap being sliced from the rotisserie — juicy meat, glowing coals, warm colors, maybe some steam for effect."
const image = document.createElement('img');
image.src = shawarmaImage;
image.alt = heroImageAlt

content.appendChild(headerTwo);
content.appendChild(image);
content.appendChild(paragraph);

}

export { homeContent };
