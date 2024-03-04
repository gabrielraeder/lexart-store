import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { postAPI } from '../utils/handleAPI';
import Context from '../context/context';

function ColorModal({ handler, showModal, editData, item }) {
  const [color, setColor] = useState('');
  const [price, setPrice] = useState('');
  
  const [disabled, setDisabled] = useState(true);

  const { token } = useContext(Context);

  useEffect(() => {
    if ( color && price) setDisabled(false);
  }, [color, price]);

  const callAPI = async () => {
    const data = { price, color };
    await postAPI(`/product/${item.id}/add-color`, handler, data, token);
    editData((prevState) => prevState.map((i) => i.id === item.id ? { ...i, data: [...i.data, data] } : i));
    setColor('');
    setPrice('');
  };

  return (
    <>
      <Modal show={showModal} onHide={handler}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="text-center">
          <Form>

            <Form.Label>{'Color'}</Form.Label>
              <Form.Control
                type="text"
                value={color}
                onChange={({ target: { value } }) => setColor(value)}
                placeholder="Enter the color name or hex-code"
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
          <Button variant="secondary" onClick={handler}>
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

export default ColorModal;

ColorModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handler: PropTypes.func.isRequired,
  editData: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};
