import React, { useState } from 'react';
import JokeDisplayer from "./JokeDisplayer.jsx";
import './HomePage.css';

function HomePage() {
    const [selectedCategory, setSelectedCategory] = useState('Dark');
    const categories = ['Dark', 'Misc', 'Programming', 'Pun'];


    const handleSelectChange = (event) => {
        setSelectedCategory(event.target.value);
    }



    return (
        <div className="mainPage">
            <h1>Jokes</h1>
            <select className="dropdown-select" onChange={handleSelectChange} value={selectedCategory}>
                {categories.map(category => (
                        <option className="dropdown-option" key={category} value={category}>
                            {category}
                        </option>
                ))}
            </select>
            <JokeDisplayer category={selectedCategory} />
        </div>
    )
}
export default HomePage;