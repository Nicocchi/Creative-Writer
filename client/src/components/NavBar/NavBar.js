import React, { Component } from 'react';
import {
    Collapse,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
} from "reactstrap";
import SideNav, { Toggle, Nav as Nav1, NavItem as NavItem2, NavIcon, NavText, ClickOutside } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

class NavBar extends Component {
    state = {
        isOpen: false
    };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        // console.log(this.props.history.location.pathname)
        return (
            <div>
                <Navbar className="bg-transparent" expand="lg" role="navigation">
                    <Container style={{marginLeft: "0", width: "100%", marginRight: "0"}}>
                        <NavbarBrand href="#pablo" style={{fontSize: "24px"}}>
                            Creative Writer
                        </NavbarBrand>
                        <button className="navbar-toggler" aria-expanded={false}>
                            <span className="navbar-toggler-bar bar1" />
                            <span className="navbar-toggler-bar bar2" />
                            <span className="navbar-toggler-bar bar3" />
                        </button>
                        <Collapse navbar isOpen={false} style={{position: "absolute", right: "0"}}>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink
                                        href="#"
                                        onClick={() => this.props.history.push('/')}
                                    >
                                        <i className="material-icons md-24">
                                            dashboard
                                        </i>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        href="#pablo"
                                        onClick={e => e.preventDefault()}
                                    >
                                        {/*<i*/}
                                            {/*aria-hidden={true}*/}
                                            {/*className="tim-icons icon-single-02"*/}
                                        {/*/>*/}
                                        <i className="material-icons md-24">
                                            person_outline
                                        </i>
                                    </NavLink>
                                </NavItem>
                                <UncontrolledDropdown nav>
                                    <DropdownToggle
                                        caret
                                        color="default"
                                        data-toggle="dropdown"
                                        href="#pablo"
                                        id="navbarDropdownMenuLink"
                                        nav
                                        onClick={e => e.preventDefault()}
                                    >
                                        {/*<i*/}
                                            {/*aria-hidden={true}*/}
                                            {/*className="tim-icons icon-settings-gear-63"*/}
                                        {/*/>*/}
                                        <i className="material-icons md-24">
                                            apps
                                        </i>
                                    </DropdownToggle>
                                    <DropdownMenu
                                        aria-labelledby="navbarDropdownMenuLink"
                                        right
                                    >
                                        <DropdownItem header>Application Settings</DropdownItem>
                                        <DropdownItem
                                            href="#pablo"
                                            onClick={e => e.preventDefault()}
                                        >
                                            Preferences
                                        </DropdownItem>
                                        <DropdownItem
                                            href="#pablo"
                                            onClick={e => e.preventDefault()}
                                        >
                                            Quit
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default NavBar;