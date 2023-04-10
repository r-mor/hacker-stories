import * as React from 'react';

//Data
const initialStoriesList = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    point: 4,
    objectId: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    point: 5,
    objectId: 1,
  },
  {
    title: 'Microsoft',
    url: 'https://www.microsoft.com/en-us/sql-server/sql-server-downloads',
    author: 'Ana K. Milano',
    num_comments: 3,
    point: 10,
    objectId: 2
  },
  {
    title: 'chatGPT',
    url: 'https://chat.openai.com/chat',
    author: 'Marilyn W. Taylor',
    num_comments: 30,
    point: 14,
    objectId: 3
  },
];

const useStorageState = (initialState, key) => {
  const[searchTerm, setSearchTerm] = React.useState(localStorage.getItem('storiesSearch') || initialState);

  React.useEffect(() => {
    localStorage.setItem(key, searchTerm)
  }, [searchTerm]);

  return [searchTerm, setSearchTerm]
}

const getAsyncStories = () =>
new Promise((resolve, reject) =>
  setTimeout(
    () => resolve(
      { 
        data: 
        { 
          stories: initialStoriesList
        }
      }
    ),
    2000
  )
);


const storiesReducer = (state, action) => {
  switch(action.type){
    case 'STORIES_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      };
    case 'STORIES_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'REMOVE_STORY':
      return {
        ...state,
        data: state.data.filter(
          (story) => action.payload.objectId !== story.objectId
        ),
      }

    default:
      throw new Error();
  }
}


//Components

const App = () => {
  const title = 'Hacker Stories'

  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    {data: [], isLoading: false, isError: false }
  )

  React.useEffect(() => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });

      getAsyncStories()
        .then((result) => {
          dispatchStories({ type: 'STORIES_FETCH_SUCCESS', payload: result.data.stories });
      })
      .catch(() => dispatchStories({ type: 'STORIES_FETCH_FAILURE' }))
  }, []);
  
  const [searchTerm, setSearchTerm] = useStorageState('', 'storiesSearch')

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  const handleRemoveStory = (item) => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };

  const storiesSearch = stories.data.filter(
    story => story.title.toLocaleLowerCase().includes(searchTerm.toLowerCase())
  )
  

  return (
    <>
      <h2>{title}</h2>
      <InputWithLabel 
        id = 'search'
        type = 'text'
        isFocused={true}
        onChange={handleSearch} value={searchTerm}>
          <b>Search for: </b>
      </InputWithLabel>
      
      {stories.isError && <p>Something went wrong ...</p>}

      {stories.isLoading ? (<p>Is Loading...</p>) : (
        <List list={storiesSearch} onRemoveItem={handleRemoveStory}/>
      )}
    </>
  )
}

const List = ({list, onRemoveItem}) => {

  return (
    <>
    <ul>
      {list.map(item =>
        <li key={item.objectId}>
          <ListItem 
            item={item}
            onRemoveItem={onRemoveItem}
          />
        </li>
      )}
    </ul>
    <hr/>
    </>
  )
}

const ListItem = ({item, onRemoveItem}) => {

  return(
    <>
      <button onClick={onRemoveItem.bind(null, item)}>Remove</button> &nbsp;
      <span>{item.title}</span> &nbsp;
      <span>{item.author}</span> &nbsp;
      <span>{item.points}</span> &nbsp;
    </>
  )
}

const InputWithLabel = ({id, type, value, onChange, isFocused, children}) => {

  return(
  <>
    <div>
      <label htmlFor={id}>{children}</label>
      <input id={id} type={type} value={value} onChange={onChange} autoFocus={isFocused}/>
      <p>[{value}]</p>
    </div>
  </>
  )
} 



export default App




