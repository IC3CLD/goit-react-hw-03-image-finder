import React from "react";
import ImageGalleryItem from "./ImageGalleryItem";
import styled from "styled-components";

////////////////////////////////////////////////////////////////////////////////////////////////

const ImageGalleryUL = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;

////////////////////////////////////////////////////////////////////////////////////////////////

const ImageGallery = ({ images, itemClick }) => {
  return (
    <ImageGalleryUL onClick={itemClick}>
      {images.map((image) => (
        <ImageGalleryItem
          key={image.id}
          webformatURL={image.webformatURL}
          largeImageURL={image.largeImageURL}
          alt={image.tags}
        />
      ))}
    </ImageGalleryUL>
  );
};

export default ImageGallery;
