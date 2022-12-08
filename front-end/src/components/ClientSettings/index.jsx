import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
  IconButton,
  Stack,
  Button,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function ClientSettings(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(props.schema) });

  const confirmDelete = () => {
    if (props.confirm) {
      props.deleteClient();
      console.log("deletado");
    } else {
      props.setConfirm(true);
    }
  };

  return (
    <Dialog
      component="form"
      onSubmit={handleSubmit(props.function)}
      open={props.open}
      onClose={() => {
        props.setOpen(false);
        setTimeout(() => props.setConfirm(false), 500);
      }}
    >
      <DialogTitle
        variant="h6"
        sx={{
          color: "white",
          textAlign: "center",
          fontSize: {
            xs: "1rem",
            sm: "1.25rem",
          },
        }}
      >
        {props.title}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} alignItems="center" padding={4}>
          <TextField
            label="Nome"
            placeholder="Nome completo"
            variant="outlined"
            helperText={errors.fullName?.message}
            error={errors.fullName !== undefined ? true : false}
            sx={{
              width: "100%",
            }}
            {...register("fullName")}
          />

          <TextField
            label="Telefone"
            placeholder="(20) 99999-9999"
            variant="outlined"
            helperText={errors.phone?.message}
            error={errors.phone !== undefined ? true : false}
            sx={{
              width: "100%",
            }}
            {...register("phone")}
          />

          <TextField
            label="Password"
            placeholder="••••••••••••"
            variant="outlined"
            helperText={errors.password?.message}
            error={errors.password !== undefined ? true : false}
            type={props.showPassword ? "text" : "password"}
            sx={{
              borderRadius: "5px",
              width: "100%",
            }}
            {...register("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    color="white"
                    onClick={props.handleClickShowPassword}
                    onMouseDown={props.handleMouseDownPassword}
                  >
                    {props.showPassword ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions
        sx={{
          margin: "auto",
          p: "0 2rem 2rem 2rem",
        }}
      >
        <Button
          color={props.confirm ? "error" : "warning"}
          onClick={confirmDelete}
          sx={{
            padding: ".6rem",
            width: "12rem",
            borderRadius: "30px",
          }}
          variant="outlined"
        >
          {props.confirm ? "Tem certeza?" : "Deletar Conta"}
        </Button>
        <Button
          type="submit"
          onClick={() => props.setOpen(false)}
          sx={{
            padding: ".6rem",
            width: "12rem",
            borderColor: "white",
            borderRadius: "30px",
            color: "white",
          }}
          variant="outlined"
        >
          Salvar Alterações
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ClientSettings;
