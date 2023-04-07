import React from "react";
import "./movie-card.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import CloseIcon from '@mui/icons-material/Close';

import { Link } from "react-router-dom";
import Button from "../button/Button";
import axios from "axios";

const MovieCard = ({ movie, isList, isAdded, userMovieId}) => {

  const deleteList = async () =>{
    try {
      await axios.delete(`https://easymovie-api.herokuapp.com/api/user-list/delete/${(userMovieId && (userMovieId))}`);
      window.location.reload(true);
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <Link to={`/detail/${movie?._id}`}>
      <div
        className="movie-card"
        style={{ backgroundImage: `url(${movie?.moviePoster})` }}
      >
        <Button>
          <PlayArrowIcon sx={{ fontSize: 30 }} style={{ paddingTop: "5px" }} />
        </Button>

        {!isList ? (
          isAdded ? (
            <FavoriteOutlinedIcon className="addList" />
          ) : (
            <FavoriteBorderOutlinedIcon className="addList" />
          )
        ) : (<Link><i onClick={deleteList}><CloseIcon className="deleteList"/></i></Link>)
        }
      </div>
      <h3>{movie?.movieName}</h3>
    </Link>
  );
};

export default MovieCard;
