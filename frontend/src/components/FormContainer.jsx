import { Col, Container, Row } from "react-bootstrap";

const FormContainer = ({ children }) => {
    return (
        <Container>
            <Row className="justify-content-md-center mt-5 ">
                <Col xs={12} md={6} className="card p-4 shadow-sm p-3 mb-5 bg-white rounded border-1" >
                    {children}
                </Col>
            </Row>
        </Container>
    );
};

export default FormContainer;
