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

export const GET_RECENTS_START = 'GET_RECENTS_START';
export const GET_RECENTS_SUCCESS = 'GET_RECENTS_SUCCESS';
export const GET_RECENTS_FAILED = 'GET_RECENTS_FAILED';

export const OPEN_RECENT_START = 'OPEN_RECENT_START';
export const OPEN_RECENT_SUCCESS = 'OPEN_RECENT_SUCCESS';
export const OPEN_RECENT_FAILED = 'OPEN_RECENT_FAILED';

export const CHANGE_CHAR_START = 'CHANGE_CHAR_START';
export const CHANGE_CHAR_SUCCESS = 'CHANGE_CHAR_SUCCESS';
export const CHANGE_CHAR_FAILED = 'CHANGE_CHAR_FAILED';

export const UPDATE_CHAR_START = 'UPDATE_CHAR_START';
export const UPDATE_CHAR_SUCCESS = 'UPDATE_CHAR_SUCCESS';

export const ADD_CHARACTER_INFO_START = 'ADD_CHARACTER_INFO_START';
export const ADD_CHARACTER_INFO_SUCCESS = 'ADD_CHARACTER_INFO_SUCCESS';

export const ADD_CHARACTER_START = 'ADD_CHARACTER_START';
export const ADD_CHARACTER_SUCCESS = 'ADD_CHARACTER_SUCCESS';

export const CHANGE_SETTING_START = 'CHANGE_SETTING_START';
export const CHANGE_SETTING_SUCCESS = 'CHANGE_SETTING_SUCCESS';

export const ADD_SETTING_INFO_START = 'ADD_SETTING_INFO_START';
export const ADD_SETTING_INFO_SUCCESS = 'ADD_SETTING_INFO_SUCCESS';

export const ADD_SETTING_START = 'ADD_SETTING_START';
export const ADD_SETTING_SUCCESS = 'ADD_SETTING_SUCCESS';

export const ADD_NOTE_START = 'ADD_NOTE_START';
export const ADD_NOTE_SUCCESS = 'ADD_NOTE_SUCCESS';

export const CHANGE_NOTE_START = 'CHANGE_NOTE_START';
export const CHANGE_NOTE_SUCCESS = 'CHANGE_NOTE_SUCCESS';

export const UPDATE_NOTE_START = 'UPDATE_NOTE_START';
export const UPDATE_NOTE_SUCCESS = 'UPDATE_NOTE_SUCCESS';

export const UPDATE_CHAPTER_TITLE_START = 'UPDATE_CHAPTER_TITLE_START';
export const UPDATE_CHAPTER_TITLE_SUCCESS = 'UPDATE_CHAPTER_TITLE_SUCCESS';

export const REMOVE_ITEM_START = 'REMOVE_ITEM_START';
export const REMOVE_ITEM_SUCCESS = 'REMOVE_ITEM_SUCCESS';


function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

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
        if (project === null) return dispatch({ type: OPEN_PROJECT_FAILED, payload: "Failed to open project. Please check file/path and try again." });

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


/**
 * Gets the recents from the electron-store
 * @param  {} dispatch
 */
export const getRecents = () => dispatch => {
    dispatch({ type: GET_RECENTS_START });

    const results = window.IpcRenderer.sendSync("get-recents");

    console.log("RESULTS => ", results);

    if (results=== null) return dispatch({ type: GET_RECENTS_FAILED, payload: "Failed to load recents" });

    let recents = [];
    results.forEach(rec => {
        const project = {
            title: rec.title,
            location: rec.location
        };
        recents.push(project);
    });

    dispatch({ type: GET_RECENTS_SUCCESS, payload: recents });
};

/**
 * Opens up a recent project from the electron electron-store
 * @param  {} dispatch
 */
export function openRecentProject(recent) {
    return (dispatch, getState) => {
        dispatch({ type: OPEN_RECENT_START });

        const project = window.IpcRenderer.sendSync("open-recent", recent);
        if (project === null) return dispatch({ type: OPEN_RECENT_FAILED });

        dispatch({ type: OPEN_RECENT_SUCCESS, payload: project });
    };
}

// CHAPTERS

