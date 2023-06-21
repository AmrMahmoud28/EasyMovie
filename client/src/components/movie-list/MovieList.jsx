import React, { useEffect, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "../movie-card/MovieCard";
import MovieCardSkeleton from "../movie-card/MovieCardSkeleton";
import "./movie-list.scss";

import axios from "axios";

const MovieList = ({ category , id, isMovie = true}) => {
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

  let numOfMovies = 0;
  
  return (
    <div className="movie-list">
      <Swiper grabCursor={true} spaceBetween={10} slidesPerView={"auto"}>
        {isLoading ? Array(10).fill(<SwiperSlide><MovieCardSkeleton/></SwiperSlide>) : movies.map((item, key) => {
          return (
            ((category === item.movieGenre && numOfMovies < 10 && id !== item._id) &&(
              isMovie? numOfMovies++ : null,
              <SwiperSlide key={key}>
              <MovieCard
                movie={item}
                isAdded={(usersMovies.some(e => e.movieId === item._id))}
              />
            </SwiperSlide>
            ))
          );
        })}
      </Swiper>
    </div>
  );
};

export default MovieList;
