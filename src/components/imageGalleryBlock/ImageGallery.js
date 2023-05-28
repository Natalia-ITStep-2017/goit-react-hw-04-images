import { createContext, useState } from "react";
import ImageGalleryItem from "./imageGalleryItem";
import Modal from "../modal";
import css from '../styles.module.css';
import PropTypes from "prop-types";

export const Context = createContext()

const ImageGallery = ({ imageList }) => {
  const [imgUrl, setImgUrl] = useState(null);
  const [isModalOpened, setIsModalOpened] = useState(false);

  return (
    <Context.Provider value={{
      isModalOpened,
      setIsModalOpened,
      imgUrl,
      setImgUrl
    }}>
      <ul className={css.ImageGallery} >
        {
          imageList.map(imageItem => {
            return (
              <ImageGalleryItem
                key={imageItem.id}
                imageItem={imageItem} />
            )
          })
        }
      </ul>
      {isModalOpened && (
        <Modal
          imageURL={imgUrl} />
      )}
    </Context.Provider>
  )
}

ImageGallery.propTypes = {
  imageList: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired
};

export default ImageGallery