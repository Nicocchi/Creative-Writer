import {
    TEST,
} from "../actions/";

const initialState = {
    project: null,
};

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case TEST:
            return state;

        default:
            return state;
    }
};
