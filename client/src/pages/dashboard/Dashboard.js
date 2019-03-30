import React, {Component} from 'react';
import { connect } from "react-redux";
import "./Dashboard.css";
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import Gallery from "../../components/Gallery/Gallery";
import { createNewProject, openProject, getRecents, openRecentProject, removeRecentProject } from "../../store/actions";

import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import Header from "../../components/Header/Header";
import Slide from '@material-ui/core/Slide';

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

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

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
    };

    componentWillMount() {
        if (this.props.project === null) this.props.getRecents();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.project !== null) {
            this.props.history.push("/editor");
        }
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    snackbarOpen = (e) => {
        e.preventDefault();
        this.setState({ open: true });
    }

    snackbarClose = () => {
        this.setState({ open: false });
    };

    toggleModal = () => {
        this.setState({
            modalCreate: !this.state.modalCreate
        });
    }

    alert = (message) => {
        console.log(message)
    }

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    /**
     * Handles changing the location parameter for the project from browse button
     */
    handleLocation = location => {
        this.setState({ location });
    };

    /**
     * Open the file dialog and open an existing project
     */
    handleOpenProject = () => {
        this.props.openProject();
    };

    /**
     * Creates a new project
     */
    handleCreateNewProject = (e) => {
        e.preventDefault();
        if (this.state.name === "") return;
        if (this.state.location === "") return;

        const path = {
            title: this.state.name,
            location: this.state.location
        };

        this.setState({ open: false, name: '' });

        this.props.createNewProject(path);
    };

    handleOpenRecentProject = location => {
        this.props.openRecentProject(location);
    }

    handleTooltipClose = () => {}

    /**
     * Open the file dialog and select a folder to save the project
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

    handleRemoveRecent = (recent) => {
        this.props.removeRecentProject(recent);
    }

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
    recents: state.rootReducer.recents
});

export default connect(
    mapStateToProps,
    { createNewProject, openProject, getRecents, openRecentProject, removeRecentProject }
)(withStyles(styles)(Dashboard));