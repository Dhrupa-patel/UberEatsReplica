import { UPDATE_STATUS, PLACE_ORDER} from "../actions/types";

export default function(state = initialState, action){
    switch(action.type){
        case UPDATE_STATUS:
            return {};
        
        case PLACE_ORDER:
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