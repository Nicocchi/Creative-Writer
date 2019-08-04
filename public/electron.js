const {
  app,
  BrowserWindow,
  shell,
  ipcMain,
  Menu,
  MenuItem
} = require("electron");

const path = require("path");
const isDev = require("electron-is-dev");
// const { platform } = require('os');

const Store = require("electron-store");
const store = new Store();

const fs = require("fs");

const winURL =  isDev
? 'http://localhost:3000'
: `file://${path.join(__dirname, '../build/index.html')}`

let mainWindow;
let aboutWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    backgroundColor: "#F7F7F7",
    icon: `${__dirname} + '/build/icons/icon.png'`,
    minWidth: 880,
    show: false,
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname + "/preload.js"),
      contextIsolation: false
    },
    height: 860,
    width: 1280,
    setMenuBarVisibility: false
  });
  mainWindow.setMenuBarVisibility(false);

  aboutWindow = new BrowserWindow({
    backgroundColor: "#F7F7F7",
    minWidth: 880,
    parent: mainWindow,
    show: false,
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname + "/preload.js"),
      contextIsolation: false
    },
    height: 500,
    width: 300,
    minHeight: 300,
  });

  mainWindow.loadURL(winURL);

  aboutWindow.loadURL(winURL);

  if (isDev) {
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
      REDUX_DEVTOOLS
    } = require("electron-devtools-installer");

    installExtension(REACT_DEVELOPER_TOOLS)
      .then(name => {
        console.log(`Added Extension: ${name}`);
      })
      .catch(err => {
        console.log("An error occurred: ", err);
      });

    installExtension(REDUX_DEVTOOLS)
      .then(name => {
        console.log(`Added Extension: ${name}`);
      })
      .catch(err => {
        console.log("An error occurred: ", err);
      });
  }

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();

    ipcMain.on("open-external-window", (event, arg) => {
      shell.openExternal(arg);
    });
  });

  aboutWindow.on("close", (e) => {
    e.preventDefault();
    aboutWindow.hide();
  })
};

// const generateMenu = () => {
//   const template = [
//     {
//       label: "File",
//       submenu: [{ role: "about" }, { role: "quit" }]
//     },
//     {
//       label: "Edit",
//       submenu: [
//         { role: "undo" },
//         { role: "redo" },
//         { type: "separator" },
//         { role: "cut" },
//         { role: "copy" },
//         { role: "paste" },
//         { role: "pasteandmatchstyle" },
//         { role: "delete" },
//         { role: "selectall" }
//       ]
//     },
//     {
//       label: "View",
//       submenu: [
//         { role: "reload" },
//         { role: "forcereload" },
//         { role: "toggledevtools" },
//         { type: "separator" },
//         { role: "resetzoom" },
//         { role: "zoomin" },
//         { role: "zoomout" },
//         { type: "separator" },
//         { role: "togglefullscreen" }
//       ]
//     },
//     {
//       role: "window",
//       submenu: [{ role: "minimize" }, { role: "close" }]
//     },
//     {
//       role: "help",
//       submenu: [
//         {
//           click() {
//             require("electron").shell.openExternal(
//               "https://getstream.io/winds"
//             );
//           },
//           label: "Learn More"
//         },
//         {
//           click() {
//             require("electron").shell.openExternal(
//               "https://github.com/GetStream/Winds/issues"
//             );
//           },
//           label: "File Issue on GitHub"
//         }
//       ]
//     }
//   ];

//   Menu.setApplicationMenu(Menu.buildFromTemplate(template));
// };

const generateCtxMenu = () => {
  const ctxMenu = new Menu();

  ctxMenu.append(new MenuItem({ role: 'undo'}));
  ctxMenu.append(new MenuItem({ role: 'redo'}));
  ctxMenu.append(new MenuItem({ type: 'separator'}));
  ctxMenu.append(new MenuItem({ role: 'cut'}));
  ctxMenu.append(new MenuItem({ role: 'copy'}));
  ctxMenu.append(new MenuItem({ role: 'paste'}));
  ctxMenu.append(new MenuItem({ role: 'selectall'}));

  mainWindow.webContents.on('context-menu', function(e, params){
    ctxMenu.popup(mainWindow, params.x, params.y);
  })
}