export function createNewChapter() {
    return (dispatch, getState) => {
        dispatch({ type: ADD_CHAPTER_START });
        const state = getState().rootReducer;

        const chapter = {
            content: "",
            id: guid(),
            title: `New Chapter`
        }

        let project = state.project;
        project.project.chapters.push(chapter);

        dispatch({ type: ADD_CHAPTER_SUCCESS, payload: {project, id: chapter.id} });
    }
}

export function changeCurrentChapter(id) {
    return (dispatch) => {
        dispatch({ type: CHANGE_CHAPTER_START });

        dispatch({ type: CHANGE_CHAPTER_SUCCESS, payload: id });
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

        dispatch({ type: UPDATE_CHAPTER_SUCCESS, payload: project });

    }
}

// CHARACTERS

export function changeCurrentChar(charI, infoI) {
    return (dispatch) => {
        dispatch({ type: CHANGE_CHAR_START });

        dispatch({ type: CHANGE_CHAR_SUCCESS, payload: {char: charI, info: infoI} });

    }
}

export function updateCharacterInfo(value, char, index) {
    return (dispatch, getState) => {
        dispatch({ type: UPDATE_CHAR_START });
        const state = getState().rootReducer;

        let project = state.project;

        // project.project.characters[char].info[index].content = value;
        project.project.characters.forEach(chara => {
            if (chara.id === char) {
                chara.info.forEach(inf => {
                    if (inf.id === index) {
                        inf.content = value;
                    }
                })
            }
        })

        dispatch({ type: UPDATE_CHAR_SUCCESS, payload: project });

    }
}

export function createNewCharacterInfo(char) {
    return (dispatch, getState) => {
        dispatch({ type: ADD_CHARACTER_INFO_START });
        const state = getState().rootReducer;

        const newInfo = {id: guid(), title: 'New Info', content: `<h1 class="ql-align-center">New Info</h1>`};

        let project = state.project;
        // project.project.characters[char].info.push(newInfo);
        project.project.characters.forEach(chara => {
            if (chara.id === char) {
                chara.info.push(newInfo);
            }
        })

        dispatch({ type: ADD_CHARACTER_INFO_SUCCESS, payload: {project: project, char: char, info: newInfo.id} });
    }
}

