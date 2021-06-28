import React, { useState, useEffect } from 'react'
import { GetNoticiasTop, GetNoticiasQuery } from '../../services/newsapi'
import { trataDatas } from '../../util'
import Noticia from '../Noticia'

function Feed({ query }) {

    const [noticias, setNoticias] = useState([])
    //TODO o contexto do usuário, mas só para as personalizações de estilo, como o saved
    useEffect(() => {
        const fetchNoticias = async () => {
            const resp = (typeof query === 'undefined' || query.length <= 0) ? await GetNoticiasTop() : await GetNoticiasQuery(query)
            const noticias = resp.map(item => {
              /*  item.title = trataTitulos(item.title) */
               item.publishedAt = trataDatas(item.publishedAt)
               return item
            })
            setNoticias(noticias)
        }
        fetchNoticias()
    }, [query])

    const remove = async (e) =>  {
      await setNoticias(noticias.filter(i => i !== e))
    }
   
    return (
        noticias.map((noticia, index) => (
             <Noticia 
                key={index} 
                item={noticia} 
                remove={remove} 
               />
            ))
    )
}

export default Feed
