import React from "react";
import FeedModal from "./FeedModal";
import FeedPhotos from "./FeedPhotos";
import PropsTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { loadNewPhotos, resetFeedState } from "../../store/feed";
import Loading from "../Helper/Loading";
import Error from "../Helper/Error";
import { resetPhotoPostState } from "../../store/photoPost";

const Feed = ({ user }) => {
  const { infinite, loading, list, error } = useSelector((state) => state.feed);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(resetFeedState());
    dispatch(resetPhotoPostState());
    dispatch(loadNewPhotos({ user, total: 6 }));
  }, [dispatch, user]);

  React.useEffect(() => {
    let wait = false;
    const infiniteScroll = () => {
      if (infinite) {
        const scroll = window.scrollY;
        const height = document.body.offsetHeight - window.innerHeight;
        if (scroll > height * 0.75 && !wait) {
          dispatch(loadNewPhotos({ user, total: 6 }));
          wait = true;
          setTimeout(() => {
            wait = false;
          }, 500);
        }
      }
    };
    window.addEventListener("wheel", infiniteScroll);
    window.addEventListener("scroll", infiniteScroll);
    return () => {
      window.removeEventListener("wheel", infiniteScroll);
      window.removeEventListener("scroll", infiniteScroll);
    };
  }, [infinite, dispatch, user]);

  return (
    <div>
      <FeedModal />
      {loading && <Loading />}
      {error && <Error error={error} />}
      {list.length > 0 && <FeedPhotos />}
      {!infinite && !user && (
        <p
          style={{
            textAlign: "center",
            padding: "2rem 0 4rem 0",
            color: "#888",
          }}
        >
          Não existem mais postagens.
        </p>
      )}
    </div>
  );
};

Feed.defaultProps = {
  user: 0,
};

Feed.propTypes = {
  user: PropsTypes.oneOfType([
    PropsTypes.string.isRequired,
    PropsTypes.number.isRequired,
  ]),
};

export default Feed;
