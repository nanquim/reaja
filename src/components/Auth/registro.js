import React, { useContext, useState } from 'react';
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import firebase from '../../firebase'
import { UsuarioContext } from '../../providers/UsuarioProvider'

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Registro() {
  const classes = useStyles();

  const usuarioContext = useContext(UsuarioContext)
  const history = useHistory()

  const [dadosUsuario, setDadosUsuario] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    senha: "",
  });
  
  const handleRegistrar = (e) => {
    e.preventDefault()
        
    firebase
      .registrar({ dadosUsuario })
      .then(res => {
        console.log('res registro', res)

        usuarioContext.setUsuario(res)
        
        // TODO qual a melhor abordagem para testar se o estado do contexto?
        if(usuarioContext !== null || usuarioContext !== 'undefined'){
          history.push('/conta')
        }
      })
      .catch(e => console.log(e))
	}

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
          Registro
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleRegistrar}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="nome"
                variant="outlined"
                required
                fullWidth
                id="nome"
                label="Nome"
                autoFocus
                value={dadosUsuario.nome}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="sobrenome"
                label="Sobrenome"
                name="sobrenome"
                autoComplete="lname"
                value={dadosUsuario.sobrenome}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={dadosUsuario.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="senha"
                label="Senha"
                type="senha"
                id="senha"
                autoComplete="current-password"
                value={dadosUsuario.senha}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Registro
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Já tem conta? Logue-se
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Registro