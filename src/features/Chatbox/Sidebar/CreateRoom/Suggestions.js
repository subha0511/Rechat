import { Typography, IconButton, Grid } from "@mui/material";
import { MdAddCircleOutline } from "react-icons/md";
import { useAuth } from "../../../../context/AuthContext";
import { sendFriendRequest } from "../../../../firebase/userQuery";

const Suggestions = ({ data }) => {
  const { user } = useAuth();

  const sendRequest = async () => {
    try {
      await sendFriendRequest(user, { email: data });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Grid container className="suggestion-wrapper">
        <Grid item xs>
          <Typography variant="body1">{data}</Typography>
        </Grid>
        <Grid item xs={2} className="open-profile">
          <IconButton onClick={sendRequest}>
            <MdAddCircleOutline style={{ fontSize: 30, color: "#00d656" }} />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
};

export default Suggestions;
