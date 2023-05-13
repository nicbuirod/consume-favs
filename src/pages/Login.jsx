import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/input";
import { Button } from "../components/button";
import styles from "../styles/styles.module.scss";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.user.value;
    const password = e.target.password.value;

    loginCall(username, password);
  };

  const loginCall = async (username, password) => {
    const urlLogin = "https://favs-api-production.up.railway.app";

    try {
      const request = await axios.post(`${urlLogin}/user/login`, {
        username: `${username}`,
        password: `${password}`,

        // username: "user3@test.com",
        //password: "1234567a@",
      });

      const data = await request.data.token;

      localStorage.setItem("user", JSON.stringify(data));
      if (data) {
        navigate("/favs");
      }
    } catch (error) {
      alert("usuario o contraseña invalidos");
    }
  };
  return (
    <div className={styles.login}>
      <form onSubmit={handleSubmit}>
        <Input type="email" placeholder="e-mail" name="user" />
        <Input type="password" placeholder="Password" name="password" />
        <div className={styles.button_login}>
          <Button nameButton="Login" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default Login;
