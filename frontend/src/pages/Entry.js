import { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import api from '../services/api';
import Layout from '../components/Layout';

export default function Entry() {
  const [vehicle, setVehicle] = useState('');

  const submit = async () => {
    try {
      const res = await api.post('/parking/entry', {
        vehicle_number: vehicle
      });
      alert(res.data.msg);
      setVehicle('');
    } catch (err) {
      alert('Failed to allocate slot');
    }
  };

  return (
    <Layout>
      <Container className="mt-4">
        <h3>🚙 Vehicle Entry</h3>

        <Form.Control
          placeholder="Vehicle Number"
          value={vehicle}
          onChange={(e) => setVehicle(e.target.value)}
        />

        <Button className="mt-3" onClick={submit}>
          Allocate Slot
        </Button>
      </Container>
    </Layout>
  );
}
