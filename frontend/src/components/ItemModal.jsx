/* eslint-disable max-len */
import {  Button, Form, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import { useEffect, useState, useContext } from 'react';
import Context from '../context/context';
import { putAPI } from '../utils/handleAPI';

export default function ItemModal({ showModal, handler, item, editData }) {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [disabled, setDisabled] = useState(true);

  const { token } = useContext(Context);

  useEffect(() => {
    if (name && brand && model) setDisabled(false)
  }, [name, brand, model]);

  const handleChange = async () => {
    const body = { name, brand, model };
    
    await putAPI(`/product/${item.id}`, console.log, body, token);
    editData((prevState) => prevState.map((i) => i.id === item.id && {...i, ...body }));
    handler();
  };

  return (
    <Modal show={showModal} onHide={handler}>
      <Modal.Header closeButton={handler}>
        <Modal.Title>Edit {item.name} details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <Form>
            <Form.Label>{'Name'}</Form.Label>
            <Form.Control type="text" value={name} onChange={({ target: { value } }) => setName(value)} placeholder="Enter new product name" />

            <Form.Label>{'Brand'}</Form.Label>
            <Form.Control type="text" value={brand} onChange={({ target: { value } }) => setBrand(value)} placeholder="Enter new product brand" />

            <Form.Label>{'Model'}</Form.Label>
            <Form.Control type="text" value={model} onChange={({ target: { value } }) => setModel(value)} placeholder="Enter new product model" />  
          </Form>
        </div>
        
        
      </Modal.Body>
      <Modal.Footer>
          <Button variant="secondary" onClick={handler}>
            Close
          </Button>
        <Button disabled={disabled} onClick={handleChange}>
            Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

ItemModal.propTypes = {
  item: PropTypes.object.isRequired,
  handler: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  editData: PropTypes.func.isRequired,
};