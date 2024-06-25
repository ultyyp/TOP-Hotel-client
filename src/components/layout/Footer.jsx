import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
    let today = new Date();
    return (
        <footer style={{zIndex: 9999}} className='bg-dark text-light py-3 footer mt-lg-5'>
            <Container>
                <Row>
                    <Col>
                        <p xs={12} md={12} className='text-center'>
                            &copy; {today.getFullYear()} TOP Hotel
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer