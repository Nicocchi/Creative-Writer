import {
    TEST,
    OPEN_PROJECT_START,
    OPEN_PROJECT_SUCCESS,
    OPEN_PROJECT_FAILED,

    CREATE_PROJECT_SUCCESS,
    CREATE_PROJECT_FAILED,

    ADD_CHAPTER_START,
    ADD_CHAPTER_SUCCESS,

    CHANGE_CHAPTER_START,
    CHANGE_CHAPTER_SUCCESS,
    CHANGE_CHAPTER_FAILED,

    GET_RECENTS_START,
    GET_RECENTS_SUCCESS,
    GET_RECENTS_FAILED,

    OPEN_RECENT_START,
    OPEN_RECENT_SUCCESS,
    OPEN_RECENT_FAILED,
} from "../actions/";

const initialState = {
    project: null,
    currentChapter: 1,
    error: false,
    errorMessage: "",
    recents: null
};

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case TEST:
            return state;

        case OPEN_PROJECT_START:
            return state;

        case OPEN_PROJECT_SUCCESS:
            return {
                ...state,
                project: action.payload
            }

        case OPEN_PROJECT_FAILED:
            return {
                error: true,
                errorMessage: action.payload,
                project: null,
            }

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

        case GET_RECENTS_START:
            return state;

        case GET_RECENTS_SUCCESS:
            return {
                ...state,
                recents: action.payload
            }

        case GET_RECENTS_FAILED:
            return {
                ...state,
                error: true,
                errorMessage: action.payload
            }

        case OPEN_RECENT_START:
            return state;

        case OPEN_RECENT_SUCCESS:
            return {
                ...state,
                project: action.payload,
                currentChapter: 1
            }

        case OPEN_RECENT_FAILED: return {
            ...state,
            error: true,
            errorMessage: action.payload
        }

        default:
            return state;
    }
};
