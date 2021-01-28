import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'

const Header = () => {
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>
            {/* Variant changes the text color within the background to give contrast */}
            <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect className="py-3">
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand><img src="https://i.imgur.com/x0WXs7X.png" alt="Coding Dojo Logo" style={{ height: "auto", width: "200px", margin: "-15px" }} /></Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {/* ml-auto is the spacing it gives away from the left object to be on the right side */}
                        <Nav className="ml-auto">
                            {/* Font awesome library imported into index.html so we can use icons */}
                            <LinkContainer to="/cart">
                                <Nav.Link className="h5 mr-3"><i className='fas fa-shopping-cart mr-1'></i> Cart</Nav.Link>
                            </LinkContainer>

                            {userInfo ? (
                                <NavDropdown className="h5" title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                                </NavDropdown>

                            ) : <LinkContainer to="/login">
                                    <Nav.Link className="h5"><i className='fas fa-user mr-1'></i> Sign In</Nav.Link>
                                </LinkContainer>}




                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
