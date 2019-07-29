import React from "react";
import PropTypes from "prop-types";
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles
} from "@material-ui/core/styles";
import { Hidden, CssBaseline } from "@material-ui/core";
import Navigator from "../../components/Navigator/Navigator";
import Content from "../../components/Content/Content";
import Header from "../../components/Header/Header";
import { connect } from "react-redux";
import {
  changeCurrentChapter,
  createNewChapter,
  createNewProject,
  updateChapter,
  changeCurrentChar,
  updateCharacterInfo,
  createNewCharacterInfo,
  createNewCharacter,
  changeCurrentSetting,
  updateSettingInfo,
  createNewSetting,
  createNewSettingInfo,
  createNewNote,
  changeCurrentNote,
  updateNote,
  saveProject
} from "../../store/actions";
import ReactQuill from "react-quill";

let theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5
    }
  },
  palette: {
    primary: {
      light: "#63ccff",
      main: "#009be5",
      dark: "#006db3"
    }
  },
  shape: {
    borderRadius: 8
  }
});

theme = {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: "#18202c",
        "& *": { color: "rgba(255, 255, 255, 0.7)" }
      }
    },
    MuiButton: {
      label: {
        textTransform: "initial"
      },
      contained: {
        boxShadow: "none",
        "&:active": {
          boxShadow: "none"
        }
      }
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing.unit
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white
      }
    },
    MuiTab: {
      root: {
        textTransform: "initial",
        margin: "0 16px",
        minWidth: 0,
        [theme.breakpoints.up("md")]: {
          minWidth: 0
        }
      },
      labelContainer: {
        padding: 0,
        [theme.breakpoints.up("md")]: {
          padding: 0
        }
      }
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing.unit
      }
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4
      }
    },
    MuiDivider: {
      root: {
        backgroundColor: "#404854"
      }
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium
      }
    },
    MuiListItemIcon: {
      root: {
        color: "inherit",
        marginRight: 0,
        "& svg": {
          fontSize: 20
        }
      }
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32
      }
    }
  },
  props: {
    MuiTab: {
      disableRipple: true
    }
  },
  mixins: {
    ...theme.mixins,
    toolbar: {
      minHeight: 48
    }
  }
};

const drawerWidth = "20%";

const styles = {
  root: {
    display: "flex",
    minHeight: "100vh"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column"
  },
  mainContent: {
    flex: 1,
    // padding: '48px 36px 0',
    background: "#eaeff1"
  }
};

class Editor extends React.Component {
  state = {
    mobileOpen: false,
    text: "Enter Text Here",
    open: true,
    open1: false,
    open2: false,
    open3: false,
    open4: false,
    open5: false,
    toolTip1: false,
    characterOpen: [],
    settingOpen: [],
    selected: "home",
    chapExpanded: false,
    charExpanded: false,
    navExpanded: true,
    anchorEl: null,
    mobileMoreAnchorEl: null,
    arrowRef: null,
    text1: '',
    charCount: 0,
    charNoSpaces: 0,
    wordCount: 0,
    sentenceCount: 0,
    paragraphCount: 0,
    lineCount: 0,
  };

