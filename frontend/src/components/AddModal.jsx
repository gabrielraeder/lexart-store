import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { postAPI } from '../utils/handleAPI';
import Context from '../context/context';

function AddModal({ handleShow, showModal, editData }) {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [price, setPrice] = useState('');
  
  const [disabled, setDisabled] = useState(true);

  const { token } = useContext(Context);

  useEffect(() => {
    if (name && brand && model && color && price) setDisabled(false);
  }, [name, brand, model, color, price]);
  

  const createProduct = () => {
    const product = {
      name, brand, model
    }
    const data = [{ price, color }];

    return { ...product, data };
  }

  const callAPI = async () => {
    const product = createProduct();
    await postAPI('/product', handleShow, product, token);
    editData((prevState) => [...prevState, product]);
    setName('');
    setBrand('');
    setModel('');
    setColor('');
    setPrice('');
  };

  return (
    <>
      <Modal show={showModal} onHide={handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="text-center">
          <Form>

            <Form.Label>{'Name'}</Form.Label>
            <Form.Control type="text" value={name} onChange={({ target: { value } }) => setName(value)} placeholder="New product's name" />

            <Form.Label>{'Brand'}</Form.Label>
            <Form.Control type="text" value={brand} onChange={({ target: { value } }) => setBrand(value)} placeholder="New product's brand" />

            <Form.Label>{'Model'}</Form.Label>
            <Form.Control type="text" value={model} onChange={({ target: { value } }) => setModel(value)} placeholder="New product's model" /> 

            <Form.Label>{'Color'}</Form.Label>
            <Form.Control
              placeholder="Enter the color name or hex-code"
              type="text"
              value={color}
              onChange={({ target: { value } }) => setColor(value)}
            />
            
            <Form.Label>{'Price'}</Form.Label>
            <Form.Control
              type="number"
              value={price}
              placeholder="Enter the product's price"
              onChange={({ target: { value } }) => setPrice(value)}
            />
            

          </Form>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShow}>
            Close
          </Button>
          <Button variant="primary" disabled={disabled} onClick={callAPI}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddModal;

AddModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleShow: PropTypes.func.isRequired,
  editData: PropTypes.func.isRequired,
};
