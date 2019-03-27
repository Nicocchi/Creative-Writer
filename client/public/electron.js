const { app, BrowserWindow, shell, ipcMain, Menu, TouchBar } = require('electron');
const { TouchBarButton, TouchBarLabel, TouchBarSpacer } = TouchBar;

const path = require('path');
const isDev = require('electron-is-dev');

const Store = require("electron-store");
const store = new Store();

const fs = require("fs");

let mainWindow;

createWindow = () => {
    mainWindow = new BrowserWindow({
        backgroundColor: '#F7F7F7',
        minWidth: 880,
        show: false,
        titleBarStyle: 'hidden',
        webPreferences: {
            nodeIntegration: false,
            preload: path.join(__dirname + '/preload.js'),
        },
        height: 860,
        width: 1280,
    });

    mainWindow.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`,
    );

    if (isDev) {
        const {
            default: installExtension,
            REACT_DEVELOPER_TOOLS,
            REDUX_DEVTOOLS,
        } = require('electron-devtools-installer');

        installExtension(REACT_DEVELOPER_TOOLS)
            .then(name => {
                console.log(`Added Extension: ${name}`);
            })
            .catch(err => {
                console.log('An error occurred: ', err);
            });

        installExtension(REDUX_DEVTOOLS)
            .then(name => {
                console.log(`Added Extension: ${name}`);
            })
            .catch(err => {
                console.log('An error occurred: ', err);
            });
    }

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();

        ipcMain.on('open-external-window', (event, arg) => {
            shell.openExternal(arg);
        });
    });
};

generateMenu = () => {
    const template = [
        {
            label: 'File',
            submenu: [{ role: 'about' }, { role: 'quit' }],
        },
        {
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                { role: 'pasteandmatchstyle' },
                { role: 'delete' },
                { role: 'selectall' },
            ],
        },
        {
            label: 'View',
            submenu: [
                { role: 'reload' },
                { role: 'forcereload' },
                { role: 'toggledevtools' },
                { type: 'separator' },
                { role: 'resetzoom' },
                { role: 'zoomin' },
                { role: 'zoomout' },
                { type: 'separator' },
                { role: 'togglefullscreen' },
            ],
        },
        {
            role: 'window',
            submenu: [{ role: 'minimize' }, { role: 'close' }],
        },
        {
            role: 'help',
            submenu: [
                {
                    click() {
                        require('electron').shell.openExternal(
                            'https://getstream.io/winds',
                        );
                    },
                    label: 'Learn More',
                },
                {
                    click() {
                        require('electron').shell.openExternal(
                            'https://github.com/GetStream/Winds/issues',
                        );
                    },
                    label: 'File Issue on GitHub',
                },
            ],
        },
    ];

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
};

app.on('ready', () => {
    createWindow();
    generateMenu();
});

app.on('window-all-closed', () => {
    app.quit();
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

ipcMain.on('load-page', (event, arg) => {
    mainWindow.loadURL(arg);
});

/**
 * Handles event listener to create and save a new project and load back to
 * the state
 * @param  {} event - Event argument
 * @param  {} path - Current path of the new project to save
 */
ipcMain.on("create-project", (event, path) => {

    const fileName = path.title;
    const filePath = path.location;

    const project = {
        id: null,
        title: fileName,
        location: filePath,
        editor: true,
        project: {
            editorState: "",
            chapters: [{
                id: 1,
                title: "Chapter 1",
                content: `<h1 class="ql-align-center">Chapter 1</h1>`
            }],
            currentChapter: 0,
            characters: [{
                name: "John Doe",
                info: [
                    {title: 'Notes', content: `<h1 class="ql-align-center">Notes</h1>`},
                    {title: 'Personal Data', content: '<h1 class="ql-align-center">Personal Data</h1><p class="ql-align-center"><br></p><p><strong><em>(1/12) first name?</em></strong></p><p>	</p><p><strong><em>(2/12) surname?</em></strong></p><p>	</p><p><strong><em>(3/12) nickname? Where does it come from?</em></strong></p><p>	</p><p><strong><em>(4/12) gender?</em></strong></p><p>	</p><p><strong><em>(5/12) how old is he/she?</em></strong></p><p>	</p><p><strong><em>(6/12) birthplace?</em></strong></p><p>	</p><p><strong><em>(7/12) residence?</em></strong></p><p>	</p><p><strong><em>(8/12) what is his/her level of education?</em></strong></p><p>	</p><p><strong><em>(9/12) which is his/her profession?</em></strong></p><p>	</p><p><strong><em>(10/12) is he/she wealthy or poor?</em></strong></p><p>	</p><p><strong><em>(11/12) which kind of house he/she lives in? Villa? Apartment?</em></strong></p><p>	</p><p><strong><em>(12/12) does he/she own his/her home or does he/she rent?</em></strong></p><p class="ql-align-center"><br></p>'},
                    {title: 'Physical Features', content: '<h1 class="ql-align-center">Physical Features</h1><p class="ql-align-center"><br></p><p><strong><em>(1/24) which is his/her race?</em></strong></p><p>	</p><p><strong><em>(2/24) is he/she short or tall?</em></strong></p><p>	</p><p><strong><em>(3/24) is he/she thin or fat?</em></strong></p><p>	</p><p><strong><em>(4/24) what is his/her hair like?</em></strong></p><p>	</p><p><strong><em>(5/24) what is his/her face like?</em></strong></p><p>	</p><p><strong><em>(6/24) what are his/her eyes like? Does he/she wear glasses?</em></strong></p><p>	</p><p><strong><em>(7/24) what is his/her nose like?</em></strong></p><p>	</p><p><strong><em>(8/24) what are his/her mouth and teeth like?</em></strong></p><p>	</p><p><strong><em>(9/24) what are his/her ears like?</em></strong></p><p>	</p><p><strong><em>(10/24) any distinguishing features?</em></strong></p><p>	</p><p><strong><em>(11/24) does he have a moustache or beard?</em></strong></p><p>	</p><p><strong><em>(12/24) what is his/her neck like?</em></strong></p><p>	</p><p><strong><em>(13/24) what are his/her shoulders like?</em></strong></p><p>	</p><p><strong><em>(14/24) what are his/her arms like?</em></strong></p><p>	</p><p><strong><em>(15/24) what are his/her hands like? Is he/she left-handed or right-handed?</em></strong></p><p>	</p><p><strong><em>(16/24) what is his/her chest like?</em></strong></p><p>	</p><p><strong><em>(17/24) what are his/her waist and hips like?</em></strong></p><p>	</p><p><strong><em>(18/24) what is his/her backside like?</em></strong></p><p>	</p><p><strong><em>(19/24) what are his/her legs and ankles like?</em></strong></p><p>	</p><p><strong><em>(20/24) what are his/her feet like?</em></strong></p><p>	</p><p><strong><em>(21/24) how muscular is he/she?</em></strong></p><p>	</p><p><strong><em>(22/24) is he/she hairy?</em></strong></p><p>	</p><p><strong><em>(23/24) does he/she have any scars or other particular markings?</em></strong></p><p>	</p><p><strong><em>(24/24) does he/she have any tattoos or body-piercings?</em></strong></p><p class="ql-align-center"><br></p>'},
                    {title: 'Behavoirs Attitudes', content: '<h1 class="ql-align-center">Behavoirs Attitudes</h1><p class="ql-align-center"><br></p><p><strong><em>(1/12) what does he/she look like?</em></strong></p><p>	</p><p><strong><em>(2/12) what is his/her way of speaking?</em></strong></p><p>	</p><p><strong><em>(3/12) how does he/she laugh?</em></strong></p><p>	</p><p><strong><em>(4/12) how does he/she cry?</em></strong></p><p>	</p><p><strong><em>(5/12) how does he/she walk?</em></strong></p><p>	</p><p><strong><em>(6/12) is he/she well mannered and refined, or ill-mannered and coarse?</em></strong></p><p>	</p><p><strong><em>(7/12) is he/she a clean person?</em></strong></p><p>	</p><p><strong><em>(8/12) what is his/her style? is he/she elegant or not?</em></strong></p><p>	</p><p><strong><em>(9/12) does she wear make-up and how is it applied?</em></strong></p><p>	</p><p><strong><em>(10/12) does he/she wear cologne or perfume?</em></strong></p><p>	</p><p><strong><em>(11/12) does he/she wear any jewellery?</em></strong></p><p>	</p><p><strong><em>(12/12) how does he/she eat and drink?</em></strong></p><p class="ql-align-center"><br></p>'},
                    {title: 'Psyhcology', content: '<h1 class="ql-align-center">Psyhcology</h1><p class="ql-align-center"><br></p><p><strong><em>(1/62) is he/she easy-going?</em></strong></p><p>	</p><p><strong><em>(2/62) is he/she charming?</em></strong></p><p>	</p><p><strong><em>(3/62) how does he/she feel most frequently? Happy or sad?</em></strong></p><p>	</p><p><strong><em>(4/62) is he/she generous or selfish? Is he/she self-centered?</em></strong></p><p>	</p><p><strong><em>(5/62) is he/she ambitious?</em></strong></p><p>	</p><p><strong><em>(6/62) is he/she anxious? Is he/she apprehensive?</em></strong></p><p>	</p><p><strong><em>(7/62) is he/she nice or unpleasant? Is he/she funny or boring?</em></strong></p><p>	</p><p><strong><em>(8/62) is he/she enthusiastic?</em></strong></p><p>	</p><p><strong><em>(9/62) is he/she open-minded?</em></strong></p><p>	</p><p><strong><em>(10/62) is he/she kind or arrogant?</em></strong></p><p>	</p><p><strong><em>(11/62) is he/she a good listener?</em></strong></p><p>	</p><p><strong><em>(12/62) does he/she tend to be passive?</em></strong></p><p>	</p><p><strong><em>(13/62) is he/she cheap or generous?</em></strong></p><p>	</p><p><strong><em>(14/62) is he/she adventurous?</em></strong></p><p>	</p><p><strong><em>(15/62) does he/she tend to lie or is he/she sincere? Is he/she frank?</em></strong></p><p>	</p><p><strong><em>(16/62) is he/she calm or bad-tempered? Nervous? Pugnacious? Violent?</em></strong></p><p>	</p><p><strong><em>(17/62) is he/she goal-oriented with consistent goals, or is he/she fickle?</em></strong></p><p>	</p><p><strong><em>(18/62) is he/she loose or chaste?</em></strong></p><p>	</p><p><strong><em>(19/62) is he/she an intellectual or does he/she tend to be more pragmatic?</em></strong></p><p>	</p><p><strong><em>(20/62) is he/she cynical or idealistic? Is he/she down to earth or a dreamer?</em></strong></p><p>	</p><p><strong><em>(21/62) is he/she consistent with his/her ideas?</em></strong></p><p>	</p><p><strong><em>(22/62) is he/she understanding and indulgent or severe?</em></strong></p><p>	</p><p><strong><em>(23/62) is he/she courageous?</em></strong></p><p>	</p><p><strong><em>(24/62) is he/she curious or indifferent?</em></strong></p><p>	</p><p><strong><em>(25/62) is he/she discreet or tends to gossip?</em></strong></p><p>	</p><p><strong><em>(26/62) is he/she self-confident or clumsy?</em></strong></p><p>	</p><p><strong><em>(27/62) is he/she obedient or disobedient?</em></strong></p><p>	</p><p><strong><em>(28/62) is he/she honest?</em></strong></p><p>	</p><p><strong><em>(29/62) is he/she tidy?</em></strong></p><p>	</p><p><strong><em>(30/62) is he/she sweet and affectionate or harsh?</em></strong></p><p>	</p><p><strong><em>(31/62) is he/she fussy and meticulous? Is he/she diligent?</em></strong></p><p>	</p><p><strong><em>(32/62) is he/she biased or objective?</em></strong></p><p>	</p><p><strong><em>(33/62) is he/she rational or passionate?</em></strong></p><p>	</p><p><strong><em>(34/62) is he/she clever?</em></strong></p><p>	</p><p><strong><em>(35/62) is he/she jealous? Is he/she possessive?</em></strong></p><p>	</p><p><strong><em>(36/62) is he/she mature or immature?</em></strong></p><p>	</p><p><strong><em>(37/62) is he/she patient?</em></strong></p><p>	</p><p><strong><em>(38/62) is he/she impulsive or thoughtful? Is he/she cautious?</em></strong></p><p>	</p><p><strong><em>(39/62) can he/she be easily influenced?</em></strong></p><p>	</p><p><strong><em>(40/62) is he/she hospitable?</em></strong></p><p>	</p><p><strong><em>(41/62) is he/she self confident? Does he/she trust his/her own capacities?</em></strong></p><p>	</p><p><strong><em>(42/62) is he/she tolerant?</em></strong></p><p>	</p><p><strong><em>(43/62) is he/she invasive?</em></strong></p><p>	</p><p><strong><em>(44/62) is he/she envious?</em></strong></p><p>	</p><p><strong><em>(45/62) is he/she ironic?</em></strong></p><p>	</p><p><strong><em>(46/62) is he/she reliable?</em></strong></p><p>	</p><p><strong><em>(47/62) is he/she petty?</em></strong></p><p>	</p><p><strong><em>(48/62) is he/she humble or presumptuous?</em></strong></p><p>	</p><p><strong><em>(49/62) is he/she lazy or hard-working?</em></strong></p><p>	</p><p><strong><em>(50/62) is he/she proud?</em></strong></p><p>	</p><p><strong><em>(51/62) is he/she optimistic or pessimistic?</em></strong></p><p>	</p><p><strong><em>(52/62) is he/she touchy?</em></strong></p><p>	</p><p><strong><em>(53/62) is he/she deep or superficial?</em></strong></p><p>	</p><p><strong><em>(54/62) is he/she a rebel?</em></strong></p><p>	</p><p><strong><em>(55/62) is he/she a romantic?</em></strong></p><p>	</p><p><strong><em>(56/62) can he/she forgive or does he/she harbour resentment?</em></strong></p><p>	</p><p><strong><em>(57/62) does he/she have a sense of justice?</em></strong></p><p>	</p><p><strong><em>(58/62) is he/she friendly and extroverted or more introverted?</em></strong></p><p>	</p><p><strong><em>(59/62) has he/she a free spirit?</em></strong></p><p>	</p><p><strong><em>(60/62) is he/she hare-brained?</em></strong></p><p>	</p><p><strong><em>(61/62) is he/she vain?</em></strong></p><p>	</p><p><strong><em>(62/62) is he/she unstable and capricious? Is he/she moody?</em></strong></p><p class="ql-align-center"><br></p>'},
                    {title: 'Ideas Passions', content: '<h1 class="ql-align-center">Ideas Passions</h1><p class="ql-align-center"><br></p><p><strong><em>(1/18) what are his/her religious beliefs/ideas?</em></strong></p><p>	</p><p><strong><em>(2/18) is he/she superstitious?</em></strong></p><p>	</p><p><strong><em>(3/18) what are his/her political views/ideas?</em></strong></p><p>	</p><p><strong><em>(4/18) does he/she like sport? Does he/she play any sport? Is he/she a fan?</em></strong></p><p>	</p><p><strong><em>(5/18) does he/she appreciate art? How does he/she express it?</em></strong></p><p>	</p><p><strong><em>(6/18) does he/she have a passion for art?</em></strong></p><p>	</p><p><strong><em>(7/18) does he/she like literature? Favourite novel?</em></strong></p><p>	</p><p><strong><em>(8/18) does he/she like music? Favourite song?</em></strong></p><p>	</p><p><strong><em>(9/18) does he/she like cinema? Favourite movie?</em></strong></p><p>	</p><p><strong><em>(10/18) does he/she like photography?</em></strong></p><p>	</p><p><strong><em>(11/18) does he/she love animals? Does he/she have any pets?</em></strong></p><p>	</p><p><strong><em>(12/18) does he/she love travelling? Favourite trips or adventures?</em></strong></p><p>	</p><p><strong><em>(13/18) does he/she like good cooking? Does he/she like to cook?</em></strong></p><p>	</p><p><strong><em>(14/18) does he/she like technology?</em></strong></p><p>	</p><p><strong><em>(15/18) what is his/her usual means of transport?</em></strong></p><p>	</p><p><strong><em>(16/18) which is his/her favourite hobby?</em></strong></p><p>	</p><p><strong><em>(17/18) does he/she have any obsessions?</em></strong></p><p>	</p><p><strong><em>(18/18) which are his/her vices?</em></strong></p><p class="ql-align-center"><br></p>'},
                    {title: 'Sociology', content: '<h1 class="ql-align-center">Sociology</h1><p class="ql-align-center"><br></p><p><strong><em>(1/10) how is his/her relationship with his/her partner?</em></strong></p><p>	</p><p><strong><em>(2/10) how is his/her relationship with his/her father?</em></strong></p><p>	</p><p><strong><em>(3/10) how is his/her relationship with his/her mother?</em></strong></p><p>	</p><p><strong><em>(4/10) how is his/her relationship with his/her siblings?</em></strong></p><p>	</p><p><strong><em>(5/10) how is his/her relationship with his/her grandparents?</em></strong></p><p>	</p><p><strong><em>(6/10) how is his/her relationship with his/her cousins/uncles?</em></strong></p><p>	</p><p><strong><em>(7/10) how is his/her relationship with his/her teachers?</em></strong></p><p>	</p><p><strong><em>(8/10) how is his/her relationship with his/her schoolmates?</em></strong></p><p>	</p><p><strong><em>(9/10) how is his/her relationship with his/her friends?</em></strong></p><p>	</p><p><strong><em>(10/10) how is his/her relationship with his/her colleagues, bosses, clients?</em></strong></p><p class="ql-align-center"><br></p>'},
                    {title: 'Life Before The Stories Beginning', content: '<h1 class="ql-align-center">Life Before The Stories Beginning</h1>'},
                    {title: 'Conflict', content: '<h1 class="ql-align-center">Conflict</h1>'},
                    {title: 'Evolution', content: '<h1 class="ql-align-center">Evolution</h1>'},
                    {title: 'Images', content: '<h1 class="ql-align-center">Images</h1>'},
                ]
            }],
            settings: [{
                name: "Planetarium",
                content: `<h1 class="ql-align-center">Planetarium</h1>`
            }],
            notes: [{
                name: "Ideas",
                content: `<h1 class="ql-align-center">Ideas</h1>`
            }],
        }

    };

    const proj = JSON.stringify(project);

    // Write the file to disc
    fs.writeFile(`${filePath}/${fileName}.cwr`, proj, err => {
        if (err) {
            console.log(err.message);
            event.returnValue = null;
            return;
        }
    });

    // Recents
    handleSaveRecents(project);

    event.returnValue = project;
});

ipcMain.on("openProject", (event, path) => {
    const { dialog } = require("electron");

    dialog.showOpenDialog(
        mainWindow,
        {
            properties: ["openFile"]
        },
        paths => respondWithPath(paths)
    );

    function respondWithPath(paths) {
        const fs = require("fs");
        if (paths === undefined) {
            console.log("No file selected");
            return (event.returnValue = null);
        }

        fs.readFile(paths[0], "utf-8", function(err, data) {
            if (err) return (event.returnValue = null);
            const project = JSON.parse(data);

            console.log(project);

            // Recents
            handleSaveRecents(project);

            event.returnValue = project;
        });
    }
});

ipcMain.on("openFolder", (event, path) => {
    const { dialog } = require("electron");

    dialog.showOpenDialog(
        mainWindow,
        {
            properties: ["openDirectory"]
        },
        paths => respondWithPath(paths)
    );

    function respondWithPath(paths) {
        return (event.returnValue = paths);
    }
});

ipcMain.on("save-project", (event, project) => {
    const fileName = project.title;
    const filePath = project.location;

    const proj = {
        id: null,
        title: fileName,
        location: filePath,
        editor: true,
        project: project.project
    };

    const saved = JSON.stringify(proj);

    // Write the file to disc
    fs.writeFile(`${filePath}/${fileName}.cwr`, saved, err => {
        if (err) {
            console.log(err.message);
            event.returnValue = false;
            return;
        }
    });

    event.returnValue = true;
})

/**
 * Handles saving the recents to the recents store to be retrieved later
 * @param  {} project - Current project to add to recents
 */
function handleSaveRecents(project) {
    let recObj = store.get("recents");
    let recArr = recObj.recents;

    // Add the project to the recents
    if (recArr != null) {

        // Check if we already have this recent in our recent's store
        const isSame = recArr.forEach(rec => {
            if (rec.title === project.title && rec.location === project.location) return true;
        });

        // If we already have 5 recents in our list, remove the first one
        if (recArr.length >= 5) recArr.shift();

        if(!isSame) {
            recArr.push(project);
            recArr.reverse();
            store.set("recents", recArr);
        }
    } else {
        recArr = [];
        recArr.push(project);
        store.set("recents", recArr);
    }
}

ipcMain.on("get-recents", (event, arg) => {
    let recents = store.get("recents");
    if (recents === undefined || recents === null || recents === "") {
        store.set("recents", []);
    }

    let recentsObj = store.get("recents");

    event.returnValue = recentsObj;
});

ipcMain.on("open-recent", (event, arg) => {
    const fs = require("fs");
    const fileName = arg.title;
    const filePath = arg.location;

    fs.readFile(`${filePath}/${fileName}.cwr`, "utf-8", function(err, data) {
        if (err) {
            // let recentsObj = store.get("recents");
            // let recArr = recentsObj.recents;
            // const newArr = recArr.filter(
            //   rec => rec.title !== fileName && rec.location !== filePath
            // );
            // recentsObj.recents = newArr;
            // store.set("recents", recentsObj);
            return (event.returnValue = null);
        }
        const proj = JSON.parse(data);

        return (event.returnValue = proj);
    });
});