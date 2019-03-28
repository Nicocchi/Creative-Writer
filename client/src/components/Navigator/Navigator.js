import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import PermMediaOutlinedIcon from "@material-ui/icons/PhotoSizeSelectActual";
import SettingsIcon from "@material-ui/icons/Settings";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Book from "@material-ui/icons/Book";
import BookMark from "@material-ui/icons/Bookmark";
import SpeakerNotes from "@material-ui/icons/SpeakerNotes";
import Notes from "@material-ui/icons/Notes";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Info from "@material-ui/icons/Info";
import AddIcon from "@material-ui/icons/Add";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import { join } from "path";
import PersonAdd from "@material-ui/icons/PersonAdd";
import Person from "@material-ui/icons/Person";
import PersonOutline from "@material-ui/icons/PersonOutline";
import LandScape from "@material-ui/icons/Landscape";
import AddPhotoAlternative from "@material-ui/icons/AddPhotoAlternate";
import NavListItem from "./NavListItem";

const styles = theme => ({
  categoryHeader: {
    paddingTop: 16,
    paddingBottom: 16
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white
  },
  item: {
    paddingTop: 4,
    paddingBottom: 4,
    color: "rgba(255, 255, 255, 0.7)"
  },
  itemCategory: {
    backgroundColor: "#232f3e",
    boxShadow: "0 -1px 0 #404854 inset",
    paddingTop: 16,
    paddingBottom: 16
  },
  firebase: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.common.white
  },
  itemActionable: {
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.08)"
    }
  },
  itemActiveItem: {
    color: "#4fc3f7"
  },
  itemPrimary: {
    color: "inherit",
    fontSize: theme.typography.fontSize,
    "&$textDense": {
      fontSize: theme.typography.fontSize
    }
  },
  textDense: {},
  divider: {
    marginTop: theme.spacing.unit * 2
  }
});

function Navigator(props) {
  const { classes, ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          className={classNames(
            classes.firebase,
            classes.item,
            classes.itemCategory
          )}
        >
          Creative Writer
        </ListItem>
        <ListItem className={classNames(classes.item, classes.itemCategory)}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.itemPrimary
            }}
          >
            Project Overview
          </ListItemText>
        </ListItem>
        <ListItem className={classes.categoryHeader}>
          <ListItemText
            classes={{
              primary: classes.categoryHeaderPrimary
            }}
          >
            Library
          </ListItemText>
        </ListItem>
        <ListItem
          button
          dense
          className={classNames(
            classes.item,
            classes.itemActionable,
            true && classes.itemActiveItem
          )}
          onClick={() => props.history.push("/")}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.itemPrimary,
              textDense: classes.textDense
            }}
          >
            Dashboard
          </ListItemText>
        </ListItem>

          {/* Chapters */}
        <NavListItem
          type="single"
          title="Chapters"
          project={props.project}
          state={props.state}
          open="open1"
          isOpen={props.state.open1}
          openCollapse={props.openCollapse}
          handleChange={props.handleChangeChapter}
          handleAdd={props.handleAddChapter}
          current={props.currentChapter}
          array={props.project !== null ? props.project.project.chapters : []}
          icon={<LibraryBooks />}
          addIcon={<AddIcon />}
          focus={<Book />}
          unfocused={<BookMark />}
        />
        {/* Characters */}
          <NavListItem
              type="double"
              title="Characters"
              project={props.project}
              state={props.state}
              open="open2"
              isOpen={props.state.open2}
              openCollapse={props.openCollapse}
              openNestedCollapse={props.openCharCollapse}
              handleChange={props.handleChangeChar}
              handleAdd={props.handleAddCharacter}
              handleAddInfo={props.handleAddCharacterInfo}
              current={props.currentChar}
              currentInfo={props.currentInfo}
              array={props.project !== null ? props.project.project.characters : []}
              openArray={props.state.characterOpen}
              icon={<PeopleIcon />}
              addIcon={<PersonAdd />}
              focus={<PermMediaOutlinedIcon />}
              unfocused={<LandScape />}
          />

        {/* Settings */}
          <NavListItem
              type="double"
              title="Settings"
              project={props.project}
              state={props.state}
              open="open4"
              isOpen={props.state.open4}
              openCollapse={props.openCollapse}
              openNestedCollapse={props.openSetCollapse}
              handleChange={props.handleChangeSetting}
              handleAdd={props.handleAddSetting}
              handleAddInfo={props.handleAddSettingInfo}
              current={props.currentSetting}
              currentInfo={props.currentSetInfo}
              array={props.project !== null ? props.project.project.settings : []}
              openArray={props.state.settingOpen}
              icon={<LandScape />}
              addIcon={<AddPhotoAlternative />}
              focus={<PermMediaOutlinedIcon />}
              unfocused={<LandScape />}
          />

        {/* Notes */}
          <NavListItem
              type="single"
              title="Notes"
              project={props.project}
              state={props.state}
              open="open3"
              isOpen={props.state.open3}
              openCollapse={props.openCollapse}
              handleChange={props.handleChangeNote}
              handleAdd={props.handleAddNote}
              current={props.currentNote}
              array={props.project !== null ? props.project.project.notes : []}
              icon={<Notes />}
              addIcon={<AddIcon />}
              focus={<SpeakerNotes />}
              unfocused={<Notes />}
          />

        <Divider />
        <ListItem className={classes.categoryHeader}>
          <ListItemText
            classes={{
              primary: classes.categoryHeaderPrimary
            }}
          >
            Application
          </ListItemText>
        </ListItem>
        <ListItem
          button
          dense
          className={classNames(
            classes.item,
            classes.itemActionable,
            true && classes.itemActiveItem
          )}
          onClick={() => props.history.push("/")}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.itemPrimary,
              textDense: classes.textDense
            }}
          >
            Preferences
          </ListItemText>
        </ListItem>
        <ListItem
          button
          dense
          className={classNames(
            classes.item,
            classes.itemActionable,
            true && classes.itemActiveItem
          )}
          onClick={() => props.history.push("/")}
        >
          <ListItemIcon>
            <Info />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.itemPrimary,
              textDense: classes.textDense
            }}
          >
            About
          </ListItemText>
        </ListItem>
        <ListItem
          button
          dense
          className={classNames(
            classes.item,
            classes.itemActionable,
            true && classes.itemActiveItem
          )}
          onClick={() => props.history.push("/")}
        >
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.itemPrimary,
              textDense: classes.textDense
            }}
          >
            Quit
          </ListItemText>
        </ListItem>
      </List>
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navigator);
