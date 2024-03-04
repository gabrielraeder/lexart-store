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
  const [price, setPrice] = useState(item.data[0].price);

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
        <Card.Body className="card_body">
          <Card.Title className="card_title">{item.name}</Card.Title>
          <Card.Text className="card_text">{item.model}</Card.Text>
          <Card.Text className="card_text">{item.brand}</Card.Text>
          <div className="color_container">
            {
              item.data.map(({ color, price }) => (
                <button 
                  key={color}
                  onClick={ ({ target: { value }}) => setPrice(value) }
                  value={price} 
                  className="color_space" 
                  style={{ backgroundColor: color }}></button>
              ))
            }
          </div>

          <h5>$ { price }</h5>
          
        </Card.Body>
        <div className="button_container">
          <Button variant="success" onClick={handleShowColorModal}>Add Color</Button>
          <Button onClick={handleShowItemModal}>Edit product</Button>
          <Button variant="danger" onClick={deleteProduct}>Delete</Button>
        </div>
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