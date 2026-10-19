import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Table, Badge } from 'reactstrap';

// Estilos dinámicos para la sección de Health Check
const healthSectionStyle = {
  background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
  borderLeft: '5px solid #198754',
  padding: '1.5rem',
  borderRadius: '0.375rem',
  boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)'
};

function App() {
  const [healthMessage, setHealthMessage] = useState('');
  const [apiInfo, setApiInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Consumir el endpoint /api/health (Punto 4)
    fetch('http://localhost:5000/api/health')
      .then(res => res.json())
      .then(data => setHealthMessage(data.message))
      .catch(err => console.error('Error al consumir /api/health:', err));

    // Consumir el endpoint /api/info (Punto 5)
    fetch('http://localhost:5000/api/info')
      .then(res => res.json())
      .then(data => {
        setApiInfo(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al consumir /api/info:', err);
        setLoading(false);
      });
  }, []);

  return (
    <Container className="py-5">
      {/* Punto 3: Título en el Frontend llamado "Taller IV" */}
      <h1 className="text-center mb-4 fw-bold text-primary">Taller IV</h1>

      {/* Punto 4: Sección usando las etiquetas section, div, h4, p y estilos CSS */}
      <section style={healthSectionStyle} className="my-4 border">
        <div className="health-container">
          <h4 className="text-success mb-2">Estado del API (Health Check)</h4>
          <p className="mb-0 text-dark fw-medium fs-5">
            {healthMessage ? healthMessage : 'Conectando con el servidor...'}
          </p>
        </div>
      </section>

      {/* Punto 5 y 6: Consumo de /api/info renderizado con componentes de Reactstrap */}
      <section className="my-5">
        <h3 className="mb-4 text-secondary">Información del Sistema e Integrantes</h3>
        {loading ? (
          <p className="text-muted">Cargando datos del API...</p>
        ) : (
          <Row>
            <Col md="12">
              <Card className="shadow-sm border-0 mb-4">
                <CardBody>
                  <CardTitle tag="h5" className="text-primary mb-3">
                    Estado del Servicio: <Badge color="success">Operativo</Badge>
                  </CardTitle>
                  <CardText className="text-muted mb-4">
                    <strong>Mensaje del servidor:</strong> {apiInfo?.message}
                  </CardText>

                  <h6 className="fw-bold mb-3">Integrantes del Equipo:</h6>
                  <Table responsive striped hover className="align-middle">
                    <thead className="table-dark">
                      <tr>
                        <th>Nombre Completo</th>
                        <th>Edad</th>
                        <th>Carrera</th>
                        <th>Materias Aprobadas</th>
                      </tr>
                    </thead>
                    <tbody>
                      {apiInfo?.integrantes?.map((member, index) => (
                        <tr key={index}>
                          <td className="fw-bold">{member.nombre}</td>
                          <td>{member.edad} años</td>
                          <td>{member.carrera}</td>
                          <td>
                            <Badge color="info" pill>
                              {member.materiasAprobadas}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}
      </section>
    </Container>
  );
}

// Renderizado directo en el DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
