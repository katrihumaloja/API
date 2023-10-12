import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_SEARCH = "https://www.themealdb.com/api/json/v1/1/search.php?s="
const API_URL = "https://www.themealdb.com/api/json/v1/1/random.php"

export default function Meal() {
    const [meal, setMeal] = useState('')
    const [category, setCategory] = useState('')
    const [image, setImage] = useState('')
    const [instructions, setInstructions] = useState('')
    const [search, setSearch] = useState('')
    const [ingredients, setIngredients] = useState([])

    useEffect(() => {
        axios.get(API_URL)
            .then((response) => {
                const meal = response.data.meals[0]
                setMeal(meal.strMeal)
                setCategory(meal.strCategory)
                setInstructions(meal.strInstructions)
                setImage(meal.strMealThumb)
                setIngredients(getIngredients(meal))
            }).catch(error => {
                alert("Issue with finding recipe")
            })
    }, [])

    const searchMeal = () => {
        axios.get(API_SEARCH + search)
            .then((response) => {
                const meal = response.data.meals[0]
                if (meal) {
                    setMeal(meal.strMeal);
                    setCategory(meal.strCategory);
                    setInstructions(meal.strInstructions);
                    setImage(meal.strMealThumb);
                    setIngredients(getIngredients(meal))
                } else {
                    alert('No matching recipe found')
                }
            }).catch((error) => {
                alert('No matching recipe found')
            })
        setSearch('');
    }

    const getIngredients = (meal) => {
        const ingredientsArray = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal['strIngredient' + i];
            if (ingredient) {
                ingredientsArray.push(`${meal['strMeasure' + i]} ${ingredient}`);
            }
        }
        return ingredientsArray;
    }

    return (
        <div id="container">
            <h1>Recipes</h1>
            <input type="text" placeholder='Search...' value={search} onChange={(e) => setSearch(e.target.value)} />
            <button onClick={searchMeal}>Search</button>
            <h2>{meal}</h2>
            <h4>Category</h4> <p>{category}</p>
            <h4>Ingredients</h4>
            <ul>
                {ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <h4>Instructions</h4> <p>{instructions}</p>
            <img src={image} alt="" />
        </div>
    )
}
