import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import PermMediaOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActual';
import PublicIcon from '@material-ui/icons/Public';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import TimerIcon from '@material-ui/icons/Timer';
import SettingsIcon from '@material-ui/icons/Settings';
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup';
import LibraryBooks from '@material-ui/icons/LibraryBooks';


import Book from '@material-ui/icons/Book';
import BookMark from '@material-ui/icons/Bookmark';
import SpeakerNotes from '@material-ui/icons/SpeakerNotes';
import Notes from '@material-ui/icons/Notes';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Info from '@material-ui/icons/Info';
import AddIcon from '@material-ui/icons/Add';
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";

const categories = [
    {
        id: 'Develop',
        children: [
            { id: 'Authentication', icon: <PeopleIcon />, active: true },
            { id: 'Database', icon: <DnsRoundedIcon /> },
            { id: 'Storage', icon: <PermMediaOutlinedIcon /> },
            { id: 'Hosting', icon: <PublicIcon /> },
            { id: 'Functions', icon: <SettingsEthernetIcon /> },
            { id: 'ML Kit', icon: <SettingsInputComponentIcon /> },
        ],
    },
    {
        id: 'Quality',
        children: [
            { id: 'Analytics', icon: <SettingsIcon /> },
            { id: 'Performance', icon: <TimerIcon /> },
            { id: 'Test Lab', icon: <PhonelinkSetupIcon /> },
        ],
    },
];

const styles = theme => ({
    categoryHeader: {
        paddingTop: 16,
        paddingBottom: 16,
    },
    categoryHeaderPrimary: {
        color: theme.palette.common.white,
    },
    item: {
        paddingTop: 4,
        paddingBottom: 4,
        color: 'rgba(255, 255, 255, 0.7)',
    },
    itemCategory: {
        backgroundColor: '#232f3e',
        boxShadow: '0 -1px 0 #404854 inset',
        paddingTop: 16,
        paddingBottom: 16,
    },
    firebase: {
        fontSize: 24,
        fontFamily: theme.typography.fontFamily,
        color: theme.palette.common.white,
    },
    itemActionable: {
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
        },
    },
    itemActiveItem: {
        color: '#4fc3f7',
    },
    itemPrimary: {
        color: 'inherit',
        fontSize: theme.typography.fontSize,
        '&$textDense': {
            fontSize: theme.typography.fontSize,
        },
    },
    textDense: {},
    divider: {
        marginTop: theme.spacing.unit * 2,
    },
});

