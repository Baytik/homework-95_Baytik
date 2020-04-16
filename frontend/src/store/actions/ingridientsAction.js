import axiosAPI from "../../axiosAPI";
import {push} from 'connected-react-router';

export const CREATE_INGREDIENT_ERROR = 'CREATE_INGREDIENT_ERROR';
export const FETCH_INGREDIENTS_SUCCESS = 'FETCH_INGREDIENTS_SUCCESS';
export const FETCH_INGREDIENTS_ERROR = 'FETCH_INGREDIENTS_ERROR';

export const createIngredientError = (error) => ({type: CREATE_INGREDIENT_ERROR, error});
export const fetchIngredientsSuccess = (ingredients) => ({type: FETCH_INGREDIENTS_SUCCESS, ingredients});
export const fetchIngredientsError = (error) => ({FETCH_INGREDIENTS_ERROR, error});

export const createIngredient = (ingredient) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.user;
            await axiosAPI.post('/ingredients', ingredient, {headers: {'Authorization': token.token}});
            dispatch(push('/'));
        } catch (error) {
            dispatch(createIngredientError(error))
        }
    }
};

export const fetchIngredients = () => {
  return async (dispatch, getState) => {
    try {
        const token = getState().user.user;
        if(!token) {
            const response =  await axiosAPI.get('/ingredients');
            dispatch(fetchIngredientsSuccess(response.data));
        } else {
            const response =  await axiosAPI.get('/ingredients', {headers: {'Authorization': token.token}});
            dispatch(fetchIngredientsSuccess(response.data));
        }
    } catch (error) {
        fetchIngredientsError(error)
    }
  }
};