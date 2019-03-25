import React, {Component} from 'react';
import { connect } from "react-redux";
import "./Dashboard.css";
import {
    Button,
    Label,
    FormGroup,
    Input,
    Modal, ModalBody, FormText
} from "reactstrap";
import Gallery from "../../components/Gallery/Gallery";
import { createNewProject } from "../../store/actions";

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
import Icon from "@material-ui/core/Icon";

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
});

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

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.project !== null) {
            this.props.history.push("/editor");
        }
    }

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

        this.setState({ modalDemo: false, name: '' });

        this.props.createNewProject(path);
    };

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

    render() {
        return (
            <div className={"dashboard container"}>
                <div className={"dashboard header"}>
                    <h1>Dashboard</h1>
                </div>
                <div>
                    <Button color="primary" onClick={this.toggleModal}>
                        <i className="tim-icons icon-pencil" style={{marginRight: "10px"}}>
                        </i>Start Writing!
                    </Button>

                    <Modal
                        modalClassName="modal-black"
                        isOpen={this.state.modalCreate}
                        toggle={this.toggleModal}
                    >
                        <h3 className="modal-title" id="exampleModalLabel" style={{textAlign: "center", marginTop: "20px", marginBottom: "20px"}}>
                            Create New Project
                        </h3>
                        <form style={{margin: "1%"}}>
                            <FormGroup>
                                <Label for="exampleEmail">Project Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Enter project name"
                                    defaultValue={this.state.name}
                                    onChange={this.handleInput}
                                />
                                <FormText style={{color: "red !important"}}>
                                    You must enter a project name
                                </FormText>
                            </FormGroup>
                            <FormGroup>
                                <Label for="location">Project Folder</Label>
                                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                    <Input
                                        type="text"
                                        name="location"
                                        id="location"
                                        placeholder="Enter project location"
                                        autoComplete="off"
                                        style={{width: "90%", marginRight: "10px"}}
                                        defaultValue={this.state.location}
                                        onChange={this.handleInput}
                                    />
                                    <Button onClick={(e) => this.openFile(e)} color="primary" type="submit">
                                        Browse
                                    </Button>
                                </div>
                            </FormGroup>
                            <FormGroup style={{display: "flex", justifyContent: "center"}}>
                                <Button onClick={e => this.handleCreateNewProject(e)} color="primary" type="submit">
                                    Start Writing!
                                </Button>
                            </FormGroup>

                        </form>
                    </Modal>
                </div>
                <Button onClick={e => this.snackbarOpen(e)}>
                    Open success snackbar
                </Button>
                <Gallery name="Recent Projects" clickHandler={this.alert} list={[{name: "Cras justo odio"}, {name: "Dapibus ac facilisis in"}, {name: "Morbi leo risus"}, {name: "Porta ac consectetur ac"}, {name: "Vestibulum at eros"}]}/>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    open={this.state.open}
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
    project: state.rootReducer.project
});

export default connect(
    mapStateToProps,
    { createNewProject }
)(Dashboard);