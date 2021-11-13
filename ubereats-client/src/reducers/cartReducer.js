import { Add_CART, DELETE_CART } from "../actions/types";

export default function(state = initialState, action){
    switch(action.type){
        case ADD_CART:
            return {};

        case DELETE_CART:
            return {};
        
        // case PROFILE:
        //     return {
        //         ...state,
        //         profile: action.payload
        //     }
        
        default:
            return state;
    }
};