export function createNewCharacter() {
    return (dispatch, getState) => {
        dispatch({ type: ADD_CHARACTER_START });
        const state = getState().rootReducer;

        const character = {
            name: "John Doe",
            id: guid(),
            info: [
                {id: guid(), title: 'Notes', content: `<h1 class="ql-align-center">Notes</h1>`},
                {id: guid(),title: 'Personal Data', content: '<h1 class="ql-align-center">Personal Data</h1><p class="ql-align-center"><br></p><p><strong><em>(1/12) first name?</em></strong></p><p>	</p><p><strong><em>(2/12) surname?</em></strong></p><p>	</p><p><strong><em>(3/12) nickname? Where does it come from?</em></strong></p><p>	</p><p><strong><em>(4/12) gender?</em></strong></p><p>	</p><p><strong><em>(5/12) how old is he/she?</em></strong></p><p>	</p><p><strong><em>(6/12) birthplace?</em></strong></p><p>	</p><p><strong><em>(7/12) residence?</em></strong></p><p>	</p><p><strong><em>(8/12) what is his/her level of education?</em></strong></p><p>	</p><p><strong><em>(9/12) which is his/her profession?</em></strong></p><p>	</p><p><strong><em>(10/12) is he/she wealthy or poor?</em></strong></p><p>	</p><p><strong><em>(11/12) which kind of house he/she lives in? Villa? Apartment?</em></strong></p><p>	</p><p><strong><em>(12/12) does he/she own his/her home or does he/she rent?</em></strong></p><p class="ql-align-center"><br></p>'},
                {id: guid(),title: 'Physical Features', content: '<h1 class="ql-align-center">Physical Features</h1><p class="ql-align-center"><br></p><p><strong><em>(1/24) which is his/her race?</em></strong></p><p>	</p><p><strong><em>(2/24) is he/she short or tall?</em></strong></p><p>	</p><p><strong><em>(3/24) is he/she thin or fat?</em></strong></p><p>	</p><p><strong><em>(4/24) what is his/her hair like?</em></strong></p><p>	</p><p><strong><em>(5/24) what is his/her face like?</em></strong></p><p>	</p><p><strong><em>(6/24) what are his/her eyes like? Does he/she wear glasses?</em></strong></p><p>	</p><p><strong><em>(7/24) what is his/her nose like?</em></strong></p><p>	</p><p><strong><em>(8/24) what are his/her mouth and teeth like?</em></strong></p><p>	</p><p><strong><em>(9/24) what are his/her ears like?</em></strong></p><p>	</p><p><strong><em>(10/24) any distinguishing features?</em></strong></p><p>	</p><p><strong><em>(11/24) does he have a moustache or beard?</em></strong></p><p>	</p><p><strong><em>(12/24) what is his/her neck like?</em></strong></p><p>	</p><p><strong><em>(13/24) what are his/her shoulders like?</em></strong></p><p>	</p><p><strong><em>(14/24) what are his/her arms like?</em></strong></p><p>	</p><p><strong><em>(15/24) what are his/her hands like? Is he/she left-handed or right-handed?</em></strong></p><p>	</p><p><strong><em>(16/24) what is his/her chest like?</em></strong></p><p>	</p><p><strong><em>(17/24) what are his/her waist and hips like?</em></strong></p><p>	</p><p><strong><em>(18/24) what is his/her backside like?</em></strong></p><p>	</p><p><strong><em>(19/24) what are his/her legs and ankles like?</em></strong></p><p>	</p><p><strong><em>(20/24) what are his/her feet like?</em></strong></p><p>	</p><p><strong><em>(21/24) how muscular is he/she?</em></strong></p><p>	</p><p><strong><em>(22/24) is he/she hairy?</em></strong></p><p>	</p><p><strong><em>(23/24) does he/she have any scars or other particular markings?</em></strong></p><p>	</p><p><strong><em>(24/24) does he/she have any tattoos or body-piercings?</em></strong></p><p class="ql-align-center"><br></p>'},
                {id: guid(),title: 'Behavoirs Attitudes', content: '<h1 class="ql-align-center">Behavoirs Attitudes</h1><p class="ql-align-center"><br></p><p><strong><em>(1/12) what does he/she look like?</em></strong></p><p>	</p><p><strong><em>(2/12) what is his/her way of speaking?</em></strong></p><p>	</p><p><strong><em>(3/12) how does he/she laugh?</em></strong></p><p>	</p><p><strong><em>(4/12) how does he/she cry?</em></strong></p><p>	</p><p><strong><em>(5/12) how does he/she walk?</em></strong></p><p>	</p><p><strong><em>(6/12) is he/she well mannered and refined, or ill-mannered and coarse?</em></strong></p><p>	</p><p><strong><em>(7/12) is he/she a clean person?</em></strong></p><p>	</p><p><strong><em>(8/12) what is his/her style? is he/she elegant or not?</em></strong></p><p>	</p><p><strong><em>(9/12) does she wear make-up and how is it applied?</em></strong></p><p>	</p><p><strong><em>(10/12) does he/she wear cologne or perfume?</em></strong></p><p>	</p><p><strong><em>(11/12) does he/she wear any jewellery?</em></strong></p><p>	</p><p><strong><em>(12/12) how does he/she eat and drink?</em></strong></p><p class="ql-align-center"><br></p>'},
                {id: guid(),title: 'Psyhcology', content: '<h1 class="ql-align-center">Psyhcology</h1><p class="ql-align-center"><br></p><p><strong><em>(1/62) is he/she easy-going?</em></strong></p><p>	</p><p><strong><em>(2/62) is he/she charming?</em></strong></p><p>	</p><p><strong><em>(3/62) how does he/she feel most frequently? Happy or sad?</em></strong></p><p>	</p><p><strong><em>(4/62) is he/she generous or selfish? Is he/she self-centered?</em></strong></p><p>	</p><p><strong><em>(5/62) is he/she ambitious?</em></strong></p><p>	</p><p><strong><em>(6/62) is he/she anxious? Is he/she apprehensive?</em></strong></p><p>	</p><p><strong><em>(7/62) is he/she nice or unpleasant? Is he/she funny or boring?</em></strong></p><p>	</p><p><strong><em>(8/62) is he/she enthusiastic?</em></strong></p><p>	</p><p><strong><em>(9/62) is he/she open-minded?</em></strong></p><p>	</p><p><strong><em>(10/62) is he/she kind or arrogant?</em></strong></p><p>	</p><p><strong><em>(11/62) is he/she a good listener?</em></strong></p><p>	</p><p><strong><em>(12/62) does he/she tend to be passive?</em></strong></p><p>	</p><p><strong><em>(13/62) is he/she cheap or generous?</em></strong></p><p>	</p><p><strong><em>(14/62) is he/she adventurous?</em></strong></p><p>	</p><p><strong><em>(15/62) does he/she tend to lie or is he/she sincere? Is he/she frank?</em></strong></p><p>	</p><p><strong><em>(16/62) is he/she calm or bad-tempered? Nervous? Pugnacious? Violent?</em></strong></p><p>	</p><p><strong><em>(17/62) is he/she goal-oriented with consistent goals, or is he/she fickle?</em></strong></p><p>	</p><p><strong><em>(18/62) is he/she loose or chaste?</em></strong></p><p>	</p><p><strong><em>(19/62) is he/she an intellectual or does he/she tend to be more pragmatic?</em></strong></p><p>	</p><p><strong><em>(20/62) is he/she cynical or idealistic? Is he/she down to earth or a dreamer?</em></strong></p><p>	</p><p><strong><em>(21/62) is he/she consistent with his/her ideas?</em></strong></p><p>	</p><p><strong><em>(22/62) is he/she understanding and indulgent or severe?</em></strong></p><p>	</p><p><strong><em>(23/62) is he/she courageous?</em></strong></p><p>	</p><p><strong><em>(24/62) is he/she curious or indifferent?</em></strong></p><p>	</p><p><strong><em>(25/62) is he/she discreet or tends to gossip?</em></strong></p><p>	</p><p><strong><em>(26/62) is he/she self-confident or clumsy?</em></strong></p><p>	</p><p><strong><em>(27/62) is he/she obedient or disobedient?</em></strong></p><p>	</p><p><strong><em>(28/62) is he/she honest?</em></strong></p><p>	</p><p><strong><em>(29/62) is he/she tidy?</em></strong></p><p>	</p><p><strong><em>(30/62) is he/she sweet and affectionate or harsh?</em></strong></p><p>	</p><p><strong><em>(31/62) is he/she fussy and meticulous? Is he/she diligent?</em></strong></p><p>	</p><p><strong><em>(32/62) is he/she biased or objective?</em></strong></p><p>	</p><p><strong><em>(33/62) is he/she rational or passionate?</em></strong></p><p>	</p><p><strong><em>(34/62) is he/she clever?</em></strong></p><p>	</p><p><strong><em>(35/62) is he/she jealous? Is he/she possessive?</em></strong></p><p>	</p><p><strong><em>(36/62) is he/she mature or immature?</em></strong></p><p>	</p><p><strong><em>(37/62) is he/she patient?</em></strong></p><p>	</p><p><strong><em>(38/62) is he/she impulsive or thoughtful? Is he/she cautious?</em></strong></p><p>	</p><p><strong><em>(39/62) can he/she be easily influenced?</em></strong></p><p>	</p><p><strong><em>(40/62) is he/she hospitable?</em></strong></p><p>	</p><p><strong><em>(41/62) is he/she self confident? Does he/she trust his/her own capacities?</em></strong></p><p>	</p><p><strong><em>(42/62) is he/she tolerant?</em></strong></p><p>	</p><p><strong><em>(43/62) is he/she invasive?</em></strong></p><p>	</p><p><strong><em>(44/62) is he/she envious?</em></strong></p><p>	</p><p><strong><em>(45/62) is he/she ironic?</em></strong></p><p>	</p><p><strong><em>(46/62) is he/she reliable?</em></strong></p><p>	</p><p><strong><em>(47/62) is he/she petty?</em></strong></p><p>	</p><p><strong><em>(48/62) is he/she humble or presumptuous?</em></strong></p><p>	</p><p><strong><em>(49/62) is he/she lazy or hard-working?</em></strong></p><p>	</p><p><strong><em>(50/62) is he/she proud?</em></strong></p><p>	</p><p><strong><em>(51/62) is he/she optimistic or pessimistic?</em></strong></p><p>	</p><p><strong><em>(52/62) is he/she touchy?</em></strong></p><p>	</p><p><strong><em>(53/62) is he/she deep or superficial?</em></strong></p><p>	</p><p><strong><em>(54/62) is he/she a rebel?</em></strong></p><p>	</p><p><strong><em>(55/62) is he/she a romantic?</em></strong></p><p>	</p><p><strong><em>(56/62) can he/she forgive or does he/she harbour resentment?</em></strong></p><p>	</p><p><strong><em>(57/62) does he/she have a sense of justice?</em></strong></p><p>	</p><p><strong><em>(58/62) is he/she friendly and extroverted or more introverted?</em></strong></p><p>	</p><p><strong><em>(59/62) has he/she a free spirit?</em></strong></p><p>	</p><p><strong><em>(60/62) is he/she hare-brained?</em></strong></p><p>	</p><p><strong><em>(61/62) is he/she vain?</em></strong></p><p>	</p><p><strong><em>(62/62) is he/she unstable and capricious? Is he/she moody?</em></strong></p><p class="ql-align-center"><br></p>'},
                {id: guid(),title: 'Ideas Passions', content: '<h1 class="ql-align-center">Ideas Passions</h1><p class="ql-align-center"><br></p><p><strong><em>(1/18) what are his/her religious beliefs/ideas?</em></strong></p><p>	</p><p><strong><em>(2/18) is he/she superstitious?</em></strong></p><p>	</p><p><strong><em>(3/18) what are his/her political views/ideas?</em></strong></p><p>	</p><p><strong><em>(4/18) does he/she like sport? Does he/she play any sport? Is he/she a fan?</em></strong></p><p>	</p><p><strong><em>(5/18) does he/she appreciate art? How does he/she express it?</em></strong></p><p>	</p><p><strong><em>(6/18) does he/she have a passion for art?</em></strong></p><p>	</p><p><strong><em>(7/18) does he/she like literature? Favourite novel?</em></strong></p><p>	</p><p><strong><em>(8/18) does he/she like music? Favourite song?</em></strong></p><p>	</p><p><strong><em>(9/18) does he/she like cinema? Favourite movie?</em></strong></p><p>	</p><p><strong><em>(10/18) does he/she like photography?</em></strong></p><p>	</p><p><strong><em>(11/18) does he/she love animals? Does he/she have any pets?</em></strong></p><p>	</p><p><strong><em>(12/18) does he/she love travelling? Favourite trips or adventures?</em></strong></p><p>	</p><p><strong><em>(13/18) does he/she like good cooking? Does he/she like to cook?</em></strong></p><p>	</p><p><strong><em>(14/18) does he/she like technology?</em></strong></p><p>	</p><p><strong><em>(15/18) what is his/her usual means of transport?</em></strong></p><p>	</p><p><strong><em>(16/18) which is his/her favourite hobby?</em></strong></p><p>	</p><p><strong><em>(17/18) does he/she have any obsessions?</em></strong></p><p>	</p><p><strong><em>(18/18) which are his/her vices?</em></strong></p><p class="ql-align-center"><br></p>'},
                {id: guid(),title: 'Sociology', content: '<h1 class="ql-align-center">Sociology</h1><p class="ql-align-center"><br></p><p><strong><em>(1/10) how is his/her relationship with his/her partner?</em></strong></p><p>	</p><p><strong><em>(2/10) how is his/her relationship with his/her father?</em></strong></p><p>	</p><p><strong><em>(3/10) how is his/her relationship with his/her mother?</em></strong></p><p>	</p><p><strong><em>(4/10) how is his/her relationship with his/her siblings?</em></strong></p><p>	</p><p><strong><em>(5/10) how is his/her relationship with his/her grandparents?</em></strong></p><p>	</p><p><strong><em>(6/10) how is his/her relationship with his/her cousins/uncles?</em></strong></p><p>	</p><p><strong><em>(7/10) how is his/her relationship with his/her teachers?</em></strong></p><p>	</p><p><strong><em>(8/10) how is his/her relationship with his/her schoolmates?</em></strong></p><p>	</p><p><strong><em>(9/10) how is his/her relationship with his/her friends?</em></strong></p><p>	</p><p><strong><em>(10/10) how is his/her relationship with his/her colleagues, bosses, clients?</em></strong></p><p class="ql-align-center"><br></p>'},
                {id: guid(),title: 'Life Before The Stories Beginning', content: '<h1 class="ql-align-center">Life Before The Stories Beginning</h1>'},
                {id: guid(),title: 'Conflict', content: '<h1 class="ql-align-center">Conflict</h1>'},
                {id: guid(),title: 'Evolution', content: '<h1 class="ql-align-center">Evolution</h1>'},
                {id: guid(),title: 'Images', content: '<h1 class="ql-align-center">Images</h1>'},
            ]
        }

        let project = state.project;
        project.project.characters.push(character);

        dispatch({ type: ADD_CHARACTER_SUCCESS, payload: {project, id: character.id, info: character.info[0].id }});
    }
}