app.on("ready", () => {
  createWindow();
  generateCtxMenu();
  // generateMenu();

  
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on("close-app", () => {
  aboutWindow.close();
  mainWindow.close();
});

ipcMain.on("load-page", (event, arg) => {
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
    project: {
      chapters: [
        {
          id: 1,
          title: "Chapter 1",
          content: ""
        }
      ],
      characters: [
        {
          name: "John Doe",
          id: 1,
          info: [
            {
              id: 1,
              title: "Notes",
              content: `<h1 class="ql-align-center">Notes</h1>`
            },
            {
              id: 2,
              title: "Personal Data",
              content:
                '<h1 class="ql-align-center">Personal Data</h1><p class="ql-align-center"><br></p><p><strong><em>(1/12) first name?</em></strong></p><p>	</p><p><strong><em>(2/12) surname?</em></strong></p><p>	</p><p><strong><em>(3/12) nickname? Where does it come from?</em></strong></p><p>	</p><p><strong><em>(4/12) gender?</em></strong></p><p>	</p><p><strong><em>(5/12) how old is he/she?</em></strong></p><p>	</p><p><strong><em>(6/12) birthplace?</em></strong></p><p>	</p><p><strong><em>(7/12) residence?</em></strong></p><p>	</p><p><strong><em>(8/12) what is his/her level of education?</em></strong></p><p>	</p><p><strong><em>(9/12) which is his/her profession?</em></strong></p><p>	</p><p><strong><em>(10/12) is he/she wealthy or poor?</em></strong></p><p>	</p><p><strong><em>(11/12) which kind of house he/she lives in? Villa? Apartment?</em></strong></p><p>	</p><p><strong><em>(12/12) does he/she own his/her home or does he/she rent?</em></strong></p><p class="ql-align-center"><br></p>'
            },
            {
              id: 3,
              title: "Physical Features",
              content:
                '<h1 class="ql-align-center">Physical Features</h1><p class="ql-align-center"><br></p><p><strong><em>(1/24) which is his/her race?</em></strong></p><p>	</p><p><strong><em>(2/24) is he/she short or tall?</em></strong></p><p>	</p><p><strong><em>(3/24) is he/she thin or fat?</em></strong></p><p>	</p><p><strong><em>(4/24) what is his/her hair like?</em></strong></p><p>	</p><p><strong><em>(5/24) what is his/her face like?</em></strong></p><p>	</p><p><strong><em>(6/24) what are his/her eyes like? Does he/she wear glasses?</em></strong></p><p>	</p><p><strong><em>(7/24) what is his/her nose like?</em></strong></p><p>	</p><p><strong><em>(8/24) what are his/her mouth and teeth like?</em></strong></p><p>	</p><p><strong><em>(9/24) what are his/her ears like?</em></strong></p><p>	</p><p><strong><em>(10/24) any distinguishing features?</em></strong></p><p>	</p><p><strong><em>(11/24) does he have a moustache or beard?</em></strong></p><p>	</p><p><strong><em>(12/24) what is his/her neck like?</em></strong></p><p>	</p><p><strong><em>(13/24) what are his/her shoulders like?</em></strong></p><p>	</p><p><strong><em>(14/24) what are his/her arms like?</em></strong></p><p>	</p><p><strong><em>(15/24) what are his/her hands like? Is he/she left-handed or right-handed?</em></strong></p><p>	</p><p><strong><em>(16/24) what is his/her chest like?</em></strong></p><p>	</p><p><strong><em>(17/24) what are his/her waist and hips like?</em></strong></p><p>	</p><p><strong><em>(18/24) what is his/her backside like?</em></strong></p><p>	</p><p><strong><em>(19/24) what are his/her legs and ankles like?</em></strong></p><p>	</p><p><strong><em>(20/24) what are his/her feet like?</em></strong></p><p>	</p><p><strong><em>(21/24) how muscular is he/she?</em></strong></p><p>	</p><p><strong><em>(22/24) is he/she hairy?</em></strong></p><p>	</p><p><strong><em>(23/24) does he/she have any scars or other particular markings?</em></strong></p><p>	</p><p><strong><em>(24/24) does he/she have any tattoos or body-piercings?</em></strong></p><p class="ql-align-center"><br></p>'
            },
            {
              id: 4,
              title: "Behavoirs Attitudes",
              content:
                '<h1 class="ql-align-center">Behavoirs Attitudes</h1><p class="ql-align-center"><br></p><p><strong><em>(1/12) what does he/she look like?</em></strong></p><p>	</p><p><strong><em>(2/12) what is his/her way of speaking?</em></strong></p><p>	</p><p><strong><em>(3/12) how does he/she laugh?</em></strong></p><p>	</p><p><strong><em>(4/12) how does he/she cry?</em></strong></p><p>	</p><p><strong><em>(5/12) how does he/she walk?</em></strong></p><p>	</p><p><strong><em>(6/12) is he/she well mannered and refined, or ill-mannered and coarse?</em></strong></p><p>	</p><p><strong><em>(7/12) is he/she a clean person?</em></strong></p><p>	</p><p><strong><em>(8/12) what is his/her style? is he/she elegant or not?</em></strong></p><p>	</p><p><strong><em>(9/12) does she wear make-up and how is it applied?</em></strong></p><p>	</p><p><strong><em>(10/12) does he/she wear cologne or perfume?</em></strong></p><p>	</p><p><strong><em>(11/12) does he/she wear any jewellery?</em></strong></p><p>	</p><p><strong><em>(12/12) how does he/she eat and drink?</em></strong></p><p class="ql-align-center"><br></p>'
            },
            {
              id: 5,
              title: "Psyhcology",
              content:
                '<h1 class="ql-align-center">Psyhcology</h1><p class="ql-align-center"><br></p><p><strong><em>(1/62) is he/she easy-going?</em></strong></p><p>	</p><p><strong><em>(2/62) is he/she charming?</em></strong></p><p>	</p><p><strong><em>(3/62) how does he/she feel most frequently? Happy or sad?</em></strong></p><p>	</p><p><strong><em>(4/62) is he/she generous or selfish? Is he/she self-centered?</em></strong></p><p>	</p><p><strong><em>(5/62) is he/she ambitious?</em></strong></p><p>	</p><p><strong><em>(6/62) is he/she anxious? Is he/she apprehensive?</em></strong></p><p>	</p><p><strong><em>(7/62) is he/she nice or unpleasant? Is he/she funny or boring?</em></strong></p><p>	</p><p><strong><em>(8/62) is he/she enthusiastic?</em></strong></p><p>	</p><p><strong><em>(9/62) is he/she open-minded?</em></strong></p><p>	</p><p><strong><em>(10/62) is he/she kind or arrogant?</em></strong></p><p>	</p><p><strong><em>(11/62) is he/she a good listener?</em></strong></p><p>	</p><p><strong><em>(12/62) does he/she tend to be passive?</em></strong></p><p>	</p><p><strong><em>(13/62) is he/she cheap or generous?</em></strong></p><p>	</p><p><strong><em>(14/62) is he/she adventurous?</em></strong></p><p>	</p><p><strong><em>(15/62) does he/she tend to lie or is he/she sincere? Is he/she frank?</em></strong></p><p>	</p><p><strong><em>(16/62) is he/she calm or bad-tempered? Nervous? Pugnacious? Violent?</em></strong></p><p>	</p><p><strong><em>(17/62) is he/she goal-oriented with consistent goals, or is he/she fickle?</em></strong></p><p>	</p><p><strong><em>(18/62) is he/she loose or chaste?</em></strong></p><p>	</p><p><strong><em>(19/62) is he/she an intellectual or does he/she tend to be more pragmatic?</em></strong></p><p>	</p><p><strong><em>(20/62) is he/she cynical or idealistic? Is he/she down to earth or a dreamer?</em></strong></p><p>	</p><p><strong><em>(21/62) is he/she consistent with his/her ideas?</em></strong></p><p>	</p><p><strong><em>(22/62) is he/she understanding and indulgent or severe?</em></strong></p><p>	</p><p><strong><em>(23/62) is he/she courageous?</em></strong></p><p>	</p><p><strong><em>(24/62) is he/she curious or indifferent?</em></strong></p><p>	</p><p><strong><em>(25/62) is he/she discreet or tends to gossip?</em></strong></p><p>	</p><p><strong><em>(26/62) is he/she self-confident or clumsy?</em></strong></p><p>	</p><p><strong><em>(27/62) is he/she obedient or disobedient?</em></strong></p><p>	</p><p><strong><em>(28/62) is he/she honest?</em></strong></p><p>	</p><p><strong><em>(29/62) is he/she tidy?</em></strong></p><p>	</p><p><strong><em>(30/62) is he/she sweet and affectionate or harsh?</em></strong></p><p>	</p><p><strong><em>(31/62) is he/she fussy and meticulous? Is he/she diligent?</em></strong></p><p>	</p><p><strong><em>(32/62) is he/she biased or objective?</em></strong></p><p>	</p><p><strong><em>(33/62) is he/she rational or passionate?</em></strong></p><p>	</p><p><strong><em>(34/62) is he/she clever?</em></strong></p><p>	</p><p><strong><em>(35/62) is he/she jealous? Is he/she possessive?</em></strong></p><p>	</p><p><strong><em>(36/62) is he/she mature or immature?</em></strong></p><p>	</p><p><strong><em>(37/62) is he/she patient?</em></strong></p><p>	</p><p><strong><em>(38/62) is he/she impulsive or thoughtful? Is he/she cautious?</em></strong></p><p>	</p><p><strong><em>(39/62) can he/she be easily influenced?</em></strong></p><p>	</p><p><strong><em>(40/62) is he/she hospitable?</em></strong></p><p>	</p><p><strong><em>(41/62) is he/she self confident? Does he/she trust his/her own capacities?</em></strong></p><p>	</p><p><strong><em>(42/62) is he/she tolerant?</em></strong></p><p>	</p><p><strong><em>(43/62) is he/she invasive?</em></strong></p><p>	</p><p><strong><em>(44/62) is he/she envious?</em></strong></p><p>	</p><p><strong><em>(45/62) is he/she ironic?</em></strong></p><p>	</p><p><strong><em>(46/62) is he/she reliable?</em></strong></p><p>	</p><p><strong><em>(47/62) is he/she petty?</em></strong></p><p>	</p><p><strong><em>(48/62) is he/she humble or presumptuous?</em></strong></p><p>	</p><p><strong><em>(49/62) is he/she lazy or hard-working?</em></strong></p><p>	</p><p><strong><em>(50/62) is he/she proud?</em></strong></p><p>	</p><p><strong><em>(51/62) is he/she optimistic or pessimistic?</em></strong></p><p>	</p><p><strong><em>(52/62) is he/she touchy?</em></strong></p><p>	</p><p><strong><em>(53/62) is he/she deep or superficial?</em></strong></p><p>	</p><p><strong><em>(54/62) is he/she a rebel?</em></strong></p><p>	</p><p><strong><em>(55/62) is he/she a romantic?</em></strong></p><p>	</p><p><strong><em>(56/62) can he/she forgive or does he/she harbour resentment?</em></strong></p><p>	</p><p><strong><em>(57/62) does he/she have a sense of justice?</em></strong></p><p>	</p><p><strong><em>(58/62) is he/she friendly and extroverted or more introverted?</em></strong></p><p>	</p><p><strong><em>(59/62) has he/she a free spirit?</em></strong></p><p>	</p><p><strong><em>(60/62) is he/she hare-brained?</em></strong></p><p>	</p><p><strong><em>(61/62) is he/she vain?</em></strong></p><p>	</p><p><strong><em>(62/62) is he/she unstable and capricious? Is he/she moody?</em></strong></p><p class="ql-align-center"><br></p>'
            },
            {
              id: 6,
              title: "Ideas Passions",
              content:
                '<h1 class="ql-align-center">Ideas Passions</h1><p class="ql-align-center"><br></p><p><strong><em>(1/18) what are his/her religious beliefs/ideas?</em></strong></p><p>	</p><p><strong><em>(2/18) is he/she superstitious?</em></strong></p><p>	</p><p><strong><em>(3/18) what are his/her political views/ideas?</em></strong></p><p>	</p><p><strong><em>(4/18) does he/she like sport? Does he/she play any sport? Is he/she a fan?</em></strong></p><p>	</p><p><strong><em>(5/18) does he/she appreciate art? How does he/she express it?</em></strong></p><p>	</p><p><strong><em>(6/18) does he/she have a passion for art?</em></strong></p><p>	</p><p><strong><em>(7/18) does he/she like literature? Favourite novel?</em></strong></p><p>	</p><p><strong><em>(8/18) does he/she like music? Favourite song?</em></strong></p><p>	</p><p><strong><em>(9/18) does he/she like cinema? Favourite movie?</em></strong></p><p>	</p><p><strong><em>(10/18) does he/she like photography?</em></strong></p><p>	</p><p><strong><em>(11/18) does he/she love animals? Does he/she have any pets?</em></strong></p><p>	</p><p><strong><em>(12/18) does he/she love travelling? Favourite trips or adventures?</em></strong></p><p>	</p><p><strong><em>(13/18) does he/she like good cooking? Does he/she like to cook?</em></strong></p><p>	</p><p><strong><em>(14/18) does he/she like technology?</em></strong></p><p>	</p><p><strong><em>(15/18) what is his/her usual means of transport?</em></strong></p><p>	</p><p><strong><em>(16/18) which is his/her favourite hobby?</em></strong></p><p>	</p><p><strong><em>(17/18) does he/she have any obsessions?</em></strong></p><p>	</p><p><strong><em>(18/18) which are his/her vices?</em></strong></p><p class="ql-align-center"><br></p>'
            },
            {
              id: 7,
              title: "Sociology",
              content:
                '<h1 class="ql-align-center">Sociology</h1><p class="ql-align-center"><br></p><p><strong><em>(1/10) how is his/her relationship with his/her partner?</em></strong></p><p>	</p><p><strong><em>(2/10) how is his/her relationship with his/her father?</em></strong></p><p>	</p><p><strong><em>(3/10) how is his/her relationship with his/her mother?</em></strong></p><p>	</p><p><strong><em>(4/10) how is his/her relationship with his/her siblings?</em></strong></p><p>	</p><p><strong><em>(5/10) how is his/her relationship with his/her grandparents?</em></strong></p><p>	</p><p><strong><em>(6/10) how is his/her relationship with his/her cousins/uncles?</em></strong></p><p>	</p><p><strong><em>(7/10) how is his/her relationship with his/her teachers?</em></strong></p><p>	</p><p><strong><em>(8/10) how is his/her relationship with his/her schoolmates?</em></strong></p><p>	</p><p><strong><em>(9/10) how is his/her relationship with his/her friends?</em></strong></p><p>	</p><p><strong><em>(10/10) how is his/her relationship with his/her colleagues, bosses, clients?</em></strong></p><p class="ql-align-center"><br></p>'
            },
            {
              id: 8,
              title: "Life Before The Stories Beginning",
              content:
                '<h1 class="ql-align-center">Life Before The Stories Beginning</h1>'
            },
            {
              id: 9,
              title: "Conflict",
              content: '<h1 class="ql-align-center">Conflict</h1>'
            },
            {
              id: 10,
              title: "Evolution",
              content: '<h1 class="ql-align-center">Evolution</h1>'
            },
            {
              id: 11,
              title: "Images",
              content: '<h1 class="ql-align-center">Images</h1>'
            }
          ]
        }
      ],
      settings: [
        {
          name: "Planetarium",
          id: 1,
          info: [
            {
              id: 1,
              title: "Basics",
              content: `<h1 class="ql-align-center">Basics</h1><p><br></p><p><strong>What is your world called? </strong></p><p><br></p><p><strong>Is it set on: </strong></p><ul><li>Earth</li><li>Alternate Earth</li><li>Not Earth</li></ul><p><br></p><p><strong> Estimate its population: </strong></p><p><br></p><p><strong>In one sentence, describe your world.</strong></p>`
            },
            {
              id: 2,
              title: "Geography",
              content: `<h1 class="ql-align-center">Geography</h1><p class="ql-align-center"><br></p><h2>THE NATURAL WORLD</h2><ul><li>How was the world created? How long ago was it created?</li><li>How do the laws of physics work?</li><li>How does the solar system move? What celestial beings exist (suns, stars, moons, etc.) and how do they relate to the world?</li></ul><p><br></p><h2>Flora and fauna</h2><ul><li>How does the flora differ from region to region?</li><li>Do any plants have special or magical properties? Are any dangerous?</li></ul><p><br></p><h2>Creatures</h2><ul><li>What kind of wildlife roams which parts of your world?</li><li>How did the wildlife evolve? Where are they most commonly found?</li><li>Do mythical creatures such as dragons exist? How do they fit into the ecosystem?</li></ul><p><br></p><h2>Landscape</h2><ul><li>Where are the mountain ranges? Rivers? Forests? Deserts? Seas?</li><li>How does the terrain interact with its inhabitants?</li><li>Are there any “natural wonders” in your world? How were they formed?</li></ul><p><br></p><h2>Diseases</h2><ul><li>What natural diseases have evolved over time? How are they transmitted? How has this affected population growth?</li><li>LOCATIONS OF SIGNIFICANCE</li><li>What are the major cities in your world? Ports? Most populated metropolises? Is your world split geographically? (e.g. rural and urban, north and south, etc.) If so, how?</li></ul><p><br></p><h2>Capital city</h2><ul><li>What is the capital city of the world? Why is it the capital?</li><li>Flags and symbols•How does each city choose to represent itself (crest, flags, signature colors)?</li></ul><p><br></p><h2>WEATHER</h2><ul><li>What are the processes of your world that drive weather and ocean patterns?</li><li>Are certain regions more vulnerable to certain weather conditions?</li></ul><p><br></p><h2>Climate</h2><ul><li>How does the climate differ in each region?</li><li>What are the seasons like in your world? How many seasons are there?</li></ul>`
            },
            {
              id: 3,
              title: "People",
              content: `<h1 class="ql-align-center">People</h1><p class="ql-align-center"><br></p><h2>RACES &amp; SPECIES</h2><ul><li>What intelligent species or races populate your world? Dwarves? Elves? Xenomorphs? Other? How did they come to exist?</li><li>How does each race or species perceive each other? How do they co- exist?</li><li>Physical build</li><li>What do the inhabitants of your world look like? Do they have any distinguishing features?</li><li>What is the societal standard for beauty? How might this differ in each region of the world?</li><li>Mannerisms</li><li>What is the code of conduct between people of different ranks or classes? People of different cities or regions? Elders?</li><li>How people in your world convey non- verbal boredom? Disbelief? Happiness? Impatience? Respect?</li><li>What would be a gesture that is universally insulting in your world?</li></ul><p><br></p><h2>Customs and rituals</h2><ul><li>Are there any rites of passages in your world? “Coming of age” celebrations? If so, what age marks the transition from child to adult?</li><li>What traditions surround death and burial? What about engagements and proposals of marriage?</li></ul><p><br></p><h2>Festivals</h2><ul><li>What are the important festivals of your world and why are they celebrated?</li></ul><p><br></p><h2>LANGUAGES</h2><ul><li>How many languages exist in your world? How did they originate?</li><li>Which language is spoken most? Is there a universal language?•How do the names differ in each region?</li></ul><p><br></p><h2>Sayings</h2><ul><li>What are common sayings? Idioms? Insults? “Untranslatable” words that only a certain group of people would understand?</li></ul><p><br></p><h2>Accents</h2><ul><li>If different languages exist, how does this affect the accents in your world? What do the accents say about the person (place of origin, social class, level of education, etcetera)?</li></ul><p><br></p><h2>Greetings</h2><ul><li>How do people of the same race greet each other? How do people of different races greet one another?</li><li>Is there an informal and formal way to greet others depending on the level of familiarity (i.e. friends, acquaintances, elders, superiors, etcetera)? What are the proper forms of address?</li></ul><p><br></p><h2>SOCIAL FRAMEWORKS</h2><ul><li>How do people see each other in your world? Foreigners? Non- humans?</li><li>What are the social taboos? What would one need to do in order to be kicked out of society?</li></ul><p><br></p><h2>Class or caste systems</h2><ul><li>Is there a class system? If so, how much emphasis does society place on it?What are the tell- tale signs that a person belongs to a certain class?</li><li>How does class affect the business in your world? Can anyone become a priest or a wizard — or is it a privilege restricted to certain members of the hierarchy?</li></ul><p><br></p><h2>Family structure</h2><ul><li>What is the normal family unit?•What is the social system within a family unit in your world? Patriarchal? Matriarchal?</li><li>What const itutes a good father? A good mother? A good child?</li></ul><p><br></p><h2>Marriage</h2><ul><li>How is marriage defined in your world? Is marriage a civil or religious institution?</li><li>Do people marry for love? If not, why do they marry?</li></ul>`
            },
            {
              id: 4,
              title: "Civilization",
              content: `<h1 class="ql-align-center">Civilization</h1><p class="ql-align-center"><br></p><h2>HISTORY</h2><ul><li>How did civilization begin?</li><li>What were the significant wars that have taken place on your world’s soil? How have they shaped the present?</li><li>When was the earliest known record of history?</li><li>Can your world’ s history be divided into significant eras (e.g. Georgian, Victorian, Edwardian, etcetera)?</li></ul><p><br></p><h2>Myths</h2><ul><li>What myths exist in your world to explain the cosmos? How might this have in turn shaped religion?</li><li>How were stories passed through generations?</li></ul><p><br></p><h2>CULTURE</h2><ul><li>How is culture preserved in your world?</li><li>What are some things that define each culture? What would a person from a certain city, region, or country be proudest of?</li></ul><p><br></p><h2>Literature, art, and music</h2><ul><li>What is the role of the arts in your world’ s culture? How is it perceived by society and how has it evolved?</li><li>Who are some celebrated or noted artists in history? What for?</li><li>How might the arts have changed as a result of outside influences (from other regions, cities, races, etcetera) ?</li><li>Are any of the arts taboo? If so, why?</li></ul><p><br></p><h2>Clothing</h2><ul><li>What is the customary dress for men? Women?</li><li>What fashion is trending and how does this differ from region to region?•How does the clothing one wears reflect status?</li><li>What is the dress code for each profession? How strictly followed must it be?</li></ul><p><br></p><h2>Cuisine</h2><ul><li>What are the regional dishes? How might this differ depending on the climate and environment?</li><li>Is there a difference between what the poor and the rich eat? What is considered a luxurious food? What is considered a staple food?</li><li>How are mealtimes approached? Is there a set hour to be at the table? Are there traditions that precede or follow a meal?</li></ul><p><br></p><h2>RELIGION</h2><ul><li>How do people worship in your world?</li><li>When and where do people worship?</li></ul><p><br></p><h2>Gods and deities</h2><ul><li>Who are the major and minor gods that people worship?</li><li>What function do the gods serve in society?</li></ul><p><br></p><h2>Holy texts</h2><ul><li>What (if any) holy texts exist?</li><li>How well- known are the scriptures? Would people of all ages be able to recite them on the spot if asked?</li></ul><p><br></p><h2>Significant prophets</h2><ul><li>Who are the important religious figures in the world? For what reason are they significant?</li></ul><p><br></p><h2>EDUCATION</h2><ul><li>Does formal education exist? If so, who can access it? The rich? The clergy? Everyone in the general population?</li><li>If magic exists in your world, how is it studied? Do schools exist to train it? What are literacy rates among the general population? How does this affect communication and the distribution of information?</li></ul><p><br></p><h2>LEISURE</h2><ul><li>How do people spend their leisure time in your world? What forms of entertainment are most common?</li><li>Are there any organized sports in your world? How might its rules and regulations differ from the ordinary (i.e. Quidditch)?&nbsp;&nbsp;</li></ul>`
            },
            {
              id: 5,
              title: "Technology, Magic & Weapons",
              content: `<h1 class="ql-align-center">Technology, Magic &amp; Weapons</h1><p><br></p><h2>MAGIC SYSTEM(S)</h2><ul><li>To what ends and purposes is magic used in your world? Who can use it?</li><li>What limits are there to its power? What are the consequences of using it?</li><li>What is the history of magic and magicians in your world?</li><li>How does society view magic? Positively? Negatively? As the Other?</li></ul><p><br></p><h2>Rules of magic</h2><ul><li>How does magic work in your world? Where does it come from?</li><li>Is there a language that’ s needed in order to call forth magic? If so, what are its roots?</li><li>Is magic regulated in any way? What is the governing body?</li></ul><p><br></p><h2>Practitioning magicians</h2><ul><li>What are magicians’ status in society? Are they trusted advisors of kings or charlatans on the road?</li><li>How many magici ans exist in your world? How do they perceive one another?</li></ul><p><br></p><h2>TECHNOLOGY</h2><ul><li>How advanced is the technology in your world? How does it work?</li><li>How does technology impact the different parts of society? Transportation? Communication? Medicine?</li><li>How does magic and technology interact and co-exist? Is it a rivalry? A co-op? Are there rules and regulations?</li></ul><p><br></p><h2>WEAPONRY</h2><ul><li>What weapons are predominant in your world (ranged, combat, anti- gravity, etcetera) and why?</li><li>Who makes the weapons? How do they work? Is it easy to obtain them?</li></ul><p><br></p><h2>Signature weapons</h2><ul><li>Are there special weapons ( e.g. Thor’ s Hammer, Captain America’s shield, etcetera)? How are they made? How many of them exist in the world?</li></ul><p><br></p><h2>Common weapons</h2><ul><li>Are there any weapons that are so commonplace that every household owns it? If so, what?</li><li>Are there professions that necessitate the bearing of weapons? What about religions (i.e. the Sikhs who carry daggers)?&nbsp;&nbsp;</li></ul>`
            },
            {
              id: 6,
              title: "Economy",
              content: `<h1 class="ql-align-center">Economy</h1><p><br></p><h2>TRADE &amp; COMMERCE</h2><ul><li>How is trade facilitated? Is it carried out by traveling merchants? By a guild? Are there auctions?</li><li>What cities, countries, or regions are allies? Trade partners? How has this changed throughout history?</li><li>How is the soft power of a region, city, or country determined?</li></ul><p><br></p><h2>Currency</h2><ul><li>Is there a universal currency? If not, what are the regional currencies? What is the valuation?</li><li>How is the currency circulated and what are the denominations? Can the currency be broken down into units (dollars , cents , dimes , quarters)?</li></ul><p><br></p><h2>Major imports &amp; exports</h2><ul><li>What are the major exports of the region or city? Imports? How might this have evolved throughout history?</li><li>Does a particular region specialize in particular trade (i.e. Livestock, weaponry, etcetera)? Why?</li></ul><p><br></p><h2>Natural resources</h2><ul><li>What resources are natural in each part of your world? How does this affect trade and trade relationships?</li></ul><p><br></p><h2>TRANSPORTATION</h2><ul><li>How easy it is to travel within a city and outside of a city? What modes of transportation exist (horse, anti- gravity car, etcetera)?</li><li>How is information disseminated all over your world (ink and paper, owl, newspaper, messenger)?</li></ul><p><br></p><h2>BUSINESS</h2><ul><li>What crafts or trades are highly valued in your world?</li><li>Are some professions considered more elite or respectable than others? How so?</li><li>How do people advance in their fields? Are there apprenticeships? How easy is social mobility?</li><li>What is the normal work schedule for the average person? What is the average income?</li></ul>`
            },
            {
              id: 7,
              title: "Politics",
              content: `<h1 class="ql-align-center">Politics</h1><p><br></p><h2>GOVERNMENT</h2><ul><li>What is the form of government? Is it a monarchy? Republic? Empire? Theocracy?</li><li>What are the responsibilities of the government? How far does the government’ s sphere of influence spread (magic, religion, etcetera)?</li><li>How is the government perceived? Is it trusted by the people or is there tension?</li></ul><p><br></p><h2>LAW</h2><ul><li>What is the rule of law in your world? How is law? What are the most important laws?</li><li>What are the punishments for breaking the law?</li></ul><p><br></p><h2>Justice systems</h2><ul><li>What is the legal process in your world? How are people tried?</li><li>How does magic fit into the legal system? Is it above the law?</li></ul><p><br></p><h2>War systems</h2><ul><li>How is war declared? Is there a formal process that a country must go through in order to engage in war?</li><li>What is the command structure of the army?</li><li>How big is the army? Is it composed of humans? Non- humans? Both?</li></ul>`
            }
          ]
        }
      ],
      notes: [
        {
          id: 1,
          title: "Ideas",
          content: `<h1 class="ql-align-center">Ideas</h1>`
        }
      ]
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
      title: "Open Project",
      properties: ["openFile"],
      filters: [{
        "name": "Creative Writer Project",
        "extensions": ["cwr"]
      }]
    },
    paths => respondWithPath(paths)
  );

  function respondWithPath(paths) {
    const fs = require("fs");
    if (paths === undefined) {
      // console.log("No file selected");
      return (event.returnValue = null);
    }

    fs.readFile(paths[0], "utf-8", function(err, data) {
      if (err) return (event.returnValue = null);
      const project = JSON.parse(data);

      // console.log(project);

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
      // console.log(err.message);
      event.returnValue = false;
      return;
    }
  });

  event.returnValue = true;
});

/**
 * Handles saving the recents to the recents store to be retrieved later
 * @param  {} project - Current project to add to recents
 */
function handleSaveRecents(project) {
  let recents = store.get("recents");

  // console.log("recObj", recents);

  // Add the project to the recents
  if (recents !== null) {
    // Check if we already have this recent in our recent's store
    let isSame = false;

    for (let i = 0; i < recents.length; i++) {
      const recTitle = recents['title'];
      const recLoc = recents['location'];
      const projTitle = project['title'];
      const projLoc = project['location'];
      if (recTitle === projTitle && recLoc === projLoc){
        isSame = true;
        break;
      }
    }

    console.log("isSame => ", isSame);

    // If we already have 10 recents in our list, remove the first one
    if (recents.length >= 10) recents.pop();

    if (!isSame) {
      recents.push({location: project.location, title: project.title});
      recents.reverse();
      store.set("recents", recents);
    }
  } else {
    recents = [];
    recents.push({location: project.location, title: project.title});
    store.set("recents", recents);
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
      return (event.returnValue = null);
    }
    const proj = JSON.parse(data);

    return (event.returnValue = proj);
  });
});

ipcMain.on("remove-recent", (event, arg) => {

  let recents = store.get("recents");
  if (recents === undefined || recents === null || recents === "") {
    return (event.returnValue = null);
  }

  let newRecents = [];

  // Compare the recents
  for (let i = 0; i < recents.length; i++) {
    const recTitle = recents[i].title;
    const recLoc = recents[i].location;
    const projTitle = arg['title'];
    const projLoc = arg['location'];

    // If the recent is equal to the selected, ignore it
    if (recTitle === projTitle && recLoc === projLoc){

    } else {
      newRecents.push(recents[i]);
    }
  }

  console.log("newRecents => ", newRecents);
    store.set("recents", newRecents);

    return (event.returnValue = newRecents);
});

ipcMain.on("toggle-about-window", (event, arg) => {
  aboutWindow.show();
  return event.returnValue = null;
});
