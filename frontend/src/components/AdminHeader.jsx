import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { adminLogout } from '../store/authSlice';
import { useAdminLogoutMutation } from '../store/adminApiSlice';

const AdminHeader = () => {
    const { adminInfo } = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [adminLogoutApi] = useAdminLogoutMutation();

    const logoutHandler = async () => {
        try {
            await adminLogoutApi().unwrap();
            dispatch(adminLogout());
            navigate('/admin');
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand><h2>ADMIN</h2></Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto d-flex align-items-lg-center'>
                            {!adminInfo ? (
                                <>
                                    <LinkContainer to='/admin/login'>
                                        <Nav.Link >
                                            Login
                                        </Nav.Link>
                                    </LinkContainer>
                                </>
                            ) : (
                                <>
                                    <LinkContainer to='/admin/users'>
                                        <Nav.Link className='text-white'>
                                            Users
                                        </Nav.Link>
                                    </LinkContainer>
                                    
                                            <Button className='btn-secondary ms-lg-5' onClick={logoutHandler}>Logout</Button>
                                     
                                </>
                            )}



                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header >
    );
};

export default AdminHeader;