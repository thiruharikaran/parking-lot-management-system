import { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import api from '../services/api';
import Layout from '../components/Layout';

export default function Exit() {
  const [vehicle, setVehicle] = useState('');

  const submit = async () => {
    try {
      const res = await api.post('/parking/exit', {
        vehicle_number: vehicle
      });
      alert(res.data.msg);
      setVehicle('');
    } catch (err) {
      alert('Failed to exit vehicle');
    }
  };

  return (
    <Layout>
      <Container className="mt-4">
        <h3>🚪 Vehicle Exit</h3>

        <Form.Control
          placeholder="Vehicle Number"
          value={vehicle}
          onChange={(e) => setVehicle(e.target.value)}
        />

        <Button className="mt-3" variant="danger" onClick={submit}>
          Exit Vehicle
        </Button>
      </Container>
    </Layout>
  );
}
