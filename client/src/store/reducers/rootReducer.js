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

    CHANGE_CHAR_START,
    CHANGE_CHAR_SUCCESS,
    CHANGE_CHAR_FAILED,

    UPDATE_CHAR_START,
    UPDATE_CHAR_SUCCESS,

    ADD_CHARACTER_INFO_START,
    ADD_CHARACTER_INFO_SUCCESS,

    ADD_CHARACTER_START,
    ADD_CHARACTER_SUCCESS,

    CHANGE_SETTING_START,
    CHANGE_SETTING_SUCCESS,

    ADD_SETTING_INFO_START,
    ADD_SETTING_INFO_SUCCESS,
    ADD_SETTING_START,
    ADD_SETTING_SUCCESS,
} from "../actions/";

const initialState = {
    project: null,
    currentChapter: 1,
    currentChar: null,
    currentInfo: null,
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
                project: action.payload,
                currentChapter: 1,
                currentChar: null,
                currentInfo: null,
                error: false,
                errorMessage: "",
                recents: null
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
                currentChapter: state.currentChapter + 1,
                currentChar: null,
                currentInfo: null,
                currentSetting: null,
                currentSetInfo: null,
            }

        case CHANGE_CHAPTER_START:
            return state;

        case CHANGE_CHAPTER_SUCCESS:
            return {
                ...state,
                currentChapter: action.payload,
                currentChar: null,
                currentInfo: null,
                currentSetting: null,
                currentSetInfo: null,
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

        case CHANGE_CHAR_START:
            return state;

        case CHANGE_CHAR_SUCCESS:
            return {
                ...state,
                currentChar: action.payload.char,
                currentInfo: action.payload.info,
                currentChapter: null,
                currentSetting: null,
                currentSetInfo: null,
            }

        case CHANGE_CHAR_FAILED:
            return state;

        case ADD_CHARACTER_INFO_START:
            return state;

        case ADD_CHARACTER_INFO_SUCCESS:
            return {
                ...state,
                project: action.payload.project,
                currentChapter: null,
                currentChar: action.payload.char,
                currentInfo: action.payload.info,
                currentSetting: null,
                currentSetInfo: null,
            }

        case ADD_CHARACTER_START:
            return state;

        case ADD_CHARACTER_SUCCESS:
            return {
                ...state,
                project: action.payload,
                currentChapter: null,
                currentChar: state.project.project.characters.length - 1,
                currentInfo: 0,
                currentSetting: null,
                currentSetInfo: null,
            }

        case CHANGE_SETTING_START:
            return state;

        case CHANGE_SETTING_SUCCESS:
            return {
                ...state,
                currentChapter: null,
                currentChar: null,
                currentInfo: null,
                currentSetting: action.payload.setting,
                currentSetInfo: action.payload.info,
        }

        case ADD_SETTING_INFO_START:
            return state;

        case ADD_SETTING_INFO_SUCCESS:
            return {
                ...state,
                project: action.payload.project,
                currentChapter: null,
                currentChar: null,
                currentInfo: null,
                currentSetting: action.payload.setting,
                currentSetInfo: action.payload.info,
            }

        case ADD_SETTING_START:
            return state;

        case ADD_SETTING_SUCCESS:
            return {
                ...state,
                project: action.payload,
                currentChapter: null,
                currentChar: null,
                currentInfo: null,
                currentSetting: state.project.project.settings.length - 1,
                currentSetInfo: 0,
            }

        default:
            return state;
    }
};
