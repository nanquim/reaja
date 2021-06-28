import React, { useEffect, useState } from 'react'
import firebase from '../../firebase'
import Noticia from '../Noticia'

function Salvos() {

  const [ salvos, setSalvos] = useState([])
  const [ vazio, setVazio] = useState(false)

  useEffect(() => {
    const currentUser = firebase.getCurrentUser().uid
    const arr = []

    firebase.getDb()
      .ref("/salvos")
      .orderByChild("usuario")
      .equalTo(currentUser)
      .once("value", snapshot => {
        if(!snapshot.exists()){
           setVazio(true)
        } else if (snapshot.val()) {
          snapshot.forEach(snap => {
            /* console.log('snap..\n')
            console.log(snap.val().noticia) */
            arr.push(snap.val())
          })
        }
      }).then(() => {
        setSalvos(arr)
      })
  }, [])

  const remove = async (e) => {
    /* TODO a estrutra vem diferente...  */
    console.log('userSalvos\n')
    console.log(salvos)
    await setSalvos(setSalvos.filter(i => i !== e))
  }

  /* TODO remover o icone de salvar aqui.. 
    Testar e estilizar vazio
  */
  if(vazio){
    return <div>Você ainda não salvou nada</div>
  } else {
    return (
      salvos.map((item, index) => (
        <Noticia
          key={index}
          item={item.noticia}
          remove={remove}
        />
      ))
    );
  }
}

export default Salvos 