  componentWillMount() {
    // TODO: Refactor this - too much going on
    if (this.props.project !== null || this.props.project !== undefined) {
      if (this.props.project !== null) {
        let characterOpen = [];
        let settingOpen = [];
        this.props.project.project.characters.forEach(() => {
          const info = {
            isOpen: false
          };

          characterOpen.push(info);
        });

        this.props.project.project.settings.forEach(() => {
          const info = {
            isOpen: false
          };

          settingOpen.push(info);
        });

        let chapter = [{ content: "" }];

        if (
          this.props.project.project.chapters !== null &&
          this.props.currentChapter
        ) {
          chapter = this.props.project.project.chapters.filter(
            chp => chp.id === this.props.currentChapter
          );
        } else if (
          this.props.project.project.characters !== null &&
          this.props.currentChar
        ) {
          this.props.project.project.characters.forEach((char, i) => {
              if (char.id === this.props.currentChar) {
                chapter = char.info.filter(inf => inf.id === this.props.currentInfo)
              }
            }
          );
        } else if (
          this.props.project.project.settings !== null &&
          this.props.currentSetting
        ) {
          this.props.project.project.settings.forEach((char, i) => {
                if (char.id === this.props.currentSetting) {
                  chapter = char.info.filter(inf => inf.id === this.props.currentSetInfo)
                }
              }
          );
        } else if (
            this.props.project.project.notes !== null &&
            this.props.currentNote
        ) {
            chapter = this.props.project.project.notes.filter(
                note => note.id === this.props.currentNote
            );
        }

        let span = document.createElement('span');
      span.innerHTML = chapter[0].content;
      const result = span.textContent || span.innerText;

      if (result !== null) {
        const words = result.match(/\b[-?(\w+)?]+\b/gi);
        const totalChars = result;
        const removePrefixes = chapter[0].content.replace(/(Mr|Mrs|Ms|Dr.)\b\./gim, '');
        const sentences = removePrefixes.split(/[.|!|?]+/g);
        const charCountNoSpace = result.replace(/\s+/gi, '');
        const paragraphs = chapter[0].content.split('<br>');
        const lines = chapter[0].content.replace(/(\/h1>|\/h2>|\/h3>|\/p>|<br>)+/gi,'\n').split('\n')
  
        console.log("LINES => ", lines);
  
        if (words === null) {
          this.setState({
            charCount: 0,
            charNoSpaces: 0,
            wordCount: 0,
            sentenceCount: 0,
            paragraphCount: 0,
            lineCount: 0,
            text: chapter[0].content,
            selected: `chapters/${this.props.currentChapter - 1}`,
            chapExpanded: true,
            characterOpen: characterOpen,
            settingOpen: settingOpen
          });
        } else {
          this.setState({
            charCount: totalChars.length,
            charNoSpaces: charCountNoSpace.length,
            wordCount: words.length,
            sentenceCount: sentences.length - 1,
            paragraphCount: paragraphs.length,
            lineCount: lines.length - 1,
            text: chapter[0].content,
            selected: `chapters/${this.props.currentChapter - 1}`,
            chapExpanded: true,
            characterOpen: characterOpen,
            settingOpen: settingOpen
          });
        }
  
      }

        // this.setState({
        //   text: chapter[0].content,
        //   selected: `chapters/${this.props.currentChapter - 1}`,
        //   chapExpanded: true,
        //   characterOpen: characterOpen,
        //   settingOpen: settingOpen
        // });
      } else {
        this.setState({ text: "Enter Text Here" });
      }
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.project !== this.props.project) {
        const chapter = nextProps.project.project.chapters.filter(
            chp => chp.id === this.props.currentChapter
        );

      // TODO: Refactor this
      let characterOpen = [];
      let settingOpen = [];
      this.props.project.project.characters.forEach((elem, i) => {
        const info = {
          isOpen: false
        };

        characterOpen.push(info);
      });

      this.props.project.project.settings.forEach(() => {
        const info = {
          isOpen: false
        };

        settingOpen.push(info);
      });

      let span = document.createElement('span');
      span.innerHTML = chapter[0].content;
      const result = span.textContent || span.innerText;

      if (result !== null) {
        const words = result.match(/\b[-?(\w+)?]+\b/gi);
        const totalChars = result;
        const removePrefixes = chapter[0].content.replace(/(Mr|Mrs|Ms|Dr.)\b\./gim, '');
        const sentences = removePrefixes.split(/[.|!|?]+/g);
        const charCountNoSpace = result.replace(/\s+/gi, '');
        const paragraphs = chapter[0].content.split('<br>');
        const lines = chapter[0].content.replace(/(\/h1>|\/h2>|\/h3>|\/p>|<br>)+/gi,'\n').split('\n')
  
        console.log("LINES => ", lines);
  
        if (words === null) {
          this.setState({
            charCount: 0,
            charNoSpaces: 0,
            wordCount: 0,
            sentenceCount: 0,
            paragraphCount: 0,
            lineCount: 0,
            text: chapter[0].content,
            selected: `chapters/${this.props.currentChapter - 1}`,
            chapExpanded: true,
            characterOpen: characterOpen,
            settingOpen: settingOpen
          });
        } else {
          this.setState({
            charCount: totalChars.length,
            charNoSpaces: charCountNoSpace.length,
            wordCount: words.length,
            sentenceCount: sentences.length - 1,
            paragraphCount: paragraphs.length,
            lineCount: lines.length - 1,
            text: chapter[0].content,
            selected: `chapters/${this.props.currentChapter - 1}`,
            chapExpanded: true,
            characterOpen: characterOpen,
            settingOpen: settingOpen
          });
        }
  
      }

      // this.setState({
      //   text: chapter[0].content,
      //   selected: `chapters/${this.props.currentChapter - 1}`,
      //   chapExpanded: true,
      //   characterOpen: characterOpen,
      //   settingOpen: settingOpen
      // });
    }

  }

