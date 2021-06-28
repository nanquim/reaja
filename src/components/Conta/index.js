import React, { useEffect, useState } from 'react'
import firebase from '../../firebase'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: 80,
  },
}));

function Conta() {

  const classes = useStyles()
  
  /* const [ user, setUser ] = useState({}) */
  const [ displayName, setDisplayName ] = useState("")
  //const [ lastName, setLastName ] = useState("")
  const [ email, setEmail ] = useState("")
 
  /* TODO:
    > sobrenome nao é gravado pelo firebase auth
    > pegar tudo no objeto user ex.: setValues({ ...values, [name]: event.target.value }); 
    > alterar apenas os dados que foram modificados
      **o updateProfile só aceita displayName e PhotoUrl, ou seja, tem que alterar os metodos
      de criacao pra salvar tudo no db
    */
  useEffect(() => {
    // TODO pegar do contexto e não do firebase
    const { displayName, email } = firebase.getCurrentUser()
    setDisplayName(displayName)
    setEmail(email)   
    //console.log(firebase.getCurrentUser())
  }, [])

  const handleAlterar = () => {
    firebase.getCurrentUser().updateProfile({
      displayName: displayName,
    }).then(() => {
      console.log('\natualizado')
    })
  }

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="displayName"
        label="Nome"
        className={classes.textField}
        value={displayName}
        onChange={e => setDisplayName(e.target.value)}
        margin="normal"
      />
      {/*<TextField
        id="lastName"
        label="Sobrenome"
        value={"sobrenome"}
        onChange={e => setLastName('todo last name')}
        className={classes.textField}
        margin="normal"
      />*/}
      <TextField
        id="email"
        label="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className={classes.textField}
        margin="normal"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleAlterar}
        className={classes.submit}
      >
        Alterar
          </Button>
    </form>
  )
}

export default Conta
