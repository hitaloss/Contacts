import { Button } from "@mui/material";

function CommonButton(props) {
  return (
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
      onClick={props.function}
    >
      {props.children}
    </Button>
  );
}

export default CommonButton;
