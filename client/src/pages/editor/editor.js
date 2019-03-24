import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText, ClickOutside } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import demoText from "./DemoText";

class Editor extends Component {
    state = {
        text: 'Enter Text Here'
    }

    componentWillMount() {
        this.setState({text: demoText});
    }

    handleChange = value => {
        this.setState({ text: value })
    }

    render() {
        return (
            <div>
            <div style={{display: "flex", justifyContent: "flex-start"}}>
                <div style={{width: "30%"}}>

                </div>
                <div style={{width: "50%"}} >
                    <ReactQuill value={this.state.text}
                                onChange={this.handleChange}
                                theme="bubble"
                                style={{height: "85vh" }}
                    />

                </div>

            </div>

            </div>
        );
    }
}

export default Editor;