import * as React from 'react';


const useStorageState = (key, initialState) => {

  const [value, setValue] = React.useState(localStorage.getItem(key) || initialState);

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value])

  return [value, setValue]
}

const App = () => {

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
  
  const[searchTerm, setSearchTerm] = useStorageState('search','World');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  const searchedBoardGames = boardGameList.filter( 
    story => story.title.toLocaleLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h1>Hello {searchTerm}</h1>

      <InputWithLabel 
        onInputChange={handleSearch} 
        value={searchTerm} 
        id='search' 
        type='text'
        isFocused={true} 
      >
        <strong>Search for</strong>
        &nbsp;
      </InputWithLabel>
      
      <BoardGamesList list={searchedBoardGames}/>      
      <hr />
    </>
)}

const BoardGamesList = ({list}) => (
    <>
      <h2>Here are some of my favorite board games:</h2>
      <ul>
      {list.map(({objectId, ...item}) =>
        <ListItem key={objectId} 
        {...item}
        />
      )}
      </ul>
  </>
  )

const ListItem = (
  { 
    
    title, 
    url, 
    publisher, 
    score
    
  }
  ) => (
  <>
    <li>
      <span>
        <a href={url}>{title}</a>
      </span>
      <span> by {publisher}</span>
      <span> score: {score}</span>
    </li>
  </>
)

const InputWithLabel = ({id, type, value, onInputChange, children, isFocused}) =>{ 
  
  // A
  const inputRef = React.useRef();

  // C
  React.useEffect(() => {
    if (isFocused && inputRef.current){
      // D
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      {/* B */}
      
      <input ref={inputRef} id={id} value={value} type={type} onChange={onInputChange}/>

      <p>
        Searching for <strong>{value}</strong>
      </p>
    </>
  );
};

export default App;