import React, {Component} from 'react';
import { connect } from "react-redux";
import { withStyles, Button, IconButton, Snackbar, SnackbarContent, Slide, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import WarningIcon from '@material-ui/icons/Warning';

import Header from "../../components/Header/Header";
import Gallery from "../../components/Gallery/Gallery";
import "./Dashboard.css";
import { createNewProject, openProject, getRecents, openRecentProject, removeRecentProject } from "../../store/actions";

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const styles = theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

/**
 * Transition animation for Snackbar
 * @param props - props
 * @returns {*}
 * @constructor
 */
function Transition(props) {
    return <Slide direction="up" {...props} />;
}

/**
 * Content of Snackbar
 * @param props - props
 * @returns {*}
 * @constructor
 */
function MySnackbarContent(props) {
    const { className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={styles.message}>
            <Icon style={{marginRight: "20px"}} className={classNames(styles.icon, styles.iconVariant)} />
                    {message}
        </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={styles.close}
                    onClick={onClose}
                >
                    <CloseIcon className={styles.icon} />
                </IconButton>,
            ]}
            {...other}
        />
    );
}

const MySnackbarContentWrapper = MySnackbarContent;

class Dashboard extends Component {
    state = {
        modalCreate: false,
        name: "",
        location: "",
        open: false,
        historyUrl: "/",
        error: false,
        error2: false,
    };

    /**
     * Get recents if project is null
     */
    componentWillMount() {
        if (this.props.project === null) this.props.getRecents();
    }

    /**
     * If project isn't null, push to editor
     * @param nextProps
     * @param nextContext
     */
    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.project !== null) {
            this.props.history.push(nextProps.historyUrl);
        }
    }

    /**
     * Open new project modal
     */
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    /**
     * Close new project modal
     */
    handleClose = () => {
        this.setState({ open: false });
    };

    /**
     * Open snackbar
     * @param e
     */
    snackbarOpen = (e) => {
        e.preventDefault();
        this.setState({ open: true });
    };

    /**
     * Close snackbar
     */
    snackbarClose = () => {
        this.setState({ open: false });
    };

    /**
     * Handles text input in creating project modal
     * @param e
     */
    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value,
            error: false
        })
    };

    /**
     * Handles changing the location parameter for the project from browse button
     * @param location
     */
    handleLocation = location => {
        this.setState({ location, error2: false });
    };

    /**
     * Open the file dialog and open an existing project
     */
    handleOpenProject = () => {
        this.props.openProject();
    };

    /**
     * Creates a new project
     * @param e
     */
    handleCreateNewProject = (e) => {
        e.preventDefault();
        if (this.state.name === "") {
            this.setState({ error: true }); 
            return;
        };
        if (this.state.location === "") {
            this.setState({ error2: true }); 
            return;
        };;

        const path = {
            title: this.state.name,
            location: this.state.location
        };

        this.setState({ open: false, name: '', error: false });

        this.props.createNewProject(path);
    };

    /**
     * Open recent project
     * @param location - Folder to save project in
     */
    handleOpenRecentProject = location => {
        this.props.openRecentProject(location);
    };

    handleTooltipClose = () => {};

    /**
     * Open the file dialog and select a folder to save the project
     * @param e
     */
    openFile = (e) => {
        e.preventDefault();
        const loc = window.IpcRenderer.sendSync("openFolder");
        if (loc === null || loc === undefined) {
            return;
        }

        console.log("LOCATION => ", loc[0]);

        return this.handleLocation(loc[0]);
    };

    /**
     * Removes a recent project
     * @param recent - Recent project
     */
    handleRemoveRecent = (recent) => {
        this.props.removeRecentProject(recent);
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={"dashboard container"}>
                <Header project={this.props.project} route={this.props} handleTooltipClose={this.handleTooltipClose}/>
                <div className={"dashboard header"}>
                    <h1>Dashboard</h1>
                </div>
                <div>
                    {/*<Button color="primary" onClick={this.toggleModal}>*/}
                        {/*<i className="tim-icons icon-pencil" style={{marginRight: "10px"}}>*/}
                        {/*</i>Start Writing!*/}
                    {/*</Button>*/}
                    <Button onClick={this.handleOpenProject} variant="contained" color="secondary" className={classes.button}>
                        Open Project
                    </Button>
                    <Button onClick={() => this.handleClickOpen()} variant="contained" color="secondary" className={classes.button}>
                        Start Writing!
                    </Button>

                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"
                        TransitionComponent={Transition}
                        keepMounted
                        maxWidth="sm"
                        fullWidth={true}
                    >
                        <DialogTitle id="form-dialog-title">Create New Project</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Start creating your project!
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                name="name"
                                label="Book Title"
                                type="text"
                                fullWidth
                                defaultValue={this.state.name}
                                onChange={this.handleInput}
                            />
                            {
                                this.state.error ? <div style={{color: "red"}}>
                                *Project needs a title!
                            </div> : null
                            }
                            <TextField
                                autoFocus
                                margin="dense"
                                id="location"
                                location="location"
                                label="Project Folder"
                                type="text"
                                fullWidth
                                // defaultValue={this.state.location}
                                value={this.state.location}
                                onChange={this.handleInput}
                            />
                            {
                                this.state.error2 ? <div style={{color: "red"}}>
                                *Must select project a folder to save to!
                            </div> : null
                            }
                            
                            <Button onClick={(e) => this.openFile(e)} variant="contained" color="secondary" className={classes.button}>
                                Browse
                            </Button>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={e => this.handleCreateNewProject(e)} color="primary">
                                Create
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                {/*<Button onClick={e => this.snackbarOpen(e)}>*/}
                    {/*Open success snackbar*/}
                {/*</Button>*/}
                <Gallery name="Recent Projects" clickHandler={this.handleOpenRecentProject} removeHandler={this.handleRemoveRecent} list={this.props.recents !== null ? this.props.recents : [{name: "No project"}]}/>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    open={this.state.open1}
                    autoHideDuration={2000}
                    onClose={this.snackbarClose}
                >
                    <MySnackbarContentWrapper
                        onClose={this.snackbarClose}
                        variant="success"
                        message="This is a success message!"
                    />
                </Snackbar>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    project: state.rootReducer.project,
    recents: state.rootReducer.recents,
    historyUrl: state.rootReducer.history
});

export default connect(
    mapStateToProps,
    { createNewProject, openProject, getRecents, openRecentProject, removeRecentProject }
)(withStyles(styles)(Dashboard));
