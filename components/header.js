const renderToDOM = (divId, content) => {
  const selectedDiv = document.querySelector(divId);
  selectedDiv.innerHTML = content;
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

export { renderToDOM, header };