// SETTINGS

export function changeCurrentSetting(settingI, infoI) {
    return (dispatch) => {
        console.log("CHANGE ", settingI, infoI);
        dispatch({ type: CHANGE_SETTING_START });

        dispatch({ type: CHANGE_SETTING_SUCCESS, payload: {setting: settingI, info: infoI} });

    }
}

export function updateSettingInfo(value, char, index) {
    return (dispatch, getState) => {
        dispatch({ type: UPDATE_CHAR_START });
        const state = getState().rootReducer;

        let project = state.project;

        console.log(value, char, index);

        // project.project.settings[char].info[index].content = value;
        project.project.settings.forEach(chara => {
            if (chara.id === char) {
                chara.info.forEach(inf => {
                    if (inf.id === index) {
                        inf.content = value;
                    }
                })
            }
        })

        dispatch({ type: UPDATE_CHAR_SUCCESS, payload: project });

    }
}

export function createNewSettingInfo(setting) {
    return (dispatch, getState) => {
        dispatch({ type: ADD_SETTING_INFO_START });
        const state = getState().rootReducer;

        const newInfo = {id: guid(), title: 'New Info', content: `<h1 class="ql-align-center">New Info</h1>`};

        let project = state.project;

        project.project.settings.forEach(chara => {
            if (chara.id === setting) {
                chara.info.push(newInfo);
            }
        })

        dispatch({ type: ADD_SETTING_INFO_SUCCESS, payload: {project: project, setting: setting.id, info: newInfo.id} });



    }
}