  /**
   * Handles closing tooltips
   */
  handleTooltipClose = () => {
    this.setState({ toolTip1: false });
  };

  /**
   * Handles opening tooltips
   */
  handleTooltipOpen = () => {
    this.setState({ toolTip1: true });
  };

  /**
   * Handles ReactQuill's editor content
   * @param value - HTML value of the content
   * @param delta - Delta value of the content
   * @param source - Original source of content
   * @param editor - Editor (check if user or api editor changes)
   */
  handleChange = (value, delta, source, editor) => {
    console.log("DELTA => ", delta);
    console.log("EDITOR => ", editor.getContents());

    let span = document.createElement('span');
    span.innerHTML = value;
    const result = span.textContent || span.innerText;

    console.log("VALUE => ", span.innerHTML);

    if (this.props.currentChapter !== null) {
        console.log("CHAPTER");
      this.props.updateChapter(value, this.props.currentChapter);

    } else if (this.props.currentChar !== null) {
        console.log("CHARACTER INFO");
      this.props.updateCharacterInfo(
        value,
        this.props.currentChar,
        this.props.currentInfo
      );

    } else if (this.props.currentSetting !== null) {
        console.log("SETTING INFO");
      this.props.updateSettingInfo(
        value,
        this.props.currentSetting,
        this.props.currentSetInfo
      );

    } else if (this.props.currentNote !== null) {
        console.log("NOTE");
        this.props.updateNote(
            value,
            this.props.currentNote
        )
    }

    if (result !== null) {
      const words = result.match(/\b[-?(\w+)?]+\b/gi);
      const totalChars = result;
      const removePrefixes = value.replace(/(Mr|Mrs|Ms|Dr.)\b\./gim, '');
      const sentences = removePrefixes.split(/[.|!|?]+/g);
      const charCountNoSpace = result.replace(/\s+/gi, '');
      const paragraphs = value.split('<br>');
      const lines = value.replace(/(\/h1>|\/h2>|\/h3>|\/p>|<br>)+/gi,'\n').split('\n')

      console.log("LINES => ", lines);

      if (words === null) {
        this.setState({
          charCount: 0,
          charNoSpaces: 0,
          wordCount: 0,
          sentenceCount: 0,
          paragraphCount: 0,
          lineCount: 0,
        });
      } else {
        this.setState({
          charCount: totalChars.length,
          charNoSpaces: charCountNoSpace.length,
          wordCount: words.length,
          sentenceCount: sentences.length - 1,
          paragraphCount: paragraphs.length,
          lineCount: lines.length - 1
        });
      }

    }

  };

  /**
   * Open menu item
   * @param nr
   */
  openCollapse = nr => {
    this.setState(state => ({ [nr]: !state[nr] }));
  };

  /**
   * Add a chapter
   */
  handleAddChapter = () => {
    this.props.createNewChapter();
    console.log("CHPT => ", this.props.currentChapter);
    const num = this.props.currentChapter;
    this.setState({ selected: `chapters/${num}` });
  };

