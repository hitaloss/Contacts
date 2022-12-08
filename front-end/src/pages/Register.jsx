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
import { useHistory, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import phone from "../assets/phone.jpg";
import { toast } from "react-toastify";
import { useState } from "react";
import { registerSchema } from "../schema";
import axios from "axios";
import MainStack from "../components/MainStack";

function Register({ isLogged }) {
  const BASEURL = "http://localhost:3001/";
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema) });

  const onSubmitData = (data) => {
    const response = axios
      .post(`${BASEURL}clients`, data)
      .then(() => {
        toast.success("Cadastro bem sucedido! Redirecionando para o login...");
        setTimeout(() => history.push("/login"), 3000);
      })
      .catch((err) => {
        console.log(err);
        err.response.data.message === "This email already exists"
          ? toast.error("Email já existente")
          : toast.error("Dados inválidos, verifique os campos");
      });
    return response;
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  if (isLogged)
    return setTimeout(() => {
      <Redirect to="/dashboard" />;
    }, 300);

  return (
    <MainStack image={phone}>
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
    </MainStack>
  );
}

export default Register;