export function createNewSetting() {
    return (dispatch, getState) => {
        dispatch({ type: ADD_SETTING_START });
        const state = getState().rootReducer;

        const settings = {
            name: "New Setting",
            id: guid(),
            info: [
                {id: guid(),title: 'Basics', content: `<h1 class="ql-align-center">Basics</h1><p><br></p><p><strong>What is your world called? </strong></p><p><br></p><p><strong>Is it set on: </strong></p><ul><li>Earth</li><li>Alternate Earth</li><li>Not Earth</li></ul><p><br></p><p><strong> Estimate its population: </strong></p><p><br></p><p><strong>In one sentence, describe your world.</strong></p><p><br></p>`},
                {id: guid(),title: 'Geography', content: `<h1 class="ql-align-center">Geography</h1>`},
                {id: guid(),title: 'People', content: `<h1 class="ql-align-center">People</h1>`},
                {id: guid(),title: 'Civilization', content: `<h1 class="ql-align-center">Civilization</h1>`},
                {id: guid(),title: 'Technology, Magic & Weapons', content: `<h1 class="ql-align-center">Technology, Magic & Weapons</h1>`},
                {id: guid(),title: 'Economy', content: `<h1 class="ql-align-center">Economy</h1>`},
                {id: guid(),title: 'Politics', content: `<h1 class="ql-align-center">Politics</h1>`},
            ]
        }

        let project = state.project;
        project.project.settings.push(settings);

        dispatch({ type: ADD_SETTING_SUCCESS, payload: {project, id: settings.id, info: settings.info[0].id } });
    }
}

