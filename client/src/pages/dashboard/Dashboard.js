import React, {Component} from 'react';
import "./Dashboard.css";
import {
    Button,
    Label,
    FormGroup,
    Input,
    Modal, ModalBody, FormText
} from "reactstrap";
import Gallery from "../../components/Gallery/Gallery";

class Dashboard extends Component {
    state = {
        modalDemo: false,
    };

    toggleModalDemo = () => {
        this.setState({
            modalDemo: !this.state.modalDemo
        });
    }

    alert = (message) => {
        console.log(message)
    }

    render() {
        return (
            <div className={"dashboard container"}>
                <div className={"dashboard header"}>
                    <h1>Dashboard</h1>
                </div>
                <div>
                    <Button color="primary" onClick={this.toggleModalDemo}>
                        <i className="tim-icons icon-pencil" style={{marginRight: "10px"}}>
                        </i>Start Writing!
                    </Button>
                    {/*<Button color="primary" onClick={() => this.props.history.push('/editor')}>*/}
                        {/*Skip to editor d*/}
                    {/*</Button>*/}
                    <Modal isOpen={this.state.modalDemo} toggle={this.toggleModalDemo}>
                        <div className="modal-header"  style={{border: 0, backgroundColor: "#1f2251", display: "flex", justifyContent: "center"}}>
                            <h3 className="modal-title" id="exampleModalLabel" style={{color: "hsla(0,0%,100%,.8)"}}>
                                Create New Project
                            </h3>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-hidden="true"
                                onClick={this.toggleModalDemo}
                            >
                                <i className="tim-icons icon-simple-remove" />
                            </button>
                        </div>
                        <ModalBody style={{ backgroundColor: "#1f2251", color: "hsla(0,0%,100%,.8)"}}>
                            <form>
                                <FormGroup>
                                    <Label for="exampleEmail">Project Name</Label>
                                    <Input
                                        type="text"
                                        name="projectname"
                                        id="projectName"
                                        placeholder="Enter project name"
                                    />
                                    <FormText color="muted">
                                        You must enter a project name
                                    </FormText>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="examplePassword">Password</Label>
                                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                    <Input
                                        type="password"
                                        name="password"
                                        id="examplePassword"
                                        placeholder="Password"
                                        autoComplete="off"
                                        style={{width: "90%", marginRight: "10px"}}
                                    />
                                    <Button color="primary" type="submit">
                                    Browse
                                </Button>
                                    </div>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox" />{' '}
                                        Check me out
                                        <span className="form-check-sign">
                                            <span className="check"></span>
                                        </span>
                                    </Label>
                                </FormGroup>
                                <FormGroup style={{display: "flex", justifyContent: "center"}}>
                                    <Button color="primary" type="submit">
                                        Start Writing!
                                    </Button>
                                </FormGroup>

                            </form>
                        </ModalBody>
                    </Modal>
                </div>
                <Gallery name="Recent Projects" clickHandler={this.alert} list={[{name: "Cras justo odio"}, {name: "Dapibus ac facilisis in"}, {name: "Morbi leo risus"}, {name: "Porta ac consectetur ac"}, {name: "Vestibulum at eros"}]}/>
                {/*<List name="Recent Projects" list={[{name: "Cras justo odio"}, {name: "Dapibus ac facilisis in"}, {name: "Morbi leo risus"}, {name: "Porta ac consectetur ac"}, {name: "Vestibulum at eros"}]}/>*/}
            </div>
        );
    }
}

export default Dashboard;