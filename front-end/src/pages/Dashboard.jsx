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
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import CommonButton from "../components/CommonButton";
import Card from "@mui/material/Card";
import DeleteIcon from "@mui/icons-material/Delete";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Redirect, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import blackground from "../assets/blackground.jpg";
import {
  contactSchema,
  contactEditSchema,
  clientUpdateSchema,
} from "../schema";
import axios from "axios";
import { useState, useEffect } from "react";
import ContactModal from "../components/ContactModal";
import ClientSettings from "../components/ClientSettings";

function Dashboard({ isLogged, setIsLogged }) {
  const BASEURL = "http://localhost:3001/";
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [confirm, setConfirm] = useState(false);

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

  const getContacts = () => {
    const response = axios
      .get(`${BASEURL}contacts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setContacts(res.data.contacts);
      })
      .catch((err) => {
        console.log(err);
      });
    return response;
  };

  const createContact = (data) => {
    const response = axios
      .post(`${BASEURL}contacts`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        getContacts();
      })
      .catch((err) => {
        console.log(err);
      });
    return response;
  };

  const updateContact = (data) => {
    const response = axios
      .patch(
        `${BASEURL}contacts/${localStorage.getItem("contacts@contactId")}/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        getContacts();
      })
      .catch((err) => {
        console.log(err);
      });
    return response;
  };

  const deleteContact = (contactId) => {
    const response = axios
      .delete(`${BASEURL}contacts/${contactId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        getContacts();
      })
      .catch((err) => {
        console.log(err);
      });
    return response;
  };

  const updateClient = (data) => {
    const response = axios
      .patch(`${BASEURL}clients`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        getClientData();
      })
      .catch((err) => {
        console.log(err);
      });
    return response;
  };

  const deleteClient = () => {
    const response = axios
      .delete(`${BASEURL}clients`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        localStorage.clear();
        toast.info("Conta deletada");
        setIsLogged(false);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
    return response;
  };

  useEffect(() => {
    getClientData();
    getContacts();
  }, []);

  if (isLogged === false) return <Redirect to="/" />;
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
            bgcolor: "transparent",
          }}
        >
          <Toolbar>
            <Stack sx={{ flexGrow: 1 }}>
              <CommonButton
                function={() => {
                  localStorage.clear();
                  setIsLogged(false);
                  setTimeout(() => history.push("/"), 500);
                }}
              >
                {" "}
                Sair{" "}
              </CommonButton>
            </Stack>
            <IconButton
              onClick={() => setOpenSettings(true)}
              size="large"
              edge="end"
              color="inherit"
            >
              <SettingsIcon />
            </IconButton>
            <ClientSettings
              schema={clientUpdateSchema}
              function={updateClient}
              open={openSettings}
              setOpen={setOpenSettings}
              title="Minha Conta"
              confirm={confirm}
              setConfirm={setConfirm}
              deleteClient={deleteClient}
              handleClickShowPassword={handleClickShowPassword}
              handleMouseDownPassword={handleMouseDownPassword}
              showPassword={showPassword}
            />
          </Toolbar>
        </AppBar>
        <Stack
          direction="column"
          p={12}
          height="100%"
          justifyContent="space-between"
        >
          <Stack>
            <Typography
              sx={{ display: "flex", direction: "row", gap: "2rem" }}
              color="white"
              variant="h2"
            >
              Olá,{" "}
              {loading ? (
                <Skeleton width="9rem" />
              ) : (
                name.split(" ").slice(0, 1)
              )}
            </Typography>
          </Stack>
          <Stack direction="column" spacing={5}>
            <Stack direction="row" spacing={2} alignItems="end">
              <Typography color="white" variant="h3">
                Meus Contatos
              </Typography>
              <IconButton onClick={() => setOpen(true)} size="large">
                <AddIcon />
              </IconButton>
              <ContactModal
                schema={contactSchema}
                contactFunction={createContact}
                setOpen={setOpen}
                title="Criar contato"
                open={open}
              />
            </Stack>
            <Stack direction="row" spacing={4} overflow="auto" pb="0.5rem">
              {contacts.length > 0 ? (
                contacts.map((item) => (
                  <Card
                    key={item.id}
                    sx={{ minWidth: 275, width: "22%", maxWidth: "20rem" }}
                  >
                    <CardContent>
                      <Typography variant="h4" component="div">
                        {item.fullName.length > 14
                          ? item.fullName.substring(0, 14) + "..."
                          : item.fullName}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {item.phone.replace(
                          /(\d{2})(\d{5})(\d{4})/,
                          "($1) $2-$3"
                        )}
                      </Typography>
                      <Typography
                        sx={{
                          textDecoration: "underline",
                          overflowWrap: "break-word",
                        }}
                      >
                        {item.email}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <IconButton
                        onClick={() => {
                          localStorage.setItem("contacts@contactId", item.id),
                            setOpenEdit(true);
                        }}
                      >
                        <SettingsIcon />
                      </IconButton>
                      <ContactModal
                        schema={contactEditSchema}
                        contactFunction={updateContact}
                        setOpen={setOpenEdit}
                        title="Editar contato"
                        open={openEdit}
                      />
                      <IconButton onClick={() => deleteContact(item.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                ))
              ) : (
                <Skeleton
                  variant="rectangular"
                  height="12.369rem"
                  width="12.369rem"
                />
              )}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}

export default Dashboard;
