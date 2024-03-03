import PropTypes from 'prop-types';
import Card from './Card';

export default function CardList({ data, editData }) {
    
  return (
    <div className="cards_container">
      <div className='card_list' data-testid="card_list">
        {
          data.map((item, index) => (
            <Card key={index} item={item} editData={editData} />
          ))
        }
        {!data.length && <h2>No items found.</h2>}
      </div>
    </div>
  );
}

CardList.propTypes = {
  data: PropTypes.array.isRequired,
  editData: PropTypes.func.isRequired,
};