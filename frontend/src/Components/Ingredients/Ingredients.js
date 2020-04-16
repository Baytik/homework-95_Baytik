import React, {Component} from 'react';
import './Ingredients.css';
import {connect} from "react-redux";
import {deleteIngredient, fetchIngredients, publishIngredient} from "../../store/actions/ingridientsAction";
import {apiURL} from "../../apiURL";

class Ingredients extends Component {

    componentDidMount() {
        this.props.fetchIngredients();
    }

    deleteIngredientHandler = async (id) => {
        await this.props.deleteIngredient(id)
    };

    publicIngredientHandler = async (id) => {
      await this.props.publishIngredient(id)
    };

    render() {
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
                        <div>
                            {ingredient.published === false && (
                                <button className="public" onClick={() => this.publicIngredientHandler(ingredient._id)}>Public</button>
                            )}
                            {this.props.user ? this.props.user.role === 'admin' && (
                            <button className="delete" onClick={() => this.deleteIngredientHandler(ingredient._id)}>Delete</button>
                            ) : (
                                <div/>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user,
    ingredients: state.ingredients.ingredients
});

const mapDispatchToProps = dispatch => ({
    fetchIngredients: () => dispatch(fetchIngredients()),
    publishIngredient: (id) => dispatch(publishIngredient(id)),
    deleteIngredient: (id) => dispatch(deleteIngredient(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Ingredients);