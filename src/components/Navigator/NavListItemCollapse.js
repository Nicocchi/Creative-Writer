import React, { Component, Fragment } from "react";
import classNames from "classnames";
import SpeakerNotes from "@material-ui/icons/SpeakerNotes";
import Notes from "@material-ui/icons/Notes";
import AddIcon from "@material-ui/icons/Add";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { connect } from "react-redux";
import { updateName, deleteItem } from "../../store/actions";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@material-ui/core';

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
  },
    deleteItemIcon: {
      display: "none"
    },
    navItem: {
      "&:hover": {
          deleteItemIcon: {
              display: "inline-block"
          }
      }
    }
});

class NavListItemCollapse extends Component {
  state = {
    title: "",
    isEditing: false,
    isEditing2: false,
    id: null,
    ind: null
  };

  /**
   * Handles text input changing
   * @param name - Name of the input
   * @param event - Event of the input
   * @returns { * }
   */
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  /**
   * Sets the title of the menu item and sets menu item to edit true
   * @param title - title of the menu item
   * @param id - id of the menu item
   */
  handleEdit = (title, id) => {
    this.setState({ title: title, id: id, isEditing: !this.state.isEditing });
  };

  /**
   * Sets the title of the nested menu item and sets nested menu item to edit true
   * @param title - title of the menu item
   * @param id - id of the menu item
   * @param ind - id of the nested menu item
   */
  handleEdit2 = (title, id, ind) => {
    this.setState({
      title: title,
      id: id,
      ind: ind,
      isEditing: false,
      isEditing2: !this.state.isEditing2
    });
  };

  /**
   * Updates the selected menu items name
   * @param e - event
   * @param id - id of the menu item
   * @param type - type of the menu item (ex. chapter, character, etc.)
   * @param ind - id of the nested menu item
   */
  handleSubmit = (e, id, type, ind = 0) => {
    e.preventDefault();
    this.props.updateName(this.state.title, type, id, ind);
    this.setState({ isEditing: false, isEditing2: false });
  };

  /**
   * Deletes the selected menu item
   * @param e - event
   * @param id - id of the menu item
   * @param type - type of the menu item (ex. chapter, character, etc.)
   * @param ind - id of the nested menu item
   */
  handleDelete = (e, id, type, ind = 0) => {
    e.preventDefault();
    this.props.deleteItem(this.state.title, type, id, ind);
  };

