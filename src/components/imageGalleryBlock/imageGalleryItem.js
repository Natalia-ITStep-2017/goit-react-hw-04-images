import PropTypes from "prop-types";
import css from '../styles.module.css';
import { useContext } from "react";
import { Context } from "./ImageGallery";



const ImageGalleryItem = ({ imageItem }) => {
  const { webformatURL, largeImageURL, tags } = imageItem;
  const { setIsModalOpened, setImgUrl } = useContext(Context)

  const handleOpenModal = () => {
    setImgUrl(largeImageURL)
    setIsModalOpened(true);
  }

  return (
    <li className={css.ImageGalleryItem}
      onClick={handleOpenModal}>
      <img className={css.ImageGalleryItemImage}
        src={webformatURL}
        alt={tags} />
    </li>
  )
}

ImageGalleryItem.propTypes = {
  imageItem: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired
};

export default ImageGalleryItem