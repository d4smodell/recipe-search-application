import React, { useState } from "react";
import "./App.css";
import Axios from "axios";
import Recipe from './components/Recipe'

const App = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([])

  const APP_ID = "8c74d70f";
  const APP_KEY = "4d133fe698cf66f9a457d86ca21cc42e";
  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`;

  const getData = async () => {
    const result = await Axios.get(url);
    setRecipes(result.data.hits)

    console.log(result);
    setQuery('')
  };

  const onSubmit = (event) => {
    event.preventDefault();
    getData();
  };

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="App">
      <h1 onClick={getData}>Food Searching App</h1>
      <form className="search-form" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Search Food"
          autoComplete="off"
          onChange={onChange}
          value={query}
        />
        <input type="submit" value="search" />
      </form>
      <div className='recipes'>
        {recipes !== [] && recipes.map(recipe => <Recipe recipe={recipe} key={recipe.id}/>)}
      </div>
    </div>
  );
};

export default App;
