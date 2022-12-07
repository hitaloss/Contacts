import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Button,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SubmitButton from "../SubmitButton";

function ContactModal(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(props.schema) });

  return (
    <Dialog
      component="form"
      onSubmit={handleSubmit(props.contactFunction)}
      open={props.open}
      onClose={() => props.setOpen(false)}
    >
      <DialogTitle
        variant="h6"
        color="white"
        sx={{
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
            label="Email"
            placeholder="Email"
            variant="outlined"
            helperText={errors.email?.message}
            error={errors.email !== undefined ? true : false}
            sx={{
              borderRadius: "5px",
              width: "100%",
            }}
            {...register("email")}
          />
        </Stack>
      </DialogContent>
      <DialogActions
        sx={{
          margin: "auto",
          pb: "2rem",
        }}
      >
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
          Salvar Contato
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ContactModal;
