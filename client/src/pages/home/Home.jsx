import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { OutlineButton } from "../../components/button/Button";

import HeroSlide from "../../components/hero-slide/HeroSlide";
import HeroSlideSkeleton from "../../components/hero-slide/HeroSlideSkeleton";
import MovieList from "../../components/movie-list/MovieList";

import axios from "axios";

const Home = () => {

  const [movie, setMovie] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() =>{
    const getRandomMovie = async () =>{
      try {
        const res = await axios.get('https://easymovie-api.herokuapp.com/api/movie/random');
        setMovie(res.data)
        setIsLoading(false)
      } catch (error) {
        console.log(error);
      }
    }
    getRandomMovie();
  }, [])

  return (
    <>
      {isLoading ? <HeroSlideSkeleton/> : <HeroSlide movie={movie}/>}

      <div className="container">
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Action Movies</h2>
            <Link to="/movie/action">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category="Action"/>
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Comedy Movies</h2>
            <Link to="/movie/comedy">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category="Comedy"/>
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Horror Movies</h2>
            <Link to="/movie/horror">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category="Horror"/>
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Animation Movies</h2>
            <Link to="/movie/animation">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category="Animation"/>
        </div>
        <div style={{paddingBottom: '1.5rem'}}></div>
      </div>
    </>
  );
};

export default Home;
