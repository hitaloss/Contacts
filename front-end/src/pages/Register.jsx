import {
  Stack,
  InputAdornment,
  TextField,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import phone from "../assets/phone.jpg";
import { toast } from "react-toastify";
import { useState } from "react";
import * as yup from "yup";
import axios from "axios";

function Register() {
  const BASEURL = "http://localhost:3001/";
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);

  const schema = yup.object().shape({
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmitData = (data) => {
    const response = axios
      .post(`${BASEURL}clients`, data)
      .then(() => {
        toast.success("Cadastro bem sucedido! Redirecionando para o login...");
        setTimeout(() => history.push("/login"), 3000);
      })
      .catch((err) => {
        err.response.data.message === "Email already exists"
          ? toast.error("Email já existente")
          : toast.error("Dados inválidos, verifique os campos");
      });
    return response;
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  return (
    <Stack
      px={8}
      justifyContent="center"
      alignItems="center"
      spacing={4}
      sx={{
        backgroundImage: `url(${phone})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        position: "absolute",
        top: "0px",
        left: "0px",
        width: "100%",
        height: "100%",
      }}
    >
      <Stack
        justifyContent="center"
        alignItems="center"
        spacing={4}
        width="100%"
        textAlign="center"
        component="form"
        onSubmit={handleSubmit(onSubmitData)}
      >
        <Typography variant="h3" width="14rem" color="white">
          Cadastro
        </Typography>
        <TextField
          sx={{
            width: "17rem",
          }}
          label="Nome completo"
          placeholder="Nome completo"
          variant="outlined"
          helperText={errors.fullName?.message}
          InputLabelProps={{
            shrink: true,
          }}
          error={errors.fullName !== undefined ? true : false}
          {...register("fullName")}
        />

        <TextField
          sx={{
            width: "17rem",
          }}
          label="Email"
          placeholder="Digite aqui seu email"
          variant="outlined"
          helperText={errors.email?.message}
          InputLabelProps={{
            shrink: true,
          }}
          error={errors.email !== undefined ? true : false}
          {...register("email")}
        />

        <TextField
          sx={{
            width: "17rem",
          }}
          label="Telefone"
          placeholder="Digite aqui seu telefone"
          variant="outlined"
          helperText={errors.phone?.message}
          InputLabelProps={{
            shrink: true,
          }}
          error={errors.phone !== undefined ? true : false}
          {...register("phone")}
        />

        <TextField
          sx={{
            width: "17rem",
          }}
          label="Senha"
          placeholder="••••••••••••"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          helperText={errors.password?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  color="white"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            shrink: true,
          }}
          error={errors.password !== undefined ? true : false}
          {...register("password")}
        />

        <Stack direction="column" alignItems="center" spacing={2} width="20%">
          <Button
            type="submit"
            sx={{
              padding: ".6rem",
              width: "12rem",
              borderColor: "white",
              borderRadius: "30px",
              color: "white",
            }}
            variant="outlined"
          >
            Fazer cadastro
          </Button>
          <Button
            size="small"
            sx={{
              padding: ".4rem",
              width: "9rem",
              borderColor: "white",
              borderRadius: "30px",
              color: "white",
              fontSize: "10px",
            }}
            variant="outlined"
            onClick={() => setTimeout(() => history.push("/login"), 500)}
          >
            Já tenho uma conta
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Register;
