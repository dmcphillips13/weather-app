import React from 'react';
import Button from 'react-bootstrap/Button';

const FavoriteButton = ({ favorites, location, addOrRemoveFavorite }) => {
  return (
    location && (
      <Button onClick={() => addOrRemoveFavorite(location)}>
        {favorites && favorites.includes(location)
          ? 'Remove from Favorites'
          : 'Add to Favorites'}
      </Button>
    )
  );
};

export default FavoriteButton;
