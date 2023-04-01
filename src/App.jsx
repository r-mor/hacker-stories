import * as React from 'react';

const title = 'World';

const numbers = [1,2,3,4,5,6,7];

const exponentialNumbers = numbers.map(function (number) {
  return number * number;
});

console.log("Hello " + exponentialNumbers);

const boardGameList = [
  {
    title: 'Deception Murder in Hong Kong',
    url: 'https://www.boardgames.ca/deception-murder-in-hong-kong-board-game.html',
    designer: null,
    publisher: 'Grey Fox Games',
    score: 9.5,
    objectId: 1
  },
  {
    title: 'Cosmic Encounter',
    url: 'https://www.fantasyflightgames.com/en/products/cosmic-encounter/',
    designer: null,
    publisher: 'Fantasy Flight Games',
    score: 10.0,
    objectId: 2
  },
  {
    title: 'Dominion',
    url: 'https://www.riograndegames.com/games/dominion/',
    designer: null,
    publisher: 'Rio Grande Games',
    score: 8.5,
    objectId: 3
  },
  {
    title: 'Ark Nova',
    url: 'https://capstone-games.com/board-games/ark-nova/',
    designer: null,
    publisher: 'Capstone Games',
    score: 9.0,
    objectId: 4
  },
  {
    title: 'Mindbug',
    url: 'https://mindbug.me/',
    designer: null,
    publisher: 'Nerdlab Games',
    score: 8.5,
    objectId: 5
  },
];

const App = () => (
    <>
      <h1>Hello {title}</h1>
      <Search />
      <BoardGamesList />      
      <hr />
    </>
)

const BoardGamesList = () => (
    <>
      <h2>Here are some of my favorite board games:</h2>
      <ul>
      {boardGameList.map((item) =>
        <li key={item.objectId}>
          <span>
            <a href={item.url}>{item.title}</a>
          </span>
          <span> by {item.publisher}</span>
          <span> score: {item.score}</span>
        
        </li>
        )}
      </ul>
    </>
  )


const Search = () => {
  const handleChange = (event) => {
    //synthetic event
    console.log(event);
    // value of target (here: input HTML element)
    console.log(event.target.value);
  };

  return(
    <>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleChange}/>
    </>
  )
}

export default App;