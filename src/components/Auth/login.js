import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import firebase from "../../firebase";
import SvgIcon from "@material-ui/core/SvgIcon";
import { UsuarioContext } from '../../providers/UsuarioProvider'

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    textDecoration: "none",
    cursor: "pointer",
  },
}));

function Login() {
  const classes = useStyles();
  const usuarioContext = useContext(UsuarioContext);
  const history = useHistory();

  const [dadosUsuario, setDadosUsuario] = useState({
    email: "",
    senha: "",
  });

  const handleLogin = (e) => {
    e.preventDefault()

    //TODO tratar senha incorreta
    firebase.login(dadosUsuario.email, dadosUsuario.senha).then((res) => {
      usuarioContext.setUsuario(true);
    
      if(usuarioContext !== null) {
        history.push("/conta");
      }

    });
  };

  const handleResetPassword = () => {
    try {
      /* TODO verificar se email existe no bd */
      if (!dadosUsuario.email) {
        alert("Entre com email");
      } else {
        firebase.resetPassword(dadosUsuario.email);
        alert("Email enviado");
      }
      /* TODO */
      //MANDAR MSG EMAIL ENVIADO
    } catch (erro) {
      console.error(erro);
    }
  };

  const handleChange = (event) => {
    event.preventDefault()
    
    setDadosUsuario((dadosUsuario) => ({
      ...dadosUsuario,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <SvgIcon>
          <path d="btn_google" />
        </SvgIcon>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleLogin}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={dadosUsuario.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="senha"
            label="Senha"
            type="senha"
            id="senha"
            autoComplete="current-password"
            value={dadosUsuario.password}
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Typography
                className={classes.link}
                onClick={handleResetPassword}
              >
                Esqueceu a senha?
              </Typography>
            </Grid>
            <Grid item>
              <Link className={classes.link} to="/registro">
                {"Ainda não tem conta? Registre-se"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Login;
