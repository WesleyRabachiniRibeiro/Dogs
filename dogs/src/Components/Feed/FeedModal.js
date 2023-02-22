import React from "react";
import styles from "./FeedModal.module.css";
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";
import PhotoContent from "../Photo/PhotoContent";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../store/ui";

const FeedModal = () => {
  const { data, error, loading } = useSelector((state) => state.photo);
  const dispatch = useDispatch();
  const {modal} = useSelector((state) => state.ui)

  React.useEffect(() => {
    dispatch(closeModal())
  }, [dispatch]);

  const headleOutsideClick = (event) => {
    if (event.target === event.currentTarget)
      dispatch(closeModal())
  };

  if (!modal) return null;

  return (
    <div className={styles.modal} onClick={headleOutsideClick}>
      {error && <Error error={error} />}
      {loading && <Loading />}
      {data && <PhotoContent />}
    </div>
  );
};

export default FeedModal;
