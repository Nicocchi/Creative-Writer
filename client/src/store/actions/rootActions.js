/*
 * Action types
 */
export const TEST = "TEST";

export const CREATE_PROJECT_START = 'CREATE_PROJECT_START';
export const CREATE_PROJECT_SUCCESS = 'CREATE_PROJECT_SUCCESS';
export const CREATE_PROJECT_FAILURE = 'CREATE_PROJECT_FAILURE';

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
 * Create and set a new project
 * @param path - location to save the project to
 * @returns {Function}
 */
export function createNewProject(path) {
    return (dispatch, getState) => {
        dispatch({ type: CREATE_PROJECT_START });

        const state = getState().rootReducer;

        const project = window.IpcRenderer.sendSync("create-project", path);

        console.log("PROJECT => ", project);

        // let newIdArray = [...state.idArray];
        // newIdArray.push(project.id);
        // const id = generateUUID(state.idArray);
        if (project === null) return dispatch({ type: CREATE_PROJECT_FAILURE, payload: "Project failed to create. Please try again." });
        //
        //
        //
        // const proj = {
        //     id: id,
        //     title: project.title,
        //     location: project.location,
        //     editor: project.editor,
        //     project: {
        //         editorState: "<h1>Example</h1>",
        //         chapters: project.project.chapters,
        //         currentChapter: 0,
        //         characters: project.project.characters,
        //         settings: project.project.settings,
        //     }
        // }
        //
        dispatch({ type: CREATE_PROJECT_SUCCESS, payload: project });
    };
}