import React, { useCallback, useEffect, useState } from "react";
import MovieCard from "../movie-card/MovieCard";
import Input from "../input/Input";
import "./movie-grid.scss";
import "../movie-card/MovieCardSkeleton.jsx"
import { useHistory, useParams } from "react-router-dom";
import Button from "../button/Button";

import axios from "axios";
import MovieCardSkeleton from "../movie-card/MovieCardSkeleton.jsx";

const MovieGrid = (props) => {
  const { keyword } = useParams();

  const userId = (JSON.parse(localStorage.getItem("user")))["_id"];

  const [usersMovies, setUsersMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() =>{
    const getUsersMovies = async () =>{
      try {
        const res = await axios.get(`https://easymovie-api.herokuapp.com/api/user-list/${userId}`);
        setUsersMovies(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    const getMovies = async () =>{
      try {
        const res = await axios.get('https://easymovie-api.herokuapp.com/api/movie');
        setMovies(res.data)
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    
    getUsersMovies();
    getMovies();
  }, [userId])

  return (
    <>
      <div className="section mb-3">
        <MovieSearch keyword={keyword} category={props.category}/>
      </div>

      <div className="movie-grid">
        {/* eslint-disable-next-line */}
        {isLoading ? Array(20).fill(<MovieCardSkeleton/>) :
        movies.filter((value) =>{
          if(keyword === undefined){
            return value;
          }
          else if(value.movieName.toLowerCase().includes(keyword.toLowerCase())){
            return value;
          }
        }).map((item, key) => {
          return (
            (((props.category === item.movieGenre.toLowerCase()) || props.category === "all") && (
              <MovieCard key={key}
              movie={item}
              isAdded={(usersMovies.some(e => e.movieId === item._id))}
            />
            ))
          );
        })}
      </div>
    </>
  );
};

const MovieSearch = (props) => {
  const history = useHistory();

  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");

  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      history.push(`/movie/all/search/${keyword}`);
    }
    else{
      history.push(`/movie/${props.category}`);
    }
  }, [keyword, props.category, history]);

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      }
    };
    document.addEventListener("keyup", enterEvent);
    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [keyword, goToSearch]);

  return (
    <div className="movie-search">
      <Input
        type="text"
        placeholder="Enter Keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button className="small" onClick={goToSearch}>
        Search
      </Button>
    </div>
  );
};

export default MovieGrid;
