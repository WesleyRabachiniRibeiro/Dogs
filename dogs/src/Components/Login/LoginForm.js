import React from "react";
import { Link } from "react-router-dom";
import useForm from "../../Hooks/useForm";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import Error from "../Helper/Error";
import styles from "./LoginForm.module.css";
import stylesBtn from "../Forms/Button.module.css";
import Head from "../Helper/Head";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../store/user";

const LoginForm = () => {
  const username = useForm();
  const password = useForm();
  const dispatch = useDispatch();

  const {token, user} = useSelector(state => state)
  const loading = token.loading || user.loading
  const error = token.error || user.error

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username.validate() && password.validate()) {
      dispatch(userLogin({username: username.value, password: password.value}));
    }
  };

  return (
    <section className="animationLeft">
      <Head title="Login" />
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}
        <Error error={error && "Dados incorretos."} />
      </form>
      <Link to="forget" className={styles.forget}>
        Esqueceu a Senha?
      </Link>
      <div className={styles.signIn}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
        <Link to="create" className={stylesBtn.button}>
          Cadastro
        </Link>
      </div>
    </section>
  );
};

export default LoginForm;
