import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import SideNav, {NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import demoText from "./DemoText";
import {connect} from "react-redux";
import { createNewProject, createNewChapter, changeCurrentChapter, updateChapter } from "../../store/actions";

class Editor extends Component {
    state = {
        text: 'Enter Text Here',
        open: true,
        selected: 'home',
        chapExpanded: false,
        charExpanded: false,
    }

    componentWillMount() {

        if (this.props.project !== null || this.props.project !== undefined) {
            if (this.props.project !== null) {
                const chapter = this.props.project.project.chapters.filter(chp => chp.id === this.props.currentChapter)
                this.setState({text: chapter[0].content, selected: `chapters/${this.props.currentChapter - 1}`, chapExpanded: true})
            } else {
                this.setState({text: "Enter Text Here"})
            }
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.project !== this.props.project) {
            const chapter = nextProps.project.project.chapters.filter(chp => chp.id === this.props.currentChapter)
            this.setState({text: chapter[0].content, selected: `chapters/${this.props.currentChapter- 1}`, chapExpanded: true})
        }
    }

    handleChange = value => {
        console.log("Value => ", value);
        // this.setState({ text: value })
        this.props.updateChapter(value, this.props.currentChapter);
    }

    handleSelected = selected => {
        console.log("SELECTED => ", selected);
        const chapter = this.props.project.project.chapters.filter(chp => chp.id === this.props.currentChapter)
        this.setState({ selected, text: chapter[0].content})
    }

    handleAddChapter = () => {
        this.props.createNewChapter();
        console.log("CHPT => ", this.props.currentChapter);
        const num = this.props.currentChapter;
        this.setState({ selected: `chapters/${num}`})
    }

    handleChangeChapter = (id) => {
        this.props.changeCurrentChapter(id);
    }

    render() {
        let chapter = [{content: ""}];
        if (this.props.project !== null) {
            chapter = this.props.project.project.chapters.filter(chp => chp.id === this.props.currentChapter)
        }

        let selected = this.state.selected;
        return (
            <div>
            <div style={{display: "flex", justifyContent: "flex-start"}}>
                <div style={{width: "30%", height: "85vh", display: "flex", overflow: "auto"}}>
                    <SideNav
                        expanded={true}
                        onSelect={(selected) => {
                            this.handleSelected(selected);
                        }}
                        style={{width: "100%", zIndex: "2000", position: "relative", backgroundColor: "transparent"}}
                    >
                        {/*<SideNav.Toggle />*/}
                        <SideNav.Nav defaultSelected={selected}>
                            <NavItem eventKey="home">
                                <NavIcon>
                                    <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                                </NavIcon>
                                <NavText>
                                    Home
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="chapters" expanded={this.state.chapExpanded}>
                                <NavIcon>
                                    <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
                                </NavIcon>
                                <NavText>
                                    Chapters
                                </NavText>
                                {
                                    this.props.project !== null ?
                                        this.props.project.project.chapters.map((chapter, i) => (
                                            <NavItem key={i} eventKey={`chapters/${i}`} onClick={() => this.handleChangeChapter(chapter.id)}>
                                                <NavText>
                                                    {chapter.title}
                                                </NavText>
                                            </NavItem>
                                        )) : null
                                }
                                <NavItem>
                                    <NavText onClick={this.handleAddChapter}>
                                        Add
                                    </NavText>
                                </NavItem>
                            </NavItem>
                            <NavItem eventKey="characters" expanded={this.state.charExpanded}>
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
                    <ReactQuill defaultValue={chapter[0].content}
                                value={chapter[0].content}
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

const mapStateToProps = state => ({
    project: state.rootReducer.project,
    currentChapter: state.rootReducer.currentChapter
});

export default connect(
    mapStateToProps,
    { createNewProject, createNewChapter, changeCurrentChapter, updateChapter }
)(Editor);