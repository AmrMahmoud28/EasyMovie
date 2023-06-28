import axios from "axios";
import React, { useEffect, useState } from "react";
import MovieCard from "../../components/movie-card/MovieCard";
import PageHeader from "../../components/page-header/PageHeader";
import MovieCardSkeleton from "../../components/movie-card/MovieCardSkeleton";

const Account = () => {

  const userId = (JSON.parse(localStorage.getItem("user")))["_id"];

  const [usersMovies, setUsersMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() =>{
    document.title = 'EasyMovie | My List'

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
        setIsLoading(false)
      } catch (error) {
        console.log(error);
      }
    }

    getUsersMovies();
    getMovies();
  },[userId])

  const isListEmpty = (usersMovies.length === 0);
  let index = 0;

  return (
    <>
      <PageHeader>My List</PageHeader>

      <div className="container">
        <div className="section mb-3">
          <div className="movie-grid">
            {isLoading? Array(6).fill(<MovieCardSkeleton/>) : isListEmpty ? (
              <h3>Your list is empty!</h3>
            ) : (
              usersMovies.map((item, key) =>{
                return(
                  index = movies.map(e => e._id).indexOf(item.movieId),

                  <MovieCard key={key} movie={movies[index]} isList={true} userMovieId={item._id}/>
                )
              })
            )}
          </div>
        </div>
      </div>
      <div style={{ paddingBottom: "1rem" }}></div>
    </>
  );
};

export default Account;

// ((usersMovies.some(e => e.movieId == item._id)) && (
//   <MovieCard key={index} movie={item} isList={true}/>
// ))