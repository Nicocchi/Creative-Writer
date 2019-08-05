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

    ADD_NOTE_START,
    ADD_NOTE_SUCCESS,

    CHANGE_NOTE_START,
    CHANGE_NOTE_SUCCESS,

    UPDATE_NOTE_START,
    UPDATE_NOTE_SUCCESS,

    UPDATE_CHAPTER_TITLE_START,
    UPDATE_CHAPTER_TITLE_SUCCESS,

    REMOVE_ITEM_START,
    REMOVE_ITEM_SUCCESS,

    REMOVE_RECENT_START,
    REMOVE_RECENT_SUCCESS,
    REMOVE_RECENT_FAILED,

    CHANGE_URL,

    SAVE_PROJECT_AS_START,
    SAVE_PROJECT_AS_SUCCESS,
    SAVE_PROJECT_AS_FAILED,
} from "../actions/";

const initialState = {
    project: null,
    currentChapter: 1,
    currentChar: null,
    currentInfo: null,
    currentNote: null,
    error: false,
    errorMessage: "",
    recents: null,
    history: '/',
    saved: false
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
                project: action.payload,
                history: "/editor"
            }

        case OPEN_PROJECT_FAILED:
            return {
                ...state,
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
                currentNote: null,
                error: false,
                errorMessage: "",
                recents: null,
                history: "/editor"
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
                project: action.payload.project,
                currentChapter: action.payload.id,
                currentChar: null,
                currentInfo: null,
                currentSetting: null,
                currentSetInfo: null,
                currentNote: null,
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
                currentNote: null,
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
                currentChapter: 1,
                history: "/editor"
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
                currentNote: null,
            }

        case ADD_CHARACTER_START:
            return state;

        case ADD_CHARACTER_SUCCESS:
            return {
                ...state,
                project: action.payload.project,
                currentChapter: null,
                currentChar: action.payload.id,
                currentInfo: action.payload.info,
                currentSetting: null,
                currentSetInfo: null,
                currentNote: null,
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
                currentNote: null,
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
                project: action.payload.project,
                currentChapter: null,
                currentChar: null,
                currentInfo: null,
                currentSetting: action.payload.id,
                currentSetInfo: action.payload.info,
                currentNote: null,
            }

        case ADD_NOTE_START:
            return state;

        case ADD_NOTE_SUCCESS:
            return {
                ...state,
                project: action.payload.project,
                currentChapter: null,
                currentChar: null,
                currentInfo: null,
                currentSetting: null,
                currentSetInfo: null,
                currentNote: action.payload.id,
            }

        case CHANGE_NOTE_START:
            return state;

        case CHANGE_NOTE_SUCCESS:
            return {
                ...state,
                currentChapter: null,
                currentChar: null,
                currentInfo: null,
                currentSetting: null,
                currentSetInfo: null,
                currentNote: action.payload,
            }

        case UPDATE_NOTE_START:
            return state;

        case UPDATE_NOTE_SUCCESS:
            return {
                ...state,
                project: action.payload
            }

        case UPDATE_CHAPTER_TITLE_START:
            return state;

        case UPDATE_CHAPTER_TITLE_SUCCESS:
            return {
                ...state,
                project: action.payload
            }

        case REMOVE_ITEM_START:
            return state;

        case REMOVE_ITEM_SUCCESS:
            // TODO: REFACTOR THIS TO BE DRY
            if (action.payload.type === "Chapters") {
                let current = state.currentChapter;
                if (action.payload.project.project.chapters.length === 0) {
                    current = action.payload.id;
                    action.payload.project.project.chapters.push({title: "New Chapter", content: "New Chapter", id: action.payload.id})
                } else if (current !== action.payload.project.project.chapters[0].id) {
                    current = action.payload.project.project.chapters[0].id;
                }

                return {
                    ...state,
                    project: action.payload.project,
                    currentChapter: current,
                    currentChar: null,
                    currentInfo: null,
                    currentSetting: null,
                    currentSetInfo: null,
                    currentNote: null,
                }
            } else if (action.payload.type === "Notes") {
                let current = state.currentNote
                let currentChap = null;

                if (state.currentChapter) {
                    currentChap = state.currentChapter;
                    current = null;
                }

                if (action.payload.project.project.notes.length === 0) {
                    current = action.payload.id;
                    action.payload.project.project.notes.push({title: "New Note", content: "Ideas", id: action.payload.id})
                } else if (current !== action.payload.project.project.notes[0].id) {
                    current = action.payload.project.project.notes[0].id;
                }

                return {
                    ...state,
                    project: action.payload.project,
                    currentChapter: currentChap,
                    currentChar: null,
                    currentInfo: null,
                    currentSetting: null,
                    currentSetInfo: null,
                    currentNote: current,
                }
            } else if (action.payload.type === 'Characters') {
                let current = state.currentChar;
                let current2 = state.currentInfo;
                let currentChap = null;

                if (state.currentChapter) {
                    currentChap = state.currentChapter;
                    current = null;
                    current2 = null;
                }

                if (action.payload.project.project.characters.length === 0) {
                    current = action.payload.id;
                    current2 = action.payload.info;
                    action.payload.project.project.characters.push({name: "John Doe", id: current, info: [{id: current2, title: 'Notes', content: `<h1 class="ql-align-center">New Character</h1>`},]})
                } else if (current !== action.payload.project.project.characters[0].id) {
                    current = action.payload.project.project.characters[0].id;
                    current2 = action.payload.project.project.characters[0].info.id;
                }

                return {
                    ...state,
                    project: action.payload.project,
                    currentChapter: currentChap,
                    currentChar: current,
                    currentInfo: current2,
                    currentSetting: null,
                    currentSetInfo: null,
                    currentNote: null,
                }
            } else if (action.payload.type === 'Settings') {
                let current = state.currentSetting;
                let current2 = state.currentSetInfo;
                let currentChap = null;

                if (state.currentChapter) {
                    currentChap = state.currentChapter;
                    current = null;
                    current2 = null;
                }

                if (action.payload.project.project.settings.length === 0) {
                    current = action.payload.id;
                    current2 = action.payload.info;
                    action.payload.project.project.settings.push({name: "Farm", id: current, info: [{id: current2, title: 'Basics', content: `<h1 class="ql-align-center">New Settings</h1>`},]})
                } else if (current !== action.payload.project.project.settings[0].id) {
                    current = action.payload.project.project.settings[0].id;
                    current2 = action.payload.project.project.settings[0].info.id;
                }

                return {
                    ...state,
                    project: action.payload.project,
                    currentChapter: currentChap,
                    currentChar: null,
                    currentInfo: null,
                    currentSetting: current,
                    currentSetInfo: current2,
                    currentNote: null,
                }
            } else if (action.payload.type === 'CharactersInfo') {
                let current = state.currentChar;
                let current2 = state.currentInfo;
                let currentChap = null;

                if (state.currentChapter) {
                    currentChap = state.currentChapter;
                    current = null;
                    current2 = null;
                }

                if (action.payload.project.project.characters[action.payload.f1].info.length === 0) {
                    current = action.payload.id;
                    current2 = action.payload.info;
                    action.payload.project.project.characters[action.payload.f1].info.push({id: current2, title: 'Basics', content: `<h1 class="ql-align-center">New Info</h1>`})
                } else if (current2 !== action.payload.project.project.characters[action.payload.f1].id) {
                    current = action.payload.project.project.characters[0].id;
                    current2 = action.payload.project.project.characters[0].info.id;
                }

                return {
                    ...state,
                    project: action.payload.project,
                    currentChapter: currentChap,
                    currentChar: current,
                    currentInfo: current2,
                    currentSetting: null,
                    currentSetInfo: null,
                    currentNote: null,
                }
            } else if (action.payload.type === 'SettingsInfo') {
                let current = state.currentSetting;
                let current2 = state.currentSetInfo;
                let currentChap = null;

                if (state.currentChapter) {
                    currentChap = state.currentChapter;
                    current = null;
                    current2 = null;
                }

                if (action.payload.project.project.settings[action.payload.f1].info.length === 0) {
                    current = action.payload.id;
                    current2 = action.payload.info;
                    action.payload.project.project.settings[action.payload.f1].info.push({id: current2, title: 'Basics', content: `<h1 class="ql-align-center">New Info</h1>`})
                } else if (current2 !== action.payload.project.project.settings[action.payload.f1].id) {
                    current = action.payload.project.project.settings[0].id;
                    current2 = action.payload.project.project.settings[0].info.id;
                }

                return {
                    ...state,
                    project: action.payload.project,
                    currentChapter: currentChap,
                    currentChar: null,
                    currentInfo: null,
                    currentSetting: current,
                    currentSetInfo: current2,
                    currentNote: null,
                }
            }

            return {
                ...state,
                project: action.payload.project
            }

        case REMOVE_RECENT_START:
            return state;

        case REMOVE_RECENT_SUCCESS:
            console.log("REMOVED RECENT");
            return {
                ...state,
                recents: action.payload,
                history: "/"
            }

        case REMOVE_RECENT_FAILED:
            return {
                ...state,
                error: true,
                errorMessage: action.payload
            }

        case CHANGE_URL:
            return {
                ...state,
                history: action.payload
            }

        case SAVE_PROJECT_AS_START:
            return {
                ...state,
                saved: false
        }

        case SAVE_PROJECT_AS_SUCCESS:
            return {
                ...state,
                saved: true
        }

        case SAVE_PROJECT_AS_FAILED:
            return {
                ...state,
                saved: false
            }
        default:
            return state;
    }
};
