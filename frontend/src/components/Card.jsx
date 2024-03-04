import { Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import ItemModal from './ItemModal';
import { deleteAPI } from '../utils/handleAPI';
import Context from '../context/context';
import ColorModal from './ColorModal';

const StoreItem = ({ item, editData }) => {
  const [showItemModal, setShowItemModal] = useState(false);
  const [showColorModal, setShowColorModal] = useState(false);
  const [color, setColor] = useState(item.data[0].color);

  const { token } = useContext(Context);

  const handleShowItemModal = () => {
    setShowItemModal((prev) => !prev);
  };

  const handleShowColorModal = () => {
    setShowColorModal((prev) => !prev);
  };

  const deleteProduct = async () => {
    await deleteAPI(`/product/${item.id}`, token);
    editData((prevState) => prevState.filter(({ id }) =>  id !== item.id));
  }

  return (
    <>
      <Card style={{ width: '18rem' }} className="card" data-testid="card" >
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <Card.Text>{item.model}</Card.Text>
          <Card.Text>{item.brand}</Card.Text>
          <label htmlFor="colors">Price:
            <select name="colors" id="colors" onChange={({ target: { value } }) => setColor(value)}>
              {
                item.data.map((data) => (
                  <option key={data.color} value={data.color}>
                    ${data.price}
                  </option>
                ))
              }
            </select>
          </label>
          <div className="color_container">
            <div>Color:</div>
            <div className="color_space" style={{ backgroundColor: color }}></div>
          </div>
        </Card.Body>
        <div className="edit_button_container">
          <Button variant="success" onClick={handleShowColorModal}>Add Color</Button>
          <Button onClick={handleShowItemModal}>Edit product</Button>
        </div>
        <Button variant="danger" onClick={deleteProduct}>Delete</Button>
      </Card>
      <ItemModal showModal={showItemModal} handler={handleShowItemModal} item={item} editData={editData}/>
      <ColorModal showModal={showColorModal} handler={handleShowColorModal} item={item} editData={editData}/>
    </>
  );
};

export default StoreItem;

StoreItem.propTypes = {
  item: PropTypes.object.isRequired,
  editData: PropTypes.func.isRequired,
};