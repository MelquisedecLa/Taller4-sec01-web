import { useEffect, useState } from 'react';
import { Container, Card, CardBody, CardTitle, CardText, Row, Col, Badge, Alert } from 'reactstrap';
import './App.css';

const API_URL = 'http://localhost:3000';

function App() {
  const [health, setHealth] = useState('');
  const [info, setInfo] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/health`)
      .then((res) => res.json())
      .then((data) => setHealth(data.message))
      .catch(() => setHealth('No se pudo conectar con el API'));

    fetch(`${API_URL}/api/info`)
      .then((res) => res.json())
      .then((data) => setInfo(data))
      .catch(() => setInfo(null));
  }, []);

  return (
    <Container className="py-4">
      <h1 className="titulo">Taller IV</h1>

      <section className="health-section">
        <h4>Estado del API</h4>
        <div className="health-box">
          <p>{health}</p>
        </div>
      </section>

      {info && (
        <section className="mt-4">
          <Alert color="success">{info.message}</Alert>
          <Row>
            {info.integrantes.map((i) => (
              <Col md="6" key={i.nombre} className="mb-3">
                <Card>
                  <CardBody>
                    <CardTitle tag="h5">{i.nombre}</CardTitle>
                    <CardText>Edad: {i.edad} años</CardText>
                    <CardText>Carrera: {i.carrera}</CardText>
                    <Badge color="primary">Materias aprobadas: {i.materiasAprobadas}</Badge>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </section>
      )}
    </Container>
  );
}

export default App;