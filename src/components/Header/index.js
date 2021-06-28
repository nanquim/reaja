import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SvgIcon from "@material-ui/core/SvgIcon";
import { Link } from "react-router-dom";
import firebase from "../../firebase";
import TextField from '@material-ui/core/TextField'
import { UsuarioContext } from "../../providers/UsuarioProvider";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    margin: "0 auto",
    width: "40%",
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200,
      },
    },
  },
  accountBox: {
    position: "fixed",
    right: 0,
  } /* ,
    links: {
        textDecoration: 'none',
    } */,
}));

function Header({ query, change }) {
  const classes = useStyles();

  const usuarioContext = useContext(UsuarioContext)
  const history = useHistory()

 
  //const [auth, setAuth] = useState(false)
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [pesquisa, setPesquisa] = useState("");
  
  const open = Boolean(anchorEl);

  const handleLogout = async () => {
    firebase
      .logout()
      .then(res => {
        usuarioContext.setUsuario({})
        history.push('/')
      })
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link style={{ color: "inherit", textDecoration: "inherit" }} to="/">
            <SvgIcon>
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </SvgIcon>
          </Link>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Pesquisar…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "Search" }}
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
              onKeyPress={(e) => (e.key === "Enter" ? change(pesquisa) : null)}
            />
          </div>
          <div className={classes.accountBox}>
            <IconButton
              aria-label="Conta do usuário atual"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              {usuarioContext.autenticado ? (
                <div>
                  <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to={"/conta"}
                  >
                    Conta
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to={"/salvos"}
                  >
                    Salvos
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </div>
              ) : (
                <div>
                  <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to={"/login"}
                  >
                    Login
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to={"/registro"}
                  >
                    Registro
                  </MenuItem>
                </div>
              )}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
