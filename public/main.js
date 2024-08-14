// import '../styles/main.scss'; // You have to import your styles for them to work. Comment in this line

const startApp = () => {
  htmlStructure(); // always load first
  header();
  startSortingBtn();
  events(); // always load last
};

const students = [];
const voldysArmy; // starts as an empty array


const events = () => {
  // get form on the DOM on button click
  document.querySelector('#start-sorting').addEventListener('click', () => {
    // put html elements on the DOM on click
    form(); // form
    filterBtnRow(); // filter buttons
    studentAreas(); // students and voldy's army divs
  });

  // target expel buttons to move to voldys army
  document
    .querySelector('#student-container')
    .addEventListener('click', (e) => {
      if (e.target.id.includes('expel')) {
        const [, id] = e.target.id.split('--');
        const index = students.findIndex((student) => student.id === Number(id));

        // move from one array to another
        voldysArmy.push(...students.splice(index, 1));
        // get both sets of students on the DOM
        studentsOnDom('#students', students);
        studentsOnDom('#voldy', voldysArmy);
      }
    });

  // target filter buttons on Dom
  document.querySelector('#filter-container').addEventListener('click', (e) => {
    if (e.target.id.includes('filter')) {
      const [, house] = e.target.id.split('--');

        if (house === 'all') {
          studentsOnDom('#students', students);
        } else if (house) {
          const filter = students.filter((student) => student.house === house);
          studentsOnDom('#students', filter, house);
        }
    }
  });
};

// ********** HTML Components  ********** //
// the basic HMTL structure of app
const htmlStructure = () => {
    const domString = `
    <div id="header-container" class="header mb-3"></div>
    <div id="form-container" class="container mb-3 text-center"></div>
    <div id="filter-container" class="container mb-3"></div>
    <div id="student-container" class="container d-flex"></div>
    `;

  renderToDOM('#app', domString)
};

const header = () => {
  const domString = `<div class="container">
    <h1>Welcome to Hoggy Hogwarts Sorting Hat!</h1>
    <p>
      Hmm, difficult. VERY difficult. <br />Plenty of courage, I see.
      <br />Not a bad mind, either. There's talent, oh yes. <br />And a
      thirst to prove yourself. <br />But where to put you?
    </p>
  </div>`;

  renderToDOM('#header-container', domString);
};

const startSortingBtn = () => {
  const domString = '<button type="button" class="btn btn-info" id="start-sorting">Start the Sorting Ceremony!</button>';

  renderToDOM('#form-container', domString);
};

const studentAreas = () => {
  const domString = `<div id="students">No Students</div>
  <div id="voldy">No Death Eaters</div>`

  renderToDOM('#student-container', domString);
};

const studentsOnDom = (divId, array, house = 'Hogwarts') => {
  let domString = '';
  if(!array.length){
    domString += `NO ${house.toUpperCase()} STUDENTS`
  }

  array.forEach((student) => {
    domString += `
    <div class="card bg-dark text-white">
      <img src="${
  divId === '#voldy'
    ? 'https://carboncostume.com/wordpress/wp-content/uploads/2019/10/deatheater-harrypotter.jpg' : student.crest}" 
          class="card-img" alt="${student.house} crest">
      <div class="card-img-overlay">
        <h5 class="card-title">${student.name}</h5>
        ${
  divId === '#voldy'
    ? '<p class="card-text">Death Eater</p>'
    : ` <p class="card-text">${student.house}</p>
          <button type="button" id="expel--${student.id}" class="btn btn-danger btn-sm">Expel</button>`
}
      </div>
    </div>
    `;
  });
  renderToDOM(divId, domString);
};

const filterBtnRow = () => {
  const domString = `<div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" id="filter--hufflepuff" class="btn btn-warning btn-sm">Hufflepuff</button>
      <button type="button" class="btn btn-primary btn-sm" id="filter--ravenclaw">Ravenclaw</button>
      <button type="button" class="btn btn-success btn-sm" id="filter--slytherin">Slytherin</button>
      <button type="button" class="btn btn-danger btn-sm" id="filter--gryffindor">Gryffindor</button>
      <button type="button" class="btn btn-secondary btn-sm" id="filter--all">All</button>
    </div>`;

  renderToDOM('#filter-container', domString);
};

// ********** LOGIC  ********** //
// sorts student to a house and then place them in the students array
const sortStudent = (e) => {
  e.preventDefault();
  const sortingHat = houses[Math.floor(Math.random() * houses.length)];

  if (e.target.id === 'sorting') {
    const student = document.querySelector('#student-name');

    // create the new student object
    students.push({
      id: createId(students),
      name: student.value,
      house: sortingHat.house,
      crest: sortingHat.crest
    });

    student.value = ''; // reset value of input
    studentsOnDom('#students', students);
  }
};

// Create a new ID for the students
const createId = (array) => {
  if (array.length) {
    const idArray = array.map((el) => el.id);
    return Math.max(...idArray) + 1;
  }
  return 0;
};


// add form to DOM on start-sorting click.
// Add events for form after the form is on the DOM
const form = () => {
  const domString = `<form id="sorting" class="d-flex flex-column form-floating ">
    <input
    type="text"
    class="form-control mb-1"
    id="student-name"
    placeholder="Enter a name"
    required
  />
  <label for="floatingInputValue">Name to be sorted</label>
<button type="submit" class="btn btn-success">Get Sorted!</button>
</form>`;

  renderToDOM('#form-container', domString);

  // has to be put on the DOM after form is on DOM, not before
  // on form submit, sort student
  document.querySelector('#sorting').addEventListener('submit', sortStudent);
};

const renderToDOM = (divId, content) => {
  const selectedDiv = document.querySelector(divId);
  selectedDiv.innerHTML = content;
};

startApp();

const houses = [
  {
    house: 'gryffindor',
    crest:
      'https://static.wikia.nocookie.net/pottermore/images/1/16/Gryffindor_crest.png'
  },
  {
    house: 'slytherin',
    crest:
      'https://static.wikia.nocookie.net/pottermore/images/4/45/Slytherin_Crest.png'
  },
  {
    house: 'hufflepuff',
    crest:
      'https://static.wikia.nocookie.net/pottermore/images/5/5e/Hufflepuff_crest.png'
  },
  {
    house: 'ravenclaw',
    crest:
      'https://static.wikia.nocookie.net/pottermore/images/4/4f/Ravenclaw_crest.png'
  }
];
