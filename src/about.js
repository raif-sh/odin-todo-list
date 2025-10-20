const title = "Our Story — Wrapped in Flavor";
const intro = "It started with a simple craving — the kind you can’t shake off until you taste it.";

const headerTwo = document.createElement('h2');
headerTwo.textContent = title;

const para = document.createElement('p');
const para2 = document.createElement('p');
const para3 = document.createElement('p');
para.textContent = intro;
para2.textContent = "We grew up eating shawarma from street corners and late-night stalls, chasing that perfect mix of smoky meat, garlic, and tangy pickles.";
para3.textContent = "So we built this place to bring that same flavor — fresh, fast, and full of heart — to everyone who walks through our door.";

const headerThree = document.createElement('h3');
headerThree.textContent = "Tagline:";

const tagline = document.createElement('subtitle');
tagline.textContent = "From our grill to your hands — always fresh, always fire.";

const aboutContent = function() {
    const content = document.querySelector('#content');
    content.textContent = ''; //clear existing content

    content.appendChild(headerTwo);
    content.appendChild(para);
    content.append(headerTwo, para, para2, para3, headerThree, tagline);

}

export { aboutContent };