import { Task as TaskIcon } from "@mui/icons-material";
import { AppBar, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { server } from "../constants/config";
import toast from "react-hot-toast";
import { userExist } from "../redux/reducers/auth";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const { data } = await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });
      toast.success(data.message);
      dispatch(userExist(null));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <AppBar position="static">
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ backgroundColor: "black", height: "80px", padding: "2rem" }}
      >
        <TaskIcon sx={{ fontSize: "3.5rem" }} />
        <Typography variant="h4">Task Management</Typography>
        {user ? (
          <Link to={"#"} className="link" onClick={handleLogout}>
            Logout
          </Link>
        ) : (
          <Link to={"/login"} className="link">
            Login
          </Link>
        )}
      </Stack>
    </AppBar>
  );
};

export default Header;
