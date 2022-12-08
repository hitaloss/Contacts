import { Stack } from "@mui/material";

function MainStack(props) {
  return (
    <Stack
      px={8}
      justifyContent="center"
      alignItems={props.align}
      spacing={4}
      sx={{
        backgroundImage: `url(${props.image})`,
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
      {props.children}
    </Stack>
  );
}

export default MainStack;
