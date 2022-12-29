import logo from './logo.svg';
import React, { useEffect, useState } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const App = () => {
  const [robux, setRobux] = useState(1000);
  const [price, setPrice] = useState('');
  const [rate, setRate] = useState('');
  const [type, setType] = useState('ct');
  const [currency, setCurrency] = useState('USD');
  const [msgResult, setResult] = useState({price: 1428, receive: 1000});
  const [payment, setPayment] = useState('');

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function ths(num){
      var num_parts = num.toString().split(".");
      num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return num_parts.join(".");
  }
  const handleSubmit = async event => {
    event.preventDefault();
    let params = {
      num: event.target[0].value,
      price: event.target[1].value,
      rate: event.target[2].value,
      type: event.target[3].value,
      currency: event.target[4].value
    }
    let result = await axios.get(`https://rielbot.app/api/calc/robux`, {params});
    setResult(result.data.result);
    if(result.data.result.payment){
      setPayment(`You pay: ${currency} ${ths(result.data.result.payment)}`);
    } else {
      setPayment(``);
    }
    handleShow();
  }

  return(
    <div className="App">
        <div className="App-header">
          <Container>
            <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='robux'>
                <Form.Label>Robux</Form.Label>
                <Form.Control type="number" placeholder="Enter robux" value={robux} min="50" max="999999999" onChange={event => setRobux(event.target.value)} required />
              </Form.Group>
              <Form.Group className='mb-3' controlId='price'>
                <Form.Label>Price per Rate</Form.Label>
                <Form.Control type="number" placeholder="Price per rate e.g 3 (3$)" value={price} onChange={event => setPrice(event.target.value)} />
              </Form.Group>
              <Form.Group className='mb-3' controlId='rate' >
                <Form.Label>Robux Rate</Form.Label>
                <Form.Control type="number" placeholder="robux rate (e.g 1000)" min="1" max="999999999" value={rate} onChange={event => setRate(event.target.value)}/>
              </Form.Group>
              <Form.Group className='mb-3' controlId='type'>
                <Form.Label>Type</Form.Label>
                <Form.Select value={type} onChange={event => setType(event.target.value)} required>
                  <option value='ct'>Covered Tax</option>
                  <option value='nct'>Non-Covered Tax</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className='mb-3' controlId='currency'>
                <Form.Label>Currency</Form.Label>
                <Form.Select value={currency} onChange={event => setCurrency(event.target.value)}>
                  <option value='USD'>USD ($)</option>
                  <option value='PHP'>PHP (₱)</option>
                </Form.Select>
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button><br/>
              <Modal className='rielModal' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Result</Modal.Title>
                </Modal.Header>
                <Modal.Body>Gamepass/shirt price: {ths(msgResult.price)}<br/>Robux receive: <span className='green'>{ths(msgResult.receive)} R$</span><br/>{payment}</Modal.Body>
                <Modal.Footer>
                  <Button variant="danger" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
              {/* <Form.Text id="result">
                <Row>
                  <Col md="auto">Robux Price: {msgResult.price}</Col>
                  <Col md="auto">Robux Received: {msgResult.receive}</Col>
                  <Col md="auto">{payment}</Col>
                </Row>
              </Form.Text> */}
            </Form>
          </Container>
        </div>
      </div>
  )
}

export default App;