function Navigator(props) {
    const { classes, ...other } = props;

    return (
        <Drawer variant="permanent" {...other}>
            <List disablePadding>
                <ListItem className={classNames(classes.firebase, classes.item, classes.itemCategory)}>
                    Creative Writer
                </ListItem>
                <ListItem className={classNames(classes.item, classes.itemCategory)}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText
                        classes={{
                            primary: classes.itemPrimary,
                        }}
                    >
                        Project Overview
                    </ListItemText>
                </ListItem>
                <ListItem className={classes.categoryHeader}>
                    <ListItemText
                        classes={{
                            primary: classes.categoryHeaderPrimary,
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
                        true && classes.itemActiveItem,
                    )}
                    onClick={() => props.history.push("/")}
                >
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <ListItemText
                        classes={{
                            primary: classes.itemPrimary,
                            textDense: classes.textDense,
                        }}
                    >
                        Dashboard
                    </ListItemText>
                </ListItem>
                <ListItem
                    button
                    dense
                    className={classNames(
                        classes.item,
                        classes.itemActionable,
                        true && classes.itemActiveItem,
                    )}
                    onClick={() => props.openCollapse("open1")}
                >
                    <ListItemIcon><LibraryBooks /></ListItemIcon>
                    <ListItemText
                        classes={{
                            primary: classes.itemPrimary,
                            textDense: classes.textDense,
                        }}
                    >
                        Chapters
                    </ListItemText>
                    {props.state.open1 ? <ExpandLess dense /> : <ExpandMore dense />}
                </ListItem>
                <Collapse in={props.state.open1} timeout="auto" unmountOnExit>
                    <List disablePadding>
                        {
                            props.project !== null ?
                                props.project.project.chapters.map((chap, i) => (
                                    <ListItem
                                        button
                                        dense
                                        key={i}
                                        className={classNames(
                                            classes.item,
                                            classes.itemActionable,
                                            true && classes.itemActiveItem,
                                        )}
                                        onClick={() => props.handleChangeChapter(chap.id)}
                                        style={{paddingLeft: "20%"}}
                                    >
                                        <ListItemIcon>
                                            {
                                                props.currentChapter === i + 1 ?
                                                    <Book /> : <BookMark />
                                            }
                                        </ListItemIcon>
                                        <ListItemText
                                            classes={{
                                                primary: classes.itemPrimary,
                                                textDense: classes.textDense,
                                            }}
                                        >
                                            {chap.title}
                                        </ListItemText>
                                    </ListItem>
                                )) : null
                        }
                        <List disablePadding>
                            <ListItem
                                button
                                dense
                                className={classNames(
                                    classes.item,
                                    classes.itemActionable,
                                    true && classes.itemActiveItem,
                                )}
                                onClick={props.handleAddChapter}
                                style={{paddingLeft: "45%"}}
                            >
                                <ListItemIcon><AddIcon /></ListItemIcon>
                                <ListItemText
                                    classes={{
                                        primary: classes.itemPrimary,
                                        textDense: classes.textDense,
                                    }}
                                >
                                </ListItemText>
                            </ListItem>
                        </List>

                    </List>
                </Collapse>
                {/* Characters */}
                <ListItem
                    button
                    dense
                    className={classNames(
                        classes.item,
                        classes.itemActionable,
                        true && classes.itemActiveItem,
                    )}
                    onClick={() => props.openCollapse("open2")}
                >
                    <ListItemIcon><PeopleIcon /></ListItemIcon>
                    <ListItemText
                        classes={{
                            primary: classes.itemPrimary,
                            textDense: classes.textDense,
                        }}
                    >
                        Characters
                    </ListItemText>
                    {props.state.open2 ? <ExpandLess dense /> : <ExpandMore dense />}
                </ListItem>
                <Collapse in={props.state.open2} timeout="auto" unmountOnExit>
                    <List disablePadding>
                        <ListItem
                            button
                            dense
                            className={classNames(
                                classes.item,
                                classes.itemActionable,
                                true && classes.itemActiveItem,
                            )}
                            style={{paddingLeft: "20%"}}
                        >
                            <ListItemIcon><PeopleIcon /></ListItemIcon>
                            <ListItemText
                                classes={{
                                    primary: classes.itemPrimary,
                                    textDense: classes.textDense,
                                }}
                            >
                                John Doe
                            </ListItemText>
                        </ListItem>
                        <List disablePadding>
                            <ListItem
                                button
                                dense
                                className={classNames(
                                    classes.item,
                                    classes.itemActionable,
                                    true && classes.itemActiveItem,
                                )}
                                onClick={props.handleAddChapter}
                                style={{paddingLeft: "45%"}}
                            >
                                <ListItemIcon><AddIcon /></ListItemIcon>
                                <ListItemText
                                    classes={{
                                        primary: classes.itemPrimary,
                                        textDense: classes.textDense,
                                    }}
                                >
                                </ListItemText>
                            </ListItem>
                        </List>
                    </List>
                </Collapse>

                {/* Settings */}
                <ListItem
                    button
                    dense
                    className={classNames(
                        classes.item,
                        classes.itemActionable,
                        true && classes.itemActiveItem,
                    )}
                    onClick={() => props.openCollapse("open4")}
                >
                    <ListItemIcon><PermMediaOutlinedIcon /></ListItemIcon>
                    <ListItemText
                        classes={{
                            primary: classes.itemPrimary,
                            textDense: classes.textDense,
                        }}
                    >
                        Settings
                    </ListItemText>
                    {props.state.open4 ? <ExpandLess dense /> : <ExpandMore dense />}
                </ListItem>
                <Collapse in={props.state.open4} timeout="auto" unmountOnExit>
                    <List disablePadding>
                        <ListItem
                            button
                            dense
                            className={classNames(
                                classes.item,
                                classes.itemActionable,
                                true && classes.itemActiveItem,
                            )}
                            style={{paddingLeft: "20%"}}
                        >
                            <ListItemIcon><PermMediaOutlinedIcon /></ListItemIcon>
                            <ListItemText
                                classes={{
                                    primary: classes.itemPrimary,
                                    textDense: classes.textDense,
                                }}
                            >
                                Planetarium
                            </ListItemText>
                        </ListItem>
                        <List disablePadding>
                            <ListItem
                                button
                                dense
                                className={classNames(
                                    classes.item,
                                    classes.itemActionable,
                                    true && classes.itemActiveItem,
                                )}
                                onClick={props.handleAddChapter}
                                style={{paddingLeft: "45%"}}
                            >
                                <ListItemIcon><AddIcon /></ListItemIcon>
                                <ListItemText
                                    classes={{
                                        primary: classes.itemPrimary,
                                        textDense: classes.textDense,
                                    }}
                                >
                                </ListItemText>
                            </ListItem>
                        </List>
                    </List>
                </Collapse>

                {/* Notes */}
                <ListItem
                    button
                    dense
                    className={classNames(
                        classes.item,
                        classes.itemActionable,
                        true && classes.itemActiveItem,
                    )}
                    onClick={() => props.openCollapse("open3")}
                >
                    <ListItemIcon><Notes /></ListItemIcon>
                    <ListItemText
                        classes={{
                            primary: classes.itemPrimary,
                            textDense: classes.textDense,
                        }}
                    >
                        Notes
                    </ListItemText>
                    {props.state.open3 ? <ExpandLess dense /> : <ExpandMore dense />}
                </ListItem>
                <Collapse in={props.state.open3} timeout="auto" unmountOnExit>
                    <List disablePadding>
                        <ListItem
                            button
                            dense
                            className={classNames(
                                classes.item,
                                classes.itemActionable,
                                true && classes.itemActiveItem,
                            )}
                            style={{paddingLeft: "20%"}}
                        >
                            <ListItemIcon><SpeakerNotes /></ListItemIcon>
                            <ListItemText
                                classes={{
                                    primary: classes.itemPrimary,
                                    textDense: classes.textDense,
                                }}
                            >
                                Ideas
                            </ListItemText>
                        </ListItem>
                        <List disablePadding>
                            <ListItem
                                button
                                dense
                                className={classNames(
                                    classes.item,
                                    classes.itemActionable,
                                    true && classes.itemActiveItem,
                                )}
                                onClick={props.handleAddChapter}
                                style={{paddingLeft: "45%"}}
                            >
                                <ListItemIcon><AddIcon /></ListItemIcon>
                                <ListItemText
                                    classes={{
                                        primary: classes.itemPrimary,
                                        textDense: classes.textDense,
                                    }}
                                >
                                </ListItemText>
                            </ListItem>
                        </List>
                    </List>
                </Collapse>

                <Divider/>
                <ListItem className={classes.categoryHeader}>
                    <ListItemText
                        classes={{
                            primary: classes.categoryHeaderPrimary,
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
                        true && classes.itemActiveItem,
                    )}
                    onClick={() => props.history.push("/")}
                >
                    <ListItemIcon><SettingsIcon /></ListItemIcon>
                    <ListItemText
                        classes={{
                            primary: classes.itemPrimary,
                            textDense: classes.textDense,
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
                        true && classes.itemActiveItem,
                    )}
                    onClick={() => props.history.push("/")}
                >
                    <ListItemIcon><Info /></ListItemIcon>
                    <ListItemText
                        classes={{
                            primary: classes.itemPrimary,
                            textDense: classes.textDense,
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
                        true && classes.itemActiveItem,
                    )}
                    onClick={() => props.history.push("/")}
                >
                    <ListItemIcon><ExitToApp /></ListItemIcon>
                    <ListItemText
                        classes={{
                            primary: classes.itemPrimary,
                            textDense: classes.textDense,
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
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);