/*
 * Action types
 */
export const TEST = "TEST";

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