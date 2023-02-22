import React from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import styles from "../User/UserPhotoPost.module.css";
import useForm from "../../Hooks/useForm";
import Error from "../Helper/Error";
import { useNavigate } from "react-router-dom";
import Head from "../Helper/Head";
import { useDispatch, useSelector } from "react-redux";
import { photoPost } from "../../store/photoPost";

function UserPhotoPost() {
  const name = useForm();
  const weight = useForm("number");
  const age = useForm("number");
  const [img, setImg] = React.useState({});
  const { data, error, loading } = useSelector((state) => state.photoPost);
  const { token } = useSelector((state) => state.token.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (data) navigate("/account");
  }, [data, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("img", img.raw);
    formData.append("nome", name.value);
    formData.append("peso", weight.value);
    formData.append("idade", age.value);
    dispatch(photoPost({ formData, token }));
  };

  const handleImgChange = ({ target }) => {
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0],
    });
  };

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <Head title="Poste sua foto" />
      <form onSubmit={handleSubmit}>
        <Input label="Nome" type="text" name="nome" {...name} />
        <Input label="Peso" type="text" name="peso" {...weight} />
        <Input label="Idade" type="text" name="idade" {...age} />
        <input
          className={styles.file}
          type="file"
          name="img"
          id="img"
          onChange={handleImgChange}
        />
        {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Enviar</Button>
        )}
        <Error error={error} />
      </form>
      <div>
        {img.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url(${img.preview})` }}
          ></div>
        )}
      </div>
    </section>
  );
}

export default UserPhotoPost;
