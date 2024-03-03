import { Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import { useState } from 'react';
import ItemModal from './ItemModal';

const StoreItem = ({ item, editData }) => {
  const [showModal, setShowModal] = useState(false);
  const [color, setColor] = useState(item.data[0].color);


  const handleShow = () => {
    setShowModal((prev) => !prev);
  };

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
        <Button onClick={handleShow}>Edit product</Button>
      </Card>
      <ItemModal showModal={showModal} handler={handleShow} item={item} editData={editData}/>

      
    </>
  );
};

export default StoreItem;

StoreItem.propTypes = {
  item: PropTypes.object.isRequired,
  editData: PropTypes.func.isRequired,
};