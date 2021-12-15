import React from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import { CREATE_USER_REQUEST } from "../../api";
import { validateForm } from "../../functions";
import { UserContext } from "../../UserContext";
import useApi from "../../Hooks/useApi";
import Error from "../../Helpers/Error";

const LoginCreate = () => {
  const formFields = {
    username: useForm(),
    email: useForm("email"),
    password: useForm("password"),
  };

  const { error, loading, handleRequest } = useApi();

  const { userLogin } = React.useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm(formFields)) {
      return;
    }

    await handleRequest(CREATE_USER_REQUEST(), {
      username: formFields.username.value,
      email: formFields.email.value,
      password: formFields.password.value,
    });

    if (!error) {
      userLogin(formFields.username.value, formFields.password.value);
    }
  };

  return (
    <section className="animeLeft">
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Usuário"
          type="text"
          name="username"
          {...formFields.username}
        />
        <Input label="E-mail" type="email" name="email" {...formFields.email} />
        <Input
          label="Senha"
          type="password"
          name="password"
          {...formFields.password}
        />
        {loading ? (
          <Button disabled>Cadastrando...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}
        {error && <Error error={error} />}
      </form>
    </section>
  );
};

export default LoginCreate;
