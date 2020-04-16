import React, {Component} from 'react';
import './Ingredients.css';
import {connect} from "react-redux";
import {fetchIngredients} from "../../store/actions/ingridientsAction";
import {apiURL} from "../../apiURL";

class Ingredients extends Component {

    componentDidMount() {
        this.props.fetchIngredients();
    }

    render() {
        console.log(this.props.ingredients);
        return (
            <div className="cocktails">
                <h1>Cocktails</h1>
                {this.props.ingredients.map(ingredient => (
                    <div className="cocktail" key={ingredient._id}>
                        <div className="flex">
                            <div>
                                <img src={apiURL + '/uploads/' + ingredient.image} alt=""/>
                            </div>
                            <div>
                                <h2>{ingredient.title}</h2>
                                <h3>added: {ingredient.user.displayName}</h3>
                                <h4>Ingredients:</h4>
                                {ingredient.ingredients.map(ing => (
                                    <p key={ing._id}>{ing.name} - <span>
                                        {ing.amount}
                                    </span>
                                    </p>
                                ))}
                            </div>
                        </div>
                        <div className="recipe">
                            <h2>Recipe: </h2>
                            <p>{ingredient.recipe}</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ingredients: state.ingredients.ingredients
});

const mapDispatchToProps = dispatch => ({
    fetchIngredients: () => dispatch(fetchIngredients()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ingredients);