  /**
   * Change chapter
   * @param id - Id of chapter
   */
  handleChangeChapter = id => {
    this.props.changeCurrentChapter(id);
  };

  /**
   * Toggle header menu
   */
  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  /**
   * Close header menu
   */
  handleCloseMenu = () => {
    this.setState({ anchorEl: null });
  };

  /**
   * Open header menu
   * @param event
   */
  handleOpenMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  /**
   * Arrow reference
   * @param node
   */
  handleArrowRef = node => {
    this.setState({
      arrowRef: node
    });
  };

  /**
   * Change editor content to a character
   * @param charI - Id of character menu
   * @param infoI - Id of nested character menu item
   */
  handleChangeChar = (charI, infoI) => {

    this.props.changeCurrentChar(charI, infoI);
  };

  /**
   * Add a character info
   * @param char - Character to add to
   */
  handleAddCharacterInfo = char => {
    this.props.createNewCharacterInfo(char);
  };

  /**
   * Add a character
   */
  handleAddCharacter = () => {
    this.props.createNewCharacter();

    let characterOpen = this.state.characterOpen;
    const info = {
      isOpen: false
    };

    characterOpen.push(info);

    this.setState({
      characterOpen: characterOpen
    });
  };

  /**
   * Open character menu item
   * @param index - Index of item
   */
  openCharCollapse = index => {
    this.setState(
      previousState => {
        const characterOpen = [...previousState.characterOpen];
        characterOpen[index] = {
          ...characterOpen[index],
          isOpen: !characterOpen[index].isOpen
        };
        return { characterOpen };
      }
    );
  };

  /**
   * Open setting menu item
   * @param index - Index of item
   */
  openSetCollapse = index => {
    this.setState(
      previousState => {
        const settingOpen = [...previousState.settingOpen];
        settingOpen[index] = {
          ...settingOpen[index],
          isOpen: !settingOpen[index].isOpen
        };
        return { settingOpen };
      }
    );
  };

  /**
   * Change editor content to a specified setting
   * @param settingsI - Id of setting item
   * @param infoI - Id of nested setting item
   */
  handleChangeSetting = (settingsI, infoI) => {
    console.log("EDITOR -> ", settingsI, infoI);
    this.props.changeCurrentSetting(settingsI, infoI);
  };

  /**
   * Add setting info
   * @param setting - Setting to add to
   */
  handleAddSettingInfo = setting => {
    this.props.createNewSettingInfo(setting);
  };

  /**
   * Add a setting
   */
  handleAddSetting = () => {
    this.props.createNewSetting();

    let settingOpen = this.state.settingOpen;
    const info = {
      isOpen: false
    };

    settingOpen.push(info);

    this.setState({
      characterOpen: settingOpen
    });
  };

  /**
   * Add a note
   */
  handleAddNote = () => {
      this.props.createNewNote();
  };

  /**
   * Changes editor content to a specified note
   * @param id - Id of note
   */
  handleChangeNote = id => {
      this.props.changeCurrentNote(id);
  };

  /**
   * Save project
   */
  saveProject = () => {
    this.props.saveProject();
  };

