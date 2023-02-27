import React, {useEffect, useState} from "react";
import MovieRow from "./components/movieRow";
import Tmdb from "./Tmdb";
import './App.css'
import FeatureMovie from "./components/featureMovie";
import Header from "./components/Header";



export default () => {

  const [movieList, setMovieList] = useState([])
  const [featureData, setFeatureData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)

  useEffect(() => {
    const scrollListener = () =>{
      if(window.scrollY > 100){
        setBlackHeader(true);
      }else{
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener)
    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  })

  useEffect(() =>{
    const loadAll = async () => {
      let list = await Tmdb.getHomeList()
      setMovieList(list)

      let originals = list.filter(movie => movie.slug === "originals")
      let randomChosen = Math.floor(Math.random() * originals[0].items.results.length -1)
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
      setFeatureData(chosenInfo)
      console.log(list)
    }

    loadAll()
  },[])

  
  return(
    
    <div className="page">
      <Header black={blackHeader}/>
      {featureData && <FeatureMovie item={featureData}/>}
      <section className="lists">
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items}></MovieRow>
        ))}
      </section>
      <footer>
        Feito com <span role="img" aria-label="coração">💚</span> por Gabriel Reis<br/>
        Direitos de imagem para Netflix<br/>
        Dados pegos do site Themoviedb.org
      </footer>

      {movieList.length <= 0 &&
      <div className="loading">
        <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="carregando" />
      </div>}
    </div>
  );
}