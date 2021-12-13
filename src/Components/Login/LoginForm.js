import React from "react";
import { Link } from "react-router-dom";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import { handleRequest, setRequestParams } from "../../api";

const LoginForm = () => {
  const formFields = {
    username: useForm("email", true),
    password: useForm("password", true),
  };

  const validateForm = () => {
    let validForm = true;
    Object.values(formFields).forEach((formField) => {
      if (validForm && !formField.validate()) validForm = false;
    });
    return validForm;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const requestParams = setRequestParams(
      "POST",
      "/jwt-auth/v1/token",
      {
        username: formFields.username.value,
        password: formFields.password.value,
      },
      { "Content-Type": "Application/json" }
    );
    const response = handleRequest(requestParams);
  };

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Usuário"
          type="text"
          name="username"
          {...formFields.username}
        />
        <Input
          label="Senha"
          type="password"
          name="password"
          {...formFields.password}
        />
        <Button>Entrar</Button>
      </form>
      <Link to="/login/create">Cadastro</Link>
    </section>
  );
};

export default LoginForm;
