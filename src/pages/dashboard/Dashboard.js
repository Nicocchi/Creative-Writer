import React, {Component} from 'react';
import { connect } from "react-redux";

import { withStyles, IconButton } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


import Header from "../../components/Header/Header";
import Gallery from "../../components/Gallery/Gallery";
import "./Dashboard.css";

import { createNewProject, openProject, getRecents, openRecentProject, removeRecentProject } from "../../store/actions";

const styles = theme => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    button: {
        margin: 5
    }
  });
  
//   const DialogTitle = withStyles(styles)(props => {
//     const { children, classes, onClose } = props;
//     return (
//       <MuiDialogTitle disableTypography className={classes.root}>
//         <Typography variant="h6">{children}</Typography>
//         {onClose ? (
//           <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
//             <CloseIcon />
//           </IconButton>
//         ) : null}
//       </MuiDialogTitle>
//     );
//   });
  
//   const DialogContent = withStyles(theme => ({
//     root: {
//       padding: theme.spacing(2),
//     },
//   }))(MuiDialogContent);
  
//   const DialogActions = withStyles(theme => ({
//     root: {
//       margin: 0,
//       padding: theme.spacing(1),
//     },
//   }))(MuiDialogActions);

class Dashboard extends Component {
    state = {
        modalCreate: false,
        name: "",
        location: "",
        author: "",
        open: false,
        historyUrl: "/",
        error: false,
        error2: false,
        type: "Novel"
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

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
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
        let author = this.state.author;
        let type = this.state.type;

        if (this.state.name === "") {
            this.setState({ error: true }); 
            return;
        };
        if (this.state.location === "") {
            this.setState({ error2: true }); 
            return;
        };

        if (this.state.author === "") {
            author = "Unknown";
        }

        if (this.state.type === "") {
            type = "Novel";
        }

        const path = {
            title: this.state.name,
            location: this.state.location,
            author: author,
            type: type
        };

        console.log(path);

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
                    <Button onClick={() => this.handleClickOpen()} variant="contained" color="primary" className={classes.button}>
                        Start Writing!
                    </Button>

                    <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">New Project</DialogTitle>
                        <DialogContent>
                        <DialogContentText style={{fontStyle: "italic"}}>
                            "The first draft is just you telling yourself the story." - Terry Pratchett
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            name="name"
                            label="Title"
                            type="text"
                            fullWidth
                            defaultValue={this.state.name}
                            onChange={this.handleInput}
                            required
                        />
                        {
                            this.state.error ? <div style={{color: "red"}}>
                            *Project needs a title!
                            </div> : null
                        }
                        <TextField
                            margin="dense"
                            type="text"
                            id="author"
                            name="author"
                            label="Author"
                            fullWidth
                            defaultValue={this.state.author}
                            onChange={this.handleInput}
                        />
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="type-helper">Type</InputLabel>
                            <Select
                            value={this.state.type}
                            onChange={this.handleChange}
                            fullWidth
                            input={<Input name="type" id="type-helper" />}
                            >
                            <MenuItem value="" disabled>
                                <em>Type</em>
                            </MenuItem>
                            <MenuItem value={"Novel"}>Novel</MenuItem>
                            </Select>
                            <FormHelperText>Type of project</FormHelperText>
                        </FormControl>
                        <TextField
                            margin="dense"
                            id="location"
                            location="location"
                            label="Project Folder"
                            type="text"
                            fullWidth
                            value={this.state.location}
                            onChange={this.handleInput}
                            required
                        />
                        {
                            this.state.error2 ? <div style={{color: "red"}}>
                            *Must select project a folder to save to!
                            </div> : null
                        }
                        <Button onClick={(e) => this.openFile(e)} color="primary">
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
