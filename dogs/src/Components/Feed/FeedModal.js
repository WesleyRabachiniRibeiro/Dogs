import React from 'react'
import styles from './FeedModal.module.css'
import useFetch from '../../Hooks/useFetch'
import { GET_PHOTO } from '../../Api';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';
import PhotoContent from '../Photo/PhotoContent';

const FeedModal = ({photo, setModalPhoto}) => {
  const {data, error, loading, request} = useFetch();

  React.useEffect(() => {
    const {url, options} = GET_PHOTO(photo.id);
    request(url, options)
  }, [photo, request])

  const headleOutsideClick = (event) => {
    if(event.target === event.currentTarget) setModalPhoto(null)
  }

  return(
    <div className={styles.modal} onClick={headleOutsideClick}>
      {error && <Error error={error} />}
      {loading && <Loading />}
      {data && <PhotoContent data={data}/>}
    </div>
  )
}

export default FeedModal
