import axiosAPI from "../../axiosAPI";
import {push} from 'connected-react-router';

export const CREATE_INGREDIENT_ERROR = 'CREATE_INGREDIENT_ERROR';
export const FETCH_INGREDIENTS_SUCCESS = 'FETCH_INGREDIENTS_SUCCESS';
export const FETCH_INGREDIENTS_ERROR = 'FETCH_INGREDIENTS_ERROR';
export const DELETE_INGREDIENT_ERROR = 'DELETE_INGREDIENT_ERROR';
export const PUBLIC_INGREDIENT_ERROR = 'PUBLIC_INGREDIENT_ERROR';
export const FETCH_MY_INGREDIENTS_SUCCESS = 'FETCH_MY_INGREDIENTS_SUCCESS';
export const FETCH_MY_INGREDIENTS_ERROR = 'FETCH_MY_INGREDIENTS_ERROR';

export const createIngredientError = (error) => ({type: CREATE_INGREDIENT_ERROR, error});
export const fetchIngredientsSuccess = (ingredients) => ({type: FETCH_INGREDIENTS_SUCCESS, ingredients});
export const fetchIngredientsError = (error) => ({FETCH_INGREDIENTS_ERROR, error});
export const deleteIngredientError = (error) => ({type: DELETE_INGREDIENT_ERROR, error});
export const publicIngredientError = (error) => ({type: PUBLIC_INGREDIENT_ERROR, error});
export const fetchMyIngredientsSuccess = (myIngredients) => ({type: FETCH_MY_INGREDIENTS_SUCCESS, myIngredients});
export const fetchMyIngredientsError = (error) => ({type: FETCH_MY_INGREDIENTS_ERROR, error});

export const createIngredient = (ingredient) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.user;
            await axiosAPI.post('/ingredients', ingredient, {headers: {'Authorization': token.token}});
            alert('Your cocktail on moderation');
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

export const fetchMyIngredients = () => {
  return async (dispatch, getState) => {
      try {
          const token = getState().user.user;
          const response = await axiosAPI.get('/ingredients/my/ingredients', {headers: {'Authorization': token.token}});
          dispatch(fetchMyIngredientsSuccess(response.data))
      } catch (error) {
          fetchMyIngredientsError(error)
      }
  }
};

export const deleteIngredient = (id) => {
    return async (dispatch, getState) => {
        const token = getState().user.user;
        try {
            await axiosAPI.delete(`/ingredients/${id}`, {headers: {'Authorization': token.token}});
            dispatch(fetchIngredients());
        } catch (error) {
            dispatch(deleteIngredientError(error));
        }
    }
};

export const publishIngredient = (id) => {
    return async (dispatch,  getState) => {
        const token = getState().user.user;
        try {
            await axiosAPI.post(`/ingredients/${id}/published`, id, {headers: {'Authorization': token.token}});
            dispatch(fetchIngredients());
        } catch (error) {
            dispatch(publicIngredientError(error));
        }
    }
};