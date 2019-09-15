import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from './Recipe'


const App = () => {

  const APP_ID = "11b8cd00";
  const APP_KEY = "e7a0beb5dcf6bf99dabea88af5563ae1";
  // const exapleRequest = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`

  const [recipies, setRecipies] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('chicken')
  useEffect(() => {
    getRecipies()
  }, [query])

  const getRecipies = async () => {

    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json()
    setRecipies(data.hits)
    console.log(data.hits)
  }

  const updateSearch = e => {
    setSearch(e.target.value)
  }

  const getSearch = e => {
    e.preventDefault()
    setQuery(search)
    setSearch("")
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="recipies">
        {recipies.map(recipe => (
          <Recipe
            key={recipe.recipe.totalWeight}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />

        ))}
      </div>
    </div>

  );
}

export default App;
