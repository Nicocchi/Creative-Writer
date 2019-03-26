/*
 * Action types
 */
export const TEST = "TEST";

export const OPEN_PROJECT_START = 'OPEN_PROJECT_START';
export const OPEN_PROJECT_SUCCESS = 'OPEN_PROJECT_SUCCESS';
export const OPEN_PROJECT_FAILED = 'OPEN_PROJECT_FAILED';

export const CREATE_PROJECT_START = 'CREATE_PROJECT_START';
export const CREATE_PROJECT_SUCCESS = 'CREATE_PROJECT_SUCCESS';
export const CREATE_PROJECT_FAILED = 'CREATE_PROJECT_FAILED';

export const ADD_CHAPTER_START = 'ADD_CHAPTER_START';
export const ADD_CHAPTER_SUCCESS = 'ADD_CHAPTER_SUCCESS';

export const CHANGE_CHAPTER_START = 'CHANGE_CHAPTER_START';
export const CHANGE_CHAPTER_SUCCESS = 'CHANGE_CHAPTER_SUCCESS';
export const CHANGE_CHAPTER_FAILED = 'CHANGE_CHAPTER_FAILED';

export const UPDATE_CHAPTER_START = 'UPDATE_CHAPTER_START';
export const UPDATE_CHAPTER_SUCCESS = 'UPDATE_CHAPTER_SUCCESS';

/*
 * Action creators
 */

/**
 * Test function for boilerplate
 * @returns {Function}
 */
export const testFunction = () => dispatch => {
    dispatch({ type: TEST });
};

/**
 * Opens up a project from the electron dialog
 * @param  {} dispatch
 */
export function openProject() {
    return (dispatch, getState) => {
        dispatch({ type: OPEN_PROJECT_START });

        const project = window.IpcRenderer.sendSync("openProject");
        if (project === null) return dispatch({ type: OPEN_PROJECT_FAILED });

        const state = getState().rootReducer;

        const contentState = project.project.editorState;

        const proj = {
            id: 1,
            title: project.title,
            location: project.location,
            editor: project.editor,
            project: {
                editorState: contentState,
                chapters: project.project.chapters,
                currentChapter: project.project.currentChapter,
                characters: project.project.characters,
                settings: project.project.settings
            }
        }

        dispatch({ type: OPEN_PROJECT_SUCCESS, payload: proj });
    };
}

/**
 * Create and set a new project
 * @param path - location to save the project to
 * @returns {Function}
 */
export function createNewProject(path) {
    return (dispatch, getState) => {
        dispatch({ type: CREATE_PROJECT_START });

        const project = window.IpcRenderer.sendSync("create-project", path);

        console.log("PROJECT => ", project);

        if (project === null) return dispatch({ type: CREATE_PROJECT_FAILED, payload: "Project failed to create. Please try again." });

        dispatch({ type: CREATE_PROJECT_SUCCESS, payload: project });
    };
}

export function createNewChapter() {
    return (dispatch, getState) => {
        dispatch({ type: ADD_CHAPTER_START });
        const state = getState().rootReducer;

        const chapter = {
            content: `<h1 class="ql-align-center">Chapter ${state.project.project.chapters.length + 1}</h1>`,
            id: state.project.project.chapters.length + 1,
            title: `Chapter ${state.project.project.chapters.length + 1}`
        }

        let project = state.project;
        project.project.chapters.push(chapter);

        console.log("ADDING CHAPTER => ", project);

        dispatch({ type: ADD_CHAPTER_SUCCESS, payload: project });



    }
}

export function changeCurrentChapter(id) {
    return (dispatch) => {
        dispatch({ type: CHANGE_CHAPTER_START });

        const chapID = Number(id);
        dispatch({ type: CHANGE_CHAPTER_SUCCESS, payload: id });
        // if (typeof(chapID) === 'Number') {

        // } else {
        //     dispatch({ type: CHANGE_CHAPTER_FAILED, payload: "Failed to change chapter" });
        // }
    }
}

export function updateChapter(value, id) {
    return (dispatch, getState) => {
        dispatch({ type: UPDATE_CHAPTER_START });
        const state = getState().rootReducer;

        let project = state.project;

        project.project.chapters.forEach(chapter => {
            if (chapter.id === id) {
                chapter.content = value
            }
        })

        console.log("UPDATING CHAPTER => ", project);

        dispatch({ type: UPDATE_CHAPTER_SUCCESS, payload: project });

    }
}