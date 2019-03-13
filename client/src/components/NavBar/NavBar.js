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
    Row,
    Col
} from "reactstrap";

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
        return (
            <div>
                <Navbar  className="bg-transparent" expand="lg">
                    <Container>
                        <NavbarBrand href="#pablo" onClick={e => e.preventDefault()}>
                            Creative Writer
                        </NavbarBrand>
                        <button className="navbar-toggler" aria-expanded={false}>
                            <span className="navbar-toggler-bar bar1" />
                            <span className="navbar-toggler-bar bar2" />
                            <span className="navbar-toggler-bar bar3" />
                        </button>
                        <Collapse navbar isOpen={false}>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink
                                        href="#pablo"
                                        onClick={e => e.preventDefault()}
                                    >
                                        <i
                                            aria-hidden={true}
                                            className="tim-icons icon-send"
                                        />
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        href="#pablo"
                                        onClick={e => e.preventDefault()}
                                    >
                                        <i
                                            aria-hidden={true}
                                            className="tim-icons icon-single-02"
                                        />
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
                                        <i
                                            aria-hidden={true}
                                            className="tim-icons icon-settings-gear-63"
                                        />
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