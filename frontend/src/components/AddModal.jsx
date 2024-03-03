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
  const [color2, setColor2] = useState('');
  const [color3, setColor3] = useState('');
  const [price, setPrice] = useState('');
  const [price2, setPrice2] = useState('');
  const [price3, setPrice3] = useState('');
  const [disabled, setDisabled] = useState(true);

  const { token } = useContext(Context);

  useEffect(() => {
    if (name && brand && model && color && price) setDisabled(false);
  }, [name, brand, model, color, price])
  

  const createProduct = () => {
    const product = {
      name, brand, model
    }
    const data = [{ price, color }]
    if (color2 && price2) data.push({ price: price2, color: color2 });
    if (color3 && price3) data.push({ price: price3, color: color3 });

    return { ...product, data };
  }

  const callAPI = async () => {
    const product = createProduct();
    await postAPI('/product', handleShow, product, token);
    editData((prevState) => [...prevState, product]);
  };

  return (
    <>
      <Modal show={showModal} onHide={handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="text-center">
          <Form>
          <Form.Label>{'Name'}</Form.Label>
            <Form.Control type="text" value={name} onChange={({ target: { value } }) => setName(value)} placeholder="New product name" />

            <Form.Label>{'Brand'}</Form.Label>
            <Form.Control type="text" value={brand} onChange={({ target: { value } }) => setBrand(value)} placeholder="New product brand" />

            <Form.Label>{'Model'}</Form.Label>
            <Form.Control type="text" value={model} onChange={({ target: { value } }) => setModel(value)} placeholder="New product model" /> 

            <Form.Label>{'Color'}
            <Form.Control
              type="text"
              value={color}
              onChange={({ target: { value } }) => setColor(value)}
            />
            </Form.Label>
            <Form.Label>{'Price'}
            <Form.Control
              type="number"
              value={price}
              onChange={({ target: { value } }) => setPrice(value)}
            />
            </Form.Label>

            <Form.Label>{'Color'}
            <Form.Control
              disabled={!price || !color}
              type="text"
              value={color2}
              onChange={({ target: { value } }) => setColor2(value)}
            />
            </Form.Label>
            <Form.Label>{'Price'}
            <Form.Control
              disabled={!price || !color}
              type="number"
              value={price2}
              onChange={({ target: { value } }) => setPrice2(value)}
            />
            </Form.Label>

            <Form.Label>{'Color'}
            <Form.Control
              disabled={(!price || !color) || (!price2 || !color2)}
              type="text"
              value={color3}
              onChange={({ target: { value } }) => setColor3(value)}
            />
            </Form.Label>
            <Form.Label>{'Price'}
            <Form.Control
              disabled={(!price || !color) || (!price2 || !color2)}
              type="number"
              value={price3}
              onChange={({ target: { value } }) => setPrice3(value)}
            />
            </Form.Label>

          </Form>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShow}>
            Close
          </Button>
          <Button variant="primary" disabled={disabled} onClick={callAPI}>
            Save Changes
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
