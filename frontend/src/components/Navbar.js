import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function AppNavbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Parking System</Navbar.Brand>
        <Nav>
          <Nav.Link onClick={() => navigate('/dashboard')}>Dashboard</Nav.Link>
          <Nav.Link onClick={() => navigate('/entry')}>Entry</Nav.Link>
          <Nav.Link onClick={() => navigate('/exit')}>Exit</Nav.Link>
          <Nav.Link onClick={() => navigate('/history')}>History</Nav.Link>
          <Nav.Link onClick={logout}>Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