// NOTES

export function createNewNote() {
    return (dispatch, getState) => {
        dispatch({ type: ADD_NOTE_START });
        const state = getState().rootReducer;

        const id = guid();

        const note = {
            content: `<h1 class="ql-align-center">Ideas</h1>`,
            title: `New Note`,
            id: id
        }

        let project = state.project;
        project.project.notes.push(note);

        dispatch({ type: ADD_NOTE_SUCCESS, payload: {project, id: note.id} });
    }
}

export function changeCurrentNote(id) {
    return (dispatch) => {
        dispatch({ type: CHANGE_NOTE_START });

        dispatch({ type: CHANGE_NOTE_SUCCESS, payload: id });
    }
}

export function updateNote(value, id) {
    return (dispatch, getState) => {
        dispatch({ type: UPDATE_NOTE_START });
        const state = getState().rootReducer;

        let project = state.project;

        project.project.notes.forEach(note => {
            if (note.id === id) {
                note.content = value
            }
        })

        dispatch({ type: UPDATE_NOTE_SUCCESS, payload: project });

    }
}

// UPDATING

export function updateName(value, type, id, ind) {
    return (dispatch, getState) => {
        dispatch({ type: UPDATE_CHAPTER_TITLE_START });
        const state = getState().rootReducer;

        let project = state.project;

        if (type === 'Chapters') {
            project.project.chapters.forEach(chapter => {
                if (chapter.id === id) {
                    chapter.title = value
                }
            })

        } else if (type === 'Notes') {
            project.project.notes.forEach(note => {
                if (note.id === id) {
                    note.title = value
                }
            })

        } else if (type === 'Characters') {
            project.project.characters.forEach(char => {
                if (char.id === id) {
                    char.name = value;
                }
            })

        } else if (type === 'Settings') {
            project.project.settings.forEach(char => {
                if (char.id === id) {
                    char.name = value;
                }
            })

        } else if (type === 'CharactersInfo') {
            project.project.characters.forEach((char, i) => {
                if (char.id === id) {
                    char.info.forEach((inf, j) => {
                        if (inf.id === ind) {
                            inf.title = value;
                        }
                        // project.project.characters[i].info[j].title = value;
                    })
                }
            })

            console.log("PRJ => ", project.project.characters);

        } else if (type === 'SettingsInfo') {
            project.project.settings.forEach((char, i) => {
                if (char.id === id) {
                    char.info.forEach(inf => {
                        if (inf.id === ind) inf.title = value;
                    })
                }
            })
        }

        dispatch({ type: UPDATE_CHAPTER_TITLE_SUCCESS, payload: project });
    }
}

