import React, { useState } from 'react';
import { Card } from './components/JokeCard';
import Header from './components/Header';
import CategorySelect from './components/CategorySelect';

import { 
  getRandomInCategory, 
  getRandomJoke, 
  getQueriedJoke 
} from './utils/ChunkJoke';

import './App.css';

const App: React.FC = () => {
  
  
  interface JokeData {
    icon_url: string;
    value: string;
  }
  const [joke, setJokeData] = useState<JokeData>({ icon_url: '', value: '' });

  const getJokeData = async (category: String, query: String) => {
    var joke: any;
    if(query !== '') {
      joke = await getQueriedJoke(query);
      setJokeData({icon_url: joke.data.icon_url, value: joke.data.value});
      return;
    }
    if(category !== '') {
      joke = await getRandomInCategory(category);
      setJokeData({icon_url: joke.data.icon_url, value: joke.data.value})
      return;
    }
    if(category === '' && query === '') {
      joke = await getRandomJoke();
      setJokeData({icon_url: joke.data.icon_url, value: joke.data.value})
      return;
    }
  }

  return (
    <div className="App">
      <Header />
      <CategorySelect callback={getJokeData} />
      <Card Image={joke.icon_url} Body={joke.value}/>
    </div>
  );
}

export default App;
