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
                id: 1,
                name: "John Doe",
                nickname: "Mr. Doe",
                gender: "Male",
                biography: "A mysterious man",
                images: [],

            }],
            settings: [{
                id: 1,
                name: "Backyard",
                location: "349th Broker St.",
                images: [],
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