export function deleteItem (value, type, id, ind) {
    return (dispatch, getState) => {
        dispatch({ type: REMOVE_ITEM_START });
        const state = getState().rootReducer;

        let project = state.project;
        const newId = guid();

        let firstIndex = null;
        let secondIndex = null;

        if (type === 'Chapters') {
            project.project.chapters = state.project.project.chapters.filter(chapter => chapter.id !== id);

        } else if (type === 'Notes') {
            project.project.notes = state.project.project.notes.filter(note => note.id !== id);

        } else if (type === 'Characters') {
            project.project.characters = state.project.project.characters.filter(char => char.id !== id);

        } else if (type === 'Settings') {
            project.project.settings = state.project.project.settings.filter(char => char.id !== id);

        } else if (type === 'CharactersInfo') {
            state.project.project.characters.forEach((char, i) => {
                if (char.id === id) {
                    project.project.characters[i].info = char.info.filter(inf => inf.id !== ind);
                    firstIndex = i;
                    secondIndex = 0;
                }
            });

        } else if (type === 'SettingsInfo') {
            state.project.project.settings.forEach((char, i) => {
                if (char.id === id) {
                    project.project.settings[i].info = char.info.filter(inf => inf.id !== ind);
                    firstIndex = i;
                    secondIndex = 0;
                }
            });

        }

        console.log("PROJ => ", project);


        dispatch({ type: REMOVE_ITEM_SUCCESS, payload: {project, type, id: newId, info: guid(), f1: firstIndex, f2: secondIndex } });
    }
}