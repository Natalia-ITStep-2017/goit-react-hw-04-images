import { useState, useEffect } from "react"
import Searchbar from "./searchbar"
import ImageGallery from "./imageGalleryBlock/ImageGallery"
import LoadMore from "./button"
import { getImagesBySearchText } from "../api/api"
import css from './styles.module.css';
import Loader from "./loader"
import Notification from "./notification"


const Gallary = () => {

  const [images, setImages] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [perPage] = useState(12);
  const [page, setPage] = useState(0);
  const [isFetchDone, setIsFetchDone] = useState(true);

  const handleOnClickSearch = ( searchText ) => {
    setSearchText(searchText);
    setPage(1);
    setTotal(0);
    setIsFetchDone(false);
  }

  const hanldeLoadMore = () => {
    setPage((prev) => prev + 1);
    setIsFetchDone(false);
  }

  const isLoadMoreAvailable = (total, perPage, page) => {
    return !isLoading && (perPage * page < total)
  }

  const noResults = () => {
    return (!isLoading &&
      images &&
      page === 1 &&
      images.length === 0)
  }

  const noSearchWords = () => {
    return (!isLoading &&
      page === 1
      && !images)
  }

  useEffect(() => {
    if (page === 1 && total===0 && !isFetchDone) {
      async function fetchFistSearch() {
      
        if (!searchText) {
          setImages(null);
          return
        }
        setImages(null);
        setIsLoading(true);

        try {
          const response = await getImagesBySearchText(searchText, page, perPage);
          setImages([...response.hits]);
          setTotal(response.totalHits);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
          setIsFetchDone(true)
        }
      }
      fetchFistSearch();
    }
    if (page > 1 && !isFetchDone) {
      async function fetchLoadMore() {
        setIsLoading(true);
        try {
          const response = await getImagesBySearchText(searchText, page, perPage);
          setImages([...images, ...response.hits]);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
          setIsFetchDone(true)
        }
    }
    fetchLoadMore();
     }
  },
    [searchText, isLoading, images, page, perPage, total, isFetchDone]);


  return (
    <div className={css.App}>
      <Searchbar
        onSubmit={handleOnClickSearch} />
      {isLoading && (<Loader />)}
      {noSearchWords() && (
        <Notification
          text='Please enter search word(s)' />
      )}

      {noResults() && (
        <Notification
          text='There is no result for your search' />
      )}

      {images && images.length !== 0 && (
        <ImageGallery
          imageList={images} />
      )}
      {isLoadMoreAvailable(total, perPage, page) && (
        <LoadMore
          onClickLoadMore={hanldeLoadMore} />
      )}
    </div>
  )
};


export default Gallary
