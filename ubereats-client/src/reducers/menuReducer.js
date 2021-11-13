import { ADD_ITEM, DELETE_ITEM} from "../actions/types";

export default function(state = initialState, action){
    switch(action.type){
        case ADD_ITEM:
            return {};
        
        case DELETE_ITEM:
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