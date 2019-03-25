import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import SideNav, {NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import demoText from "./DemoText";

class Editor extends Component {
    state = {
        text: 'Enter Text Here',
        open: true,
        selected: 'home',
    }

    componentWillMount() {
        this.setState({text: demoText});
    }

    handleChange = value => {
        this.setState({ text: value })
    }

    handleSelected = selected => {
        this.setState({ selected })
    }

    render() {
        return (
            <div>
            <div style={{display: "flex", justifyContent: "flex-start"}}>
                <div style={{width: "30%", height: "85vh", display: "flex", overflow: "auto"}}>
                    <SideNav
                        expanded={true}
                        onSelect={(selected) => {
                            // Add your code here
                            this.handleSelected(selected);
                        }}
                        style={{width: "100%", zIndex: "2000", position: "relative", backgroundColor: "transparent"}}
                    >
                        {/*<SideNav.Toggle />*/}
                        <SideNav.Nav defaultSelected={this.state.selected}>
                            <NavItem eventKey="home">
                                <NavIcon>
                                    <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                                </NavIcon>
                                <NavText>
                                    Home
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="chapters">
                                <NavIcon>
                                    <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
                                </NavIcon>
                                <NavText>
                                    Chapters
                                </NavText>
                                <NavItem eventKey="charts/linechart">
                                    <NavText>
                                        Chapter 1
                                    </NavText>
                                </NavItem>
                            </NavItem>
                            <NavItem eventKey="characters">
                                <NavIcon>
                                    <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
                                </NavIcon>
                                <NavText>
                                    Characters
                                </NavText>
                                <NavItem eventKey="characters/character">
                                    <NavText>
                                        Character 1
                                    </NavText>
                                </NavItem>
                            </NavItem>
                            <NavItem eventKey="notes">
                                <NavIcon>
                                    <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
                                </NavIcon>
                                <NavText>
                                    Notes
                                </NavText>
                                <NavItem eventKey="notes/note">
                                    <NavText>
                                        Note 1
                                    </NavText>
                                </NavItem>
                            </NavItem>
                        </SideNav.Nav>
                    </SideNav>


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