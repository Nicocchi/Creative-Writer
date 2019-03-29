import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SpeakerNotes from "@material-ui/icons/SpeakerNotes";
import Notes from "@material-ui/icons/Notes";
import AddIcon from "@material-ui/icons/Add";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import { connect } from "react-redux";
import { updateName, deleteItem } from "../../store/actions";
import DeleteIcon from "@material-ui/icons/Delete";

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

class NavListItemCollapse extends Component {
  state = {
    title: "",
    isEditing: false,
    isEditing2: false,
    id: null,
    ind: null
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleEdit = (title, id) => {
    this.setState({ title: title, id: id, isEditing: !this.state.isEditing });
  };

  handleEdit2 = (title, id, ind) => {
    this.setState({
      title: title,
      id: id,
      ind: ind,
      isEditing: false,
      isEditing2: !this.state.isEditing2
    });
  };

  handleSubmit = (e, id, type, ind = 0) => {
    e.preventDefault();
    console.log("TITLE => ", type, id, ind, this.state.title);
    this.props.updateName(this.state.title, type, id, ind);
    this.setState({ isEditing: false, isEditing2: false });
  };

  handleDelete = (e, id, type, ind = 0) => {
    e.preventDefault();
    this.props.deleteItem(this.state.title, type, id, ind);
  };

  render() {
    const { classes } = this.props;

    return (
      <List disablePadding>
        {this.props.array.map((chap, i) => (
          <Fragment>
            <div style={{ display: "flex" }}>
              <ListItem
                button
                dense
                key={i}
                className={classNames(
                  classes.item,
                  classes.itemActionable,
                  true && classes.itemActiveItem
                )}

                /* Executes changing the editor's contents to the clicked menu item */
                onClick={
                  this.props.type === "single"
                    ? () => this.props.handleChange(chap.id)
                    : () => this.props.openNestedCollapse(i)
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
                style={{ zIndex: "3000" }}
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
                        <div style={{display: "flex"}}>
                            <ListItem
                              button
                              dense
                              key={j}
                              className={classNames(
                                classes.item,
                                classes.itemActionable,
                                true && classes.itemActiveItem
                              )}
                              onClick={() => this.props.handleChange(chap.id, info.id)}
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
