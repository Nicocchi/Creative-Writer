import React from "react";
import PropTypes from "prop-types";
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Hidden from "@material-ui/core/Hidden";
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
} from "../../store/actions";

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

const drawerWidth = 256;

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
  };

  componentWillMount() {
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
          console.log("CHAPTERS");
          chapter = this.props.project.project.chapters.filter(
            chp => chp.id === this.props.currentChapter
          );
        } else if (
          this.props.project.project.characters !== null &&
          this.props.currentChar
        ) {
          console.log("CHARACTERS");
          chapter.push(
            this.props.project.project.characters[this.props.currentChar].info[
              this.props.currentInfo
            ]
          );
        } else if (
          this.props.project.project.settings !== null &&
          this.props.currentSetting
        ) {
          console.log("SETTINGS");
          chapter.push(
            this.props.project.project.settings[this.props.currentSetting].info[
              this.props.currentSetInfo
            ]
          );
        } else if (
            this.props.project.project.notes !== null &&
            this.props.currentNote
        ) {
            chapter = this.props.project.project.notes.filter(
                note => note.id === this.props.currentNote
            );
        }

        this.setState({
          text: chapter[0].content,
          selected: `chapters/${this.props.currentChapter - 1}`,
          chapExpanded: true,
          characterOpen: characterOpen,
          settingOpen: settingOpen
        });
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

      this.setState({
        text: chapter[0].content,
        selected: `chapters/${this.props.currentChapter - 1}`,
        chapExpanded: true,
        characterOpen: characterOpen,
        settingOpen: settingOpen
      });
    }
  }

  handleTooltipClose = () => {
    this.setState({ toolTip1: false });
  };

  handleTooltipOpen = () => {
    this.setState({ toolTip1: true });
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleChange = value => {
    console.log("Value => ", value);
    // this.setState({ text: value })
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
  };

  handleClick = () => {
    this.setState(state => ({ open1: !state.open1 }));
  };

  openCollapse = nr => {
    this.setState(state => ({ [nr]: !state[nr] }));
  };

  handleSelected = selected => {
    console.log("SELECTED => ", selected);
    const chapter = this.props.project.project.chapters.filter(
      chp => chp.id === this.props.currentChapter
    );
    this.setState({ selected, text: chapter[0].content });
  };

  handleAddChapter = () => {
    this.props.createNewChapter();
    console.log("CHPT => ", this.props.currentChapter);
    const num = this.props.currentChapter;
    this.setState({ selected: `chapters/${num}` });
  };

  handleChangeChapter = id => {
    this.props.changeCurrentChapter(id);
  };

  toggleChapters = () => {
    this.setState({
      chapExpanded: !this.state.chapExpanded,
      charExpanded: false
    });
  };

  toggleNav = () => {
    this.setState({ navExpanded: !this.state.navExpanded });
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  handleCloseMenu = () => {
    this.setState({ anchorEl: null });
  };

  handleOpenMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleArrowRef = node => {
    this.setState({
      arrowRef: node
    });
  };

  handleChangeChar = (charI, infoI) => {
    this.props.changeCurrentChar(charI, infoI);
  };

  handleAddCharacterInfo = char => {
    this.props.createNewCharacterInfo(char);
  };

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

  openCharCollapse = index => {
    console.log("INDEX => ", index);
    this.setState(
      previousState => {
        const characterOpen = [...previousState.characterOpen];
        characterOpen[index] = {
          ...characterOpen[index],
          isOpen: !characterOpen[index].isOpen
        };
        return { characterOpen };
      },
      () => console.log(this.state.characterOpen)
    );
  };

  openSetCollapse = index => {
    console.log("INDEX => ", index);
    this.setState(
      previousState => {
        const settingOpen = [...previousState.settingOpen];
        settingOpen[index] = {
          ...settingOpen[index],
          isOpen: !settingOpen[index].isOpen
        };
        return { settingOpen };
      },
      () => console.log(this.state.settingOpen)
    );
  };

  handleChangeSetting = (settingsI, infoI) => {
    this.props.changeCurrentSetting(settingsI, infoI);
  };

  handleAddSettingInfo = setting => {
    this.props.createNewSettingInfo(setting);
  };

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

    handleAddNote = () => {
        this.props.createNewNote();
    };

    handleChangeNote = id => {
        this.props.changeCurrentNote(id);
    };

  render() {
    let chapter = [{ content: "" }];
    if (this.props.project !== null && this.props.currentChapter !== null) {
      chapter = this.props.project.project.chapters.filter(
        chp => chp.id === this.props.currentChapter
      );
    } else if (
      this.props.project !== null &&
      this.props.currentChar !== null &&
      this.props.currentInfo !== null
    ) {
      chapter.push(
        this.props.project.project.characters[this.props.currentChar].info[
          this.props.currentInfo
        ]
      );
      chapter.reverse();
      console.log("CHAPTER CHARACTERS => ", chapter);
    } else if (
      this.props.project !== null &&
      this.props.currentSetting !== null &&
      this.props.currentSetInfo !== null
    ) {
      chapter.push(
        this.props.project.project.settings[this.props.currentSetting].info[
          this.props.currentSetInfo
        ]
      );

      chapter.reverse();
      console.log("CHAPTER SETTINGS => ", chapter);
    } else if (
        this.props.project !== null &&
        this.props.currentNote !== null
    ) {
        chapter = this.props.project.project.notes.filter(
            note => note.id === this.props.currentNote
        );
    }

    // let selected = this.state.selected;
    const { classes, theme } = this.props;
    // const { anchorEl, mobileMoreAnchorEl } = this.state;
    // const isMenuOpen = Boolean(anchorEl);
    // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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
  }
)(withStyles(styles)(Editor));
