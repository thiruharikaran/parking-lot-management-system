import { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Layout from '../components/Layout';

const IS_DEMO = process.env.REACT_APP_DEMO === 'true';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
  // 🔧 DEMO LOGIN (Netlify only)
  if (IS_DEMO) {
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('token', 'demo-token');
      navigate('/dashboard');
    } else {
      alert('Demo credentials: admin / admin123');
    }
    return;
  }

  // ✅ REAL LOGIN (Localhost + Backend + MySQL)
  try {
    const res = await api.post('/auth/login', {
      username,
      password,
    });

    localStorage.setItem('token', res.data.token);
    navigate('/dashboard');
  } catch (err) {
    alert('Invalid username or password');
  }
};


  return (
    <Layout showNavbar={false}>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card style={{ width: '360px' }}>
          <Card.Body>
            <Card.Title className="text-center mb-3">
              🚗 Parking System Login
            </Card.Title>

            <Form>
              <Form.Group className="mb-3">
                <Form.Control
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button className="w-100" onClick={handleLogin}>
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  );
}
