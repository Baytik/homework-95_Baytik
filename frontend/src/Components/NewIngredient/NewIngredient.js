import React, {useState} from 'react';
import './NewIngredient.css';
import {useDispatch} from "react-redux";
import {createIngredient} from "../../store/actions/ingridientsAction";

const NewIngredient = () => {
    const [ingredients, setIngredients] = useState([]);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [recipe, setRecipe] = useState('');

    const dispatch = useDispatch();

    const addIngredients = () => {
      setIngredients(ingredients=> [...ingredients, {name: '', amount: ''}])
    };

    const changeIngredient = (i, key, e) => {
        const ingCopy = {...ingredients[i]};
        ingCopy[key] = e.target.value;
        const ingsCopy = [...ingredients];
        ingsCopy[i] = ingCopy;
        setIngredients(ingsCopy);
    };

    const inputChangeHandler = (e) => {
        setTitle(e.target.value);
    };

    const changeInput = (e) => {
        setRecipe(e.target.value);
    };

    const fileChangeHandler = e => {
        setImage(e.target.files[0]);
    };

    const addNewCocktail = async () => {
        const Cocktail = new FormData();
        Cocktail.append('ingredients', JSON.stringify(ingredients));
        Cocktail.append('title', title);
        Cocktail.append('image', image);
        Cocktail.append('recipe', recipe);
        await dispatch(createIngredient(Cocktail));
    };

    return (
        <div className="new-ingredient">
            <h1>Add new cocktail</h1>
            <div>
                <span>Name:</span>
                <input type="text" className="input-1" onChange={inputChangeHandler} value={title}/>
            </div>
            <div className="ingredients">
                {ingredients.map((ing, i) => (
                    <div key={i}>
                        <input type="text"
                               className="input-2"
                               placeholder="Ingredient name"
                               onChange={e => changeIngredient(i, 'name', e)}
                        />
                        <input type="text"
                               className="input-5"
                               placeholder="Amount"
                               onChange={e => changeIngredient(i, 'amount', e)}
                        />
                    </div>
                ))}
                <div>
                    <button className="add" onClick={addIngredients}>Add ingredient</button>
                </div>
            </div>
            <div>
                <span>Recipe:</span>
                <input type="text" className="input-3" onChange={changeInput} value={recipe}/>
            </div>
            <div>
                <span>Image:</span>
                <input type="file" className="input-4" onChange={fileChangeHandler}/>
            </div>
            <div>
                <button className="create" onClick={addNewCocktail}>Create cocktail</button>
            </div>
        </div>
    );
};

export default NewIngredient;