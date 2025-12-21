import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import api from '../services/api';
import Layout from '../components/Layout';
import '../styles/dashboard.css';

const TOTAL_SLOTS = 50; // 👈 FIXED CAPACITY (FRONTEND)

export default function Dashboard() {
  const [stats, setStats] = useState({
    availableSlots: 0,
    occupiedSlots: 0,
    recordsToday: 0
  });

useEffect(() => {
  api.get('/parking/stats')
    .then(res => {
      // ✅ REAL DATA (used when backend is running)
      setStats({
        availableSlots: res.data.availableSlots,
        occupiedSlots: res.data.occupiedSlots,
        recordsToday: res.data.recordsToday
      });
    })
    .catch(() => {
      /*
        🔧 DEMO MODE (Frontend-only deployment)

        This fallback is used ONLY when backend is unavailable
        (e.g., Netlify live demo).

        Real backend + MySQL work locally without this.
      */

      setStats({
        availableSlots: 30,
        occupiedSlots: 20,
        recordsToday: 18
      });
    });
}, []);


  /*useEffect(() => {
    api.get('/parking/stats')
      .then(res => {
        setStats({
          availableSlots: res.data.availableSlots,
          occupiedSlots: res.data.occupiedSlots,
          recordsToday: res.data.recordsToday
        });
      })
      .catch(err => console.error(err));
  }, []);*/

  return (
    <Layout>
      <div className="dashboard-header">
        <h1>👋 Welcome, Admin</h1>
        <p>Parking Lot Status – Today</p>
      </div>

      <Container>
        <Row className="mb-4">
          <Col md={3}>
            <div className="dashboard-card">
              <h5>🚗 Total Slots</h5>
              <h2>{TOTAL_SLOTS}</h2>
            </div>
          </Col>

          <Col md={3}>
            <div className="dashboard-card">
              <h5>✅ Available Slots</h5>
              <h2>{stats.availableSlots}</h2>
            </div>
          </Col>

          <Col md={3}>
            <div className="dashboard-card">
              <h5>❌ Occupied Slots</h5>
              <h2>{stats.occupiedSlots}</h2>
            </div>
          </Col>

          <Col md={3}>
            <div className="dashboard-card">
              <h5>📜 Records Today</h5>
              <h2>{stats.recordsToday}</h2>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
