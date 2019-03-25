import {
    TEST,
    CREATE_PROJECT_SUCCESS,
    CREATE_PROJECT_FAILURE,
} from "../actions/";

const initialState = {
    project: null,
    error: false,
    errorMessage: "",
};

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case TEST:
            return state;

        case CREATE_PROJECT_SUCCESS:
            return {
                ...state,
                project: action.payload
            }

        case CREATE_PROJECT_FAILURE:
            return {
                ...state,
                error: true,
                errorMessage: action.payload
            }

        default:
            return state;
    }
};
