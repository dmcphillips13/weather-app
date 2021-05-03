import React from 'react';
import Button from 'react-bootstrap/Button';

const Favorites = ({ favorites, handleSelect }) => {
  return (
    <ul>
      Favorites:
      {favorites &&
        favorites.map((favorite) => (
          <Button key={favorite} onClick={() => handleSelect(favorite)}>
            {favorite}
          </Button>
        ))}
    </ul>
  );
};

export default Favorites;
