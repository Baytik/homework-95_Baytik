import {FETCH_INGREDIENTS_SUCCESS, FETCH_MY_INGREDIENTS_SUCCESS} from "../actions/ingridientsAction";

const initialState = {
    ingredients: [],
    myIngredients: []
};

const artistsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_INGREDIENTS_SUCCESS:
            return {...state, ingredients: action.ingredients};
        case FETCH_MY_INGREDIENTS_SUCCESS:
            return {...state, myIngredients: action.myIngredients};
        default:
            return state;
    }
};

export default artistsReducer;
