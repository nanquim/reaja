const API_KEY = 'apiKey' + process.env.API_KEY
//const QUERY_ALL_BR = 'https://newsapi.org/v2/top-headlines?country=br&'
const QUERY_ALL_BR = 'https://newsapi.org/v2/top-headlines?language=pt&'

export const GetNoticiasTop = async () => {
    
    const request = QUERY_ALL_BR + API_KEY
    //console.log(request)
    const noticias = await fetch(`${request}`).then(res => res.json())
        
    /* console.log(noticias.articles) */
   // console.log('\nget top\n')
    return noticias.articles
}

export const GetNoticiasQuery = async (query) => {
    
    const QUERY_SEARCH = `https://newsapi.org/v2/everything?q=${query}&language=pt&`
    const request = QUERY_SEARCH + API_KEY
    
    const noticias = await fetch(`${request}`).then(res => res.json())
    console.log('\nget query\n')
    /* console.log(noticias.articles) */

    return noticias.articles
}
