import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import History from './components/History';
import DetailCard from './components/DetailCard';
import EmptyCard from './components/EmptyCard';

import { AiOutlineSearch } from 'react-icons/ai';
import { useReducer } from 'react';

const initialState = {
  search: '',
  searchHistory: []
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_SEARCH':
      return {...state, search: action.payload}
    case 'ADD_SEARCH_HISTORY':
      return {...state, searchHistory: [...state.searchHistory, state.search]}
    case 'RESET_SEARCH':
      return {...state, search: action.payload}
    case 'DELETE_HISORY':
      return {...state, searchHistory: action.payload}
    default:
      return state
  }
}

const queryClient = new QueryClient();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="container">
        <div className="conatiner-two">
          <header>
            <h1>Devfinder</h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                dispatch({ type: "ADD_SEARCH_HISTORY" });
                dispatch({ type: "RESET_SEARCH", payload: "" });
              }}
            >
              <label htmlFor="search">
                <AiOutlineSearch />
                <input
                  type="text"
                  id="search"
                  name="search"
                  placeholder="Search for developers"
                  autoComplete="off"
                  value={state.search}
                  onChange={(e) => {
                    dispatch({
                      type: "UPDATE_SEARCH",
                      payload: e.target.value,
                    });
                  }}
                />
                <button type="submit">Search</button>
              </label>
            </form>
          </header>
          <div className="result">
            {state.searchHistory.length === 0 ? (
              <EmptyCard text="Start searching for a dev" />
            ) : (
              <DetailCard
                user={state.searchHistory[state.searchHistory.length - 1]}
              />
            )}
          </div>
          {state.searchHistory.length !== 0 ? (
            <>
              <History users={state.searchHistory} />
              <button
                className='delete-button'
                onClick={() => {
                  dispatch({ type: "DELETE_HISORY", payload: [] });
                }}
              >
                Delete History
              </button>
            </>
          ) : null}
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
