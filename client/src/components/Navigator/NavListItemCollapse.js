import React, { Component, Fragment } from "react";
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

class NavListItemCollapse extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return (
                    <List disablePadding>
                        {this.props.array.map((chap, i) => (
                            <Fragment>
                                <ListItem
                                    button
                                    dense
                                    key={i}
                                    className={classNames(
                                        classes.item,
                                        classes.itemActionable,
                                        true && classes.itemActiveItem
                                    )}
                                    onClick={this.props.type === 'single' ? () => this.props.handleChange(chap.id) : () => this.props.openNestedCollapse(i)}
                                    style={{ paddingLeft: "20%" }}
                                >
                                    <ListItemIcon>
                                        {this.props.type === 'single' ? this.props.current === i + 1 ? this.props.focus : this.props.unfocused :
                                            this.props.current === i ? this.props.focus : this.props.unfocused
                                        }
                                    </ListItemIcon>
                                    <ListItemText
                                        classes={{
                                            primary: classes.itemPrimary,
                                            textDense: classes.textDense
                                        }}
                                    >
                                        { this.props.type === 'single' ? chap.title : chap.name }
                                    </ListItemText>
                                    { this.props.type === 'double' ? this.props.openArray[i].isOpen ? <ExpandLess dense /> : <ExpandMore dense /> : null}
                                </ListItem>

                                {
                                    this.props.type === 'double' ?
                                        <Collapse
                                            in={this.props.openArray[i].isOpen}
                                            timeout="auto"
                                            unmountOnExit
                                        >
                                            <List disablePadding>
                                                {chap !== null
                                                    ? chap.info.map((info, j) => (
                                                        <ListItem
                                                            button
                                                            dense
                                                            key={j}
                                                            className={classNames(
                                                                classes.item,
                                                                classes.itemActionable,
                                                                true && classes.itemActiveItem
                                                            )}
                                                            onClick={() => this.props.handleChange(i, j)}
                                                            style={{ paddingLeft: "24%" }}
                                                        >
                                                            <ListItemIcon>
                                                                {this.props.current === i &&
                                                                this.props.currentInfo === j ? (
                                                                    <SpeakerNotes />
                                                                ) : (
                                                                    <Notes />
                                                                )}
                                                            </ListItemIcon>
                                                            <ListItemText
                                                                classes={{
                                                                    primary: classes.itemPrimary,
                                                                    textDense: classes.textDense
                                                                }}
                                                            >
                                                                {info.title}
                                                            </ListItemText>
                                                        </ListItem>
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
                                        :
                                        null
                                }
                            </Fragment>


                            ))
                        }
                    </List>
        )
    }
}

export default withStyles(styles)(NavListItemCollapse)