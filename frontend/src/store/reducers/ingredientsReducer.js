import {FETCH_INGREDIENTS_SUCCESS} from "../actions/ingridientsAction";

const initialState = {
    ingredients: [],
};

const artistsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_INGREDIENTS_SUCCESS:
            return {...state, ingredients: action.ingredients};
        default:
            return state;
    }
};

export default artistsReducer;
