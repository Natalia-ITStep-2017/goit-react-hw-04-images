import { useContext, useEffect } from 'react';
import css from './styles.module.css';
import { Context } from './imageGalleryBlock/ImageGallery';


const Modal = () => {
  const { isModalOpened, setIsModalOpened, imgUrl } = useContext(Context)

  useEffect(() => {
    const handlePressESC = (event) => {
      console.log(1)
      if (event.code === 'Escape') setIsModalOpened(false)
    }
    document.addEventListener('keydown', handlePressESC)
    return () => {
      document.removeEventListener('keydown', handlePressESC)
    }
  }, [setIsModalOpened])

  const handlleClickOverlay = (event) => {
    if (event.currentTarget === event.target) {
      setIsModalOpened(false)
    }
  }

  return (
    isModalOpened && <div className={css.Overlay}
      onClick={handlleClickOverlay} >

      <div className={css.Modal}>
        <img src={imgUrl} alt="" />
      </div>
    </div >)

}


export default Modal