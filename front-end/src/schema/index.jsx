import * as yup from "yup";

export const registerSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Campo obrigatório")
    .min(3, "Seu nome deve possuir no mínimo 3 caracteres")
    .max(60, "Seu nome deve possuir no máximo 60 caracteres")
    .matches(/^[a-zA-Z\s]*$/, "Seu nome deve haver apenas letras"),
  email: yup
    .string()
    .required("Campo obrigatório")
    .max(40, "Email inválido")
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Email inválido"
    ),
  phone: yup
    .string()
    .required("Campo obrigatório")
    .max(20, "Telefone inválido")
    .matches(/^[0-9]*$/, "Seu telefone deve haver apenas números"),
  password: yup
    .string()
    .required("Campo obrigatório")
    .min(6, "Mínimo de 6 caracteres"),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Campo obrigatório")
    .max(40, "Email inválido")
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Email inválido"
    ),
  password: yup
    .string()
    .required("Campo obrigatório")
    .min(6, "Mínimo de 6 caracteres"),
});
