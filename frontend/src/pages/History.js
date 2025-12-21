import { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import api from '../services/api';
import Layout from '../components/Layout';

export default function History() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    api.get('/parking/history')
      .then(res => setRecords(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Layout>
      <Container className="mt-4">
        <h3>📖 Parking History</h3>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Vehicle</th>
              <th>Slot</th>
              <th>Entry Time</th>
              <th>Exit Time</th>
            </tr>
          </thead>
          <tbody>
            {records.map(r => (
              <tr key={r.id}>
                <td>{r.vehicle_number}</td>
                <td>{r.slot_number}</td>
                <td>{r.entry_time}</td>
                <td>{r.exit_time || '—'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </Layout>
  );
}