  render() {
    // TODO: Refactor this into function
    let chapter = [{ title: "", content: "", id: 0 }];
    if (this.props.project !== null && this.props.currentChapter !== null) {
      chapter = this.props.project.project.chapters.filter(
        chp => chp.id === this.props.currentChapter
      );

    } else if (
      this.props.project !== null &&
      this.props.currentChar !== null &&
        this.props.currentChar !== undefined &&
      this.props.currentInfo !== null &&
        this.props.currentInfo !== undefined
    ) {
      this.props.project.project.characters.forEach(char => {
        if (char.id === this.props.currentChar) {
          chapter = char.info.filter(inf => inf.id === this.props.currentInfo)
        }
      })

    } else if (
      this.props.project !== null &&
      this.props.currentSetting !== null &&
      this.props.currentSetInfo !== null &&
        this.props.currentSetting !== undefined &&
        this.props.currentSetInfo !== undefined
    ) {
      this.props.project.project.settings.forEach(char => {
        if (char.id === this.props.currentSetting) {
          chapter = char.info.filter(inf => inf.id === this.props.currentSetInfo)
        }
      })

    } else if (
        this.props.project !== null &&
        this.props.currentNote !== null
    ) {
        chapter = this.props.project.project.notes.filter(
            note => note.id === this.props.currentNote
        );
    }

    const { classes, theme, ...other } = this.props;

    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <nav className={classes.drawer}>
            <Hidden smUp implementation="js">
              <Navigator
                PaperProps={{ style: { width: drawerWidth } }}
                variant="temporary"
                open={this.state.mobileOpen}
                onClose={this.handleDrawerToggle}
              />
            </Hidden>
            <Hidden xsDown implementation="css">
              <Navigator
                state={this.state}
                openCollapse={this.openCollapse}
                handleChangeChapter={this.handleChangeChapter}
                handleAddChapter={this.handleAddChapter}
                handleAddCharacter={this.handleAddCharacter}
                handleAddCharacterInfo={this.handleAddCharacterInfo}
                handleChangeChar={this.handleChangeChar}
                handleAddSetting={this.handleAddSetting}
                handleAddSettingInfo={this.handleAddSettingInfo}
                handleAddNote={this.handleAddNote}
                handleChangeNote={this.handleChangeNote}
                openCharCollapse={this.openCharCollapse}
                openSetCollapse={this.openSetCollapse}
                handleChangeSetting={this.handleChangeSetting}
                project={this.props.project}
                currentChapter={this.props.currentChapter}
                currentChar={this.props.currentChar}
                currentInfo={this.props.currentInfo}
                currentSetting={this.props.currentSetting}
                currentSetInfo={this.props.currentSetInfo}
                currentNote={this.props.currentNote}
                history={this.props.history}
                PaperProps={{ style: { width: drawerWidth } }}
              />
            </Hidden>
          </nav>
          <div className={classes.appContent}>
            <Header
              arrowRef={this.state.arrowRef}
              handleArrowRef={this.handleArrowRef}
              handleTooltipClose={this.handleTooltipClose}
              handleTooltipOpen={this.handleTooltipOpen}
              toolTip1={this.state.toolTip1}
              onDrawerToggle={this.handleDrawerToggle}
              name={
                this.props.project !== null
                  ? this.props.project.title
                  : "Project Title"
              }
              route={this.props}
              anchorEl={this.state.anchorEl}
              handleClose={this.handleCloseMenu}
              handleOpen={this.handleOpenMenu}
              open={open}
              wordCount={this.state.wordCount}
              characterCount={this.state.charCount}
              charNoSpaces={this.state.charNoSpaces}
              sentenceCount={this.state.sentenceCount}
              paragraphCount={this.state.paragraphCount}
              lineCount={this.state.lineCount}
              saveProject={this.saveProject}
            />
            <main className={classes.mainContent}>
              <Content
                chapter={chapter}
                handleChange={this.handleChange}
                project={this.props.project}
              />
            </main>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

Editor.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  project: state.rootReducer.project,
  currentChapter: state.rootReducer.currentChapter,
  currentChar: state.rootReducer.currentChar,
  currentInfo: state.rootReducer.currentInfo,
  currentSetting: state.rootReducer.currentSetting,
  currentSetInfo: state.rootReducer.currentSetInfo,
    currentNote: state.rootReducer.currentNote
});

export default connect(
  mapStateToProps,
  {
    createNewProject,
    createNewChapter,
    changeCurrentChapter,
    updateChapter,
    changeCurrentChar,
    updateCharacterInfo,
    createNewCharacterInfo,
    createNewCharacter,
    changeCurrentSetting,
    updateSettingInfo,
    createNewSetting,
    createNewSettingInfo,
      createNewNote,
      changeCurrentNote,
      updateNote,
    saveProject
  }
)(withStyles(styles)(Editor));
