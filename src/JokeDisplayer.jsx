import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './JokeDisplayer.css';

function JokeDisplayer({ category = '', numJokes = 1 }) {
    const [jokes, setJokes] = useState([]);
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);

    useEffect(() => {
        fetchJokes();
    }, [category, numJokes]);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const fetchJokes = async () => {
        try {
            const response = await axios.get(`https://v2.jokeapi.dev/joke/${category}?&amount=1`);
            const { data } = response;
            console.log('Response:', data);
            if (!data.error) {
                setJokes([data]);
            } else {
                console.error('Error:', data.message);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handleNewJoke = () => {
        fetchJokes();
        console.log(jokes)
    };

    const addToFavorites = (joke) => {
        setFavorites([...favorites, joke]);
    };

    const removeFromFavorites = (joke) => {
        setFavorites(favorites.filter(fav => fav.id !== joke.id));
    };

    return (
        <div className="mainJoke">
            <ul>
                {jokes && jokes.map((joke, index) => {
                    const isFavorite = favorites.some(fav => fav.id === joke.id);
                    return (
                        <li className="joke" key={index}>
                            <p className="jokeText">{joke.type === 'single' ? joke.joke : joke.setup}</p>
                            {joke.type !== 'single' && <p className="jokeText" id="delivery">{joke.delivery}</p>}
                            <button onClick={() => isFavorite ? removeFromFavorites(joke) : addToFavorites(joke)}>
                                {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                            </button>
                        </li>
                    )
                })}
            </ul>
            <button onClick={handleNewJoke}>Generate New Joke</button>
            <h2>Favorites</h2>
            <ul>
                {favorites.map((joke, index) => (
                    <li className="joke-favourites" key={index}>
                        <p className="jokeText-favourites">{joke.type === 'single' ? joke.joke : joke.setup}</p>
                        {joke.type !== 'single' && <p className="jokeText-favourites" id="delivery">{joke.delivery}</p>}
                        <button onClick={() => removeFromFavorites(joke)}>Remove from favorites</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default JokeDisplayer;