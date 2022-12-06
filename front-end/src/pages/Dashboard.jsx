import {
  Stack,
  InputAdornment,
  TextField,
  IconButton,
  Typography,
  Button,
  AppBar,
  Toolbar,
  Skeleton,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import blackground from "../assets/blackground.jpg";
import SettingsIcon from "@mui/icons-material/Settings";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import CommonButton from "../components/CommonButton";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

function Dashboard() {
  const BASEURL = "http://localhost:3001/";
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("contacts@token");
  const name = localStorage.getItem("fullName");
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const getClientData = () => {
    const response = axios
      .get(`${BASEURL}clients/myaccount`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        localStorage.setItem("id", res.data.client.id);
        localStorage.setItem("fullName", res.data.client.fullName);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    return response;
  };

  useEffect(() => {
    getClientData();
  }, []);

  return (
    <>
      <Stack
        sx={{
          backgroundImage: `url(${blackground})`,
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
        <AppBar
          position="static"
          sx={{
            bgcolor: "#282c34",
          }}
        >
          <Toolbar>
            <Stack sx={{ flexGrow: 1 }}>
              <CommonButton
                function={() => {
                  localStorage.clear(),
                    setTimeout(() => history.push("/login"), 500);
                }}
              >
                {" "}
                Sair{" "}
              </CommonButton>
            </Stack>
            <IconButton size="large" edge="end" color="inherit">
              <SettingsIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Stack
          direction="column"
          p={12}
          height="100%"
          justifyContent="space-between"
        >
          <Stack direction="row">
            <Typography variant="h2">
              Olá,{" "}
              {loading ? (
                <Skeleton width="9rem" />
              ) : (
                name.split(" ").slice(0, 1)
              )}
            </Typography>
          </Stack>
          <Stack direction="column">
            <Stack direction="row" spacing={2} alignItems="end">
              <Typography variant="h3">Meus Contatos</Typography>
              <IconButton size="large">
                <AddIcon />
              </IconButton>
            </Stack>
            <Stack>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Word of the Day
                  </Typography>
                  <Typography variant="h5" component="div">
                    benevolent
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    adjective
                  </Typography>
                  <Typography variant="body2">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Stack>
          </Stack>
        </Stack>
        {/* <Stack
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
      </Stack> */}
      </Stack>
    </>
  );
}

export default Dashboard;
