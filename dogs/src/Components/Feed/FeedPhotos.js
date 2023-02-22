import React from "react";
import FeedPhotosItem from "./FeedPhotosItem";
import styles from "./FeedPhotos.module.css";
import { useSelector } from "react-redux";

const FeedPhotos = ({ setModalPhoto }) => {
  const { list } = useSelector((state) => state.feed);
  const setList = Array.from(new Set(list.map(JSON.stringify))).map(JSON.parse)
  return (
    <ul className={`${styles.feed} animeLeft`}>
      {setList.map((photo) => (
        <FeedPhotosItem
          key={photo.id}
          photo={photo}
          setModalPhoto={setModalPhoto}
        />
      ))}
    </ul>
  );
};

export default FeedPhotos;
