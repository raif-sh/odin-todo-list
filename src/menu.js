export function menuContent() {
  const content = document.querySelector('#content');
  content.textContent = ''; // clear existing content

  const title = "Our Shawarma Lineup";
  const intro = "Every wrap, bowl, and platter is built fresh — marinated overnight, grilled to perfection, and served with love (and extra garlic sauce, if you know what’s up).";

  const headerTwo = document.createElement('h2');
  headerTwo.textContent = title;

  const para = document.createElement('p');
  para.textContent = intro;

  const wrapsHeader = document.createElement('h3');
  wrapsHeader.textContent = "Wraps";

  const items = [
    {
      name: "Classic Chicken Shawarma",
      desc: "Marinated in our signature spice blend, grilled to juicy perfection, and wrapped with garlic sauce, pickles, and fries."
    },
    {
      name: "Beef Shawarma",
      desc: "Tender beef slices with tahini, onions, and tomatoes. Bold, smoky, and unforgettable."
    },
    {
      name: "Falafel Wrap (V)",
      desc: "Crispy chickpea fritters with hummus, pickled veggies, and a drizzle of tahini."
    }
  ];

  const menuSection = document.createElement('div');
  items.forEach(item => {
    const h4 = document.createElement('h4');
    h4.textContent = item.name;
    const p = document.createElement('p');
    p.textContent = item.desc;
    menuSection.append(h4, p);
  });

  content.append(headerTwo, para, wrapsHeader, menuSection);
};