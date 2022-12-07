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
import SubmitButton from "../components/SubmitButton";
import { useHistory, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import phone from "../assets/phone.jpg";
import { toast } from "react-toastify";
import { useState } from "react";
import { loginSchema } from "../schema";

import axios from "axios";
import MainStack from "../components/MainStack";

function Login({ setIsLogged, isLogged }) {
  const BASEURL = "http://localhost:3001/";
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmitData = (data) => {
    const response = axios
      .post(`${BASEURL}session`, data)
      .then((res) => {
        localStorage.setItem("contacts@token", res.data.token);
        toast.success("Login bem sucedido!");
        setIsLogged(true);
        setTimeout(() => history.push("/dashboard"), 500);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Dados inválidos, verifique os campos");
      });
    return response;
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  if (isLogged) return <Redirect to="/dashboard" />;
  return (
    <MainStack image={phone} align="center">
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
          Login
        </Typography>

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
          <SubmitButton text="Enviar" />
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
            onClick={() => setTimeout(() => history.push("/register"), 500)}
          >
            Criar uma conta
          </Button>
        </Stack>
      </Stack>
    </MainStack>
  );
}

export default Login;