  render() {
    const { classes } = this.props;

    return (
      <List disablePadding>
        {this.props.array.map((chap, i) => (
          <Fragment key={chap.id + i}>
            <div style={{ display: "flex" }}>
              <ListItem
                button
                dense
                className={classNames(
                  classes.item,
                  classes.itemActionable,
                  classes.navItem,
                  true && classes.itemActiveItem
                )}

                /* Executes changing the editor's contents to the clicked menu item */
                onClick={
                  this.props.type === "single"
                    ? () => this.props.handleChange(chap.id)
                    : () => {this.props.openNestedCollapse(i); console.log("NESTED ", chap.id)}
                }

                style={{ paddingLeft: "20%" }}
              >

                  {/* Changes icon to let the user know where they are in the menu */}
                <ListItemIcon style={{ marginRight: "10px" }}>
                  {this.props.type === "single"
                    ? this.props.current === chap.id
                      ? this.props.focus
                      : this.props.unfocused
                    : this.props.current === chap.id
                    ? this.props.focus
                    : this.props.unfocused}
                </ListItemIcon>

                <form
                  id="changeTitle"

                  /* Executes submitting the new updated menu item name */
                  onSubmit={
                    this.props.type === "single"
                      ? e => this.handleSubmit(e, chap.id, this.props.title)
                      : e => this.handleSubmit(e, chap.id, this.props.title)
                  }
                  className={classes.container}
                  noValidate
                  autoComplete="off"
                >

                    {/* Display the editing form or the regular menu item */}
                  {(this.state.isEditing &&
                    this.state.id === chap.id &&
                    this.props.type === "single") ||
                  (this.state.isEditing &&
                    this.state.id === chap.id &&
                    this.props.type === "double") ? (

                    <input
                      type="text"
                      defaultValue={this.state.title}
                      onChange={this.handleChange("title")}
                    />
                  ) : (
                    <ListItemText
                      onDoubleClick={
                        this.props.type === "single"
                          ? () => this.handleEdit(chap.title, chap.id)
                          : () => this.handleEdit(chap.name, chap.id)
                      }
                      classes={{
                        primary: classes.itemPrimary,
                        textDense: classes.textDense
                      }}
                    >
                      {this.props.type === "single" ? chap.title : chap.name}
                    </ListItemText>
                  )}
                </form>

                {this.props.type === "double" ? (
                  this.props.openArray[i].isOpen ? (
                    <ExpandLess dense />
                  ) : (
                    <ExpandMore dense />
                  )
                ) : null}
              </ListItem>

              <DeleteIcon
                style={{ zIndex: "3000"}}
                classes={{
                    primary: classes.deleteItemIcon
                }}
                onClick={e =>
                  this.props.type === "single"
                    ? this.handleDelete(e, chap.id, this.props.title)
                    : this.handleDelete(e, chap.id, this.props.title)
                }
              />
            </div>


            {this.props.type === "double" ? (
              <Collapse
                in={this.props.openArray[i].isOpen && !this.state.isEditing}
                timeout="auto"
                unmountOnExit
              >
                <List disablePadding>
                  {chap !== null
                    ? chap.info.map((info, j) => (
                        <div key={info.id + j} style={{display: "flex"}}>
                            <ListItem
                              button
                              dense
                              className={classNames(
                                classes.item,
                                classes.itemActionable,
                                true && classes.itemActiveItem
                              )}
                              onClick={() => {this.props.handleChange(chap.id, info.id); console.log("CHAP", this.props)}}
                              onDoubleClick={() =>
                                this.handleEdit2(info.title, chap.id, info.id)
                              }
                              style={{ paddingLeft: "24%" }}
                            >
                              <ListItemIcon>
                                {this.props.current === chap.id &&
                                this.props.currentInfo === info.id ? (
                                  <SpeakerNotes />
                                ) : (
                                  <Notes />
                                )}
                              </ListItemIcon>
                              <form
                                id="changeTitle"
                                onSubmit={e =>
                                  this.handleSubmit(e, chap.id, this.props.title2, info.id)
                                }
                                className={classes.container}
                                noValidate
                                autoComplete="off"
                              >
                                {this.state.isEditing2 &&
                                this.state.id === chap.id &&
                                this.state.ind === info.id ? (
                                  <input
                                    type="text"
                                    defaultValue={this.state.title}
                                    onChange={this.handleChange("title")}
                                  />
                                ) : (
                                  <ListItemText
                                    classes={{
                                      primary: classes.itemPrimary,
                                      textDense: classes.textDense
                                    }}
                                  >
                                    {info.title}
                                  </ListItemText>
                                )}
                              </form>
                            </ListItem>
                            <DeleteIcon

                                onClick={e =>
                                    this.handleDelete(e, chap.id, this.props.title2, info.id)
                                }
                            />
                        </div>
                      ))
                    : null}
                </List>
                <List disablePadding>
                  <ListItem
                    button
                    dense
                    className={classNames(
                      classes.item,
                      classes.itemActionable,
                      true && classes.itemActiveItem
                    )}
                    onClick={() => this.props.handleAddInfo(i)}
                    style={{ paddingLeft: "55%" }}
                  >
                    <ListItemIcon>
                      <AddIcon />
                    </ListItemIcon>
                    <ListItemText
                      classes={{
                        primary: classes.itemPrimary,
                        textDense: classes.textDense
                      }}
                    />
                  </ListItem>
                </List>
              </Collapse>
            ) : null}
          </Fragment>
        ))}
      </List>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { updateName, deleteItem }
)(withStyles(styles)(NavListItemCollapse));
