import { Ingredients } from '../../shared/ingredients.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State{
    ingredients: Ingredients[];
    editedIngredient:Ingredients;
    editedIngredientIndex:number;

}

const initialState:State={
    ingredients:[
        new Ingredients('Apples',5),
        new Ingredients('Tomatoes',10)
      ],

    editedIngredient: null,
    editedIngredientIndex: -1

};
 
export function shoppingListReducer(state:State= initialState, action:ShoppingListActions.ShoppingListActions){
    switch(action.type){
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients:[...state.ingredients, action.payload]
            };

        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients:[...state.ingredients, ...action.payload]
            };

        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updateIngredient={
                ...ingredient,
                ...action.payload
            };
            const updateIngredients=[...state.ingredients];
            updateIngredients[state.editedIngredientIndex]=updateIngredient;

            return{
                ...state,
                ingredients: updateIngredients,
                editedIngredientIndex:-1,
                editedIngredient:null
            };

        case ShoppingListActions.DELETE_INGREDIENT:
            return{
                ...state,
                ingredients:state.ingredients.filter((ig,igIndex)=> {
                    return igIndex !== state.editedIngredientIndex;
                }),
                editedIngredientIndex:-1,
                editedIngredient:null
            };

        case ShoppingListActions.START_EDIT:
            return{
                ...state,
                editedIngredientIndex:action.payload,
                editedIngredient:{...state.ingredients[action.payload]}
            };

        case ShoppingListActions.STOP_EDIT:
            return{
                ...state,
                editedIngredient:null,
                editedIngredientIndex:-1

            };

        default:
            return state;
    }
}