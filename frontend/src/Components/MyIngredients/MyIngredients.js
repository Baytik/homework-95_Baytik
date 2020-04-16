import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchMyIngredients} from "../../store/actions/ingridientsAction";
import {apiURL} from "../../apiURL";

class MyIngredients extends Component {

    componentDidMount() {
        this.props.fetchMyIngredients();
    }

    render() {
        return (
            <div className="cocktails">
                <h1>My Cocktails</h1>
                {this.props.myIngredients.length <= 0 ? (
                    <h2 style={{color: 'red'}}>You have not cocktail</h2>
                ) : (
                    <>
                {this.props.myIngredients.map(ingredient => (
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
                                <p style={{color: 'green', fontSize: '24px'}}>On Moderation</p>
                            )}
                        </div>
                    </div>
                ))}
                </>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user,
    myIngredients: state.ingredients.myIngredients
});

const mapDispatchToProps = dispatch => ({
    fetchMyIngredients: () => dispatch(fetchMyIngredients())
});

export default connect(mapStateToProps, mapDispatchToProps)(MyIngredients);