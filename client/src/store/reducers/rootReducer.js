import {
    TEST,
    CREATE_PROJECT_SUCCESS,
    CREATE_PROJECT_FAILED,

    ADD_CHAPTER_START,
    ADD_CHAPTER_SUCCESS,

    CHANGE_CHAPTER_START,
    CHANGE_CHAPTER_SUCCESS,
    CHANGE_CHAPTER_FAILED,
} from "../actions/";

const initialState = {
    project: null,
    currentChapter: 1,
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

        case CREATE_PROJECT_FAILED:
            return {
                ...state,
                error: true,
                errorMessage: action.payload
            }

        case ADD_CHAPTER_START:
            return state;

        case ADD_CHAPTER_SUCCESS:
            return {
                ...state,
                project: action.payload,
                currentChapter: state.currentChapter + 1
            }

        case CHANGE_CHAPTER_START:
            return state;

        case CHANGE_CHAPTER_SUCCESS:
            return {
                ...state,
                currentChapter: action.payload
            }

        case CHANGE_CHAPTER_FAILED:
            return {
                ...state,
                error: true,
                errorMessage: action.payload
            }

        default:
            return state;
    }
};
