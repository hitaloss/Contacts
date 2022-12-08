import { Button } from "@mui/material";

function SubmitButton(props) {
  return (
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
      {props.text}
    </Button>
  );
}
export default SubmitButton;
