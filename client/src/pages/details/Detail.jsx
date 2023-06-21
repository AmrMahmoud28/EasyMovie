import React, { useEffect, useState } from "react";
import "./detail.scss";

import { Link, useParams } from "react-router-dom";
import Button, { OutlineButton } from "../../components/button/Button";
import Modal from "../../components/modal/Modal";
import MovieList from "../../components/movie-list/MovieList";
import DetailSkeleton from "./DetailSkeleton";
import axios from "axios";

const Detail = () => {
  const [added, setAdded] = useState(false);

  const { id: movieId } = useParams();
  const userId = JSON.parse(localStorage.getItem("user"))["_id"];

  const [usersMovie, setUsersMovie] = useState([]);
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [seasons, setSeasons] = useState([]);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const getUsersMovie = async () => {
      try {
        const res = await axios.get(
          `https://easymovie-api.herokuapp.com/api/user-list/${userId}/${movieId}`
        );
        setAdded(res.data.length > 0);
        setUsersMovie(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    const getMovie = async () => {
      try {
        const res = await axios.get(
          `https://easymovie-api.herokuapp.com/api/movie/find/${movieId}`
        );
        setMovie(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getUsersMovie();
    getMovie();

    if (movie.movieGenre?.split("-")[0] === "Series") {
      fetch("https://easymovie-cors.herokuapp.com/" + movie.movieVideo)
        .then((response) => response.text())
        .then((text) => {
          const season = text
            ?.split('<a class="selected" href="')[1]
            ?.split("</a></div>")[0]
            ?.split('</a><a class="hoverable activable" href="');

          setSeasons(season);

          setEpisodes(
            text
              ?.split(
                season == undefined
                  ? '<div class="Episodes--Seasons--Episodes Full--Width"><a class="hoverable activable" href="'
                  : '<div class="Episodes--Seasons--Episodes"><a class="hoverable activable" href="'
              )[1]
              ?.split("</a></div>")[0]
              ?.split('</a><a class="hoverable activable" href="')
          );
        });
    }
  }, [userId, movieId]);

  const [modal, setModal] = useState(false);
  const [seasonActive, setSeasonActive] = useState(0);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handelSeason = (index, link) => {
    setSeasonActive(index);

    try {
      fetch("https://easymovie-cors.herokuapp.com/" + link)
        .then((response) => response.text())
        .then((text) => {
          setEpisodes(
            text
              ?.split(
                '<div class="Episodes--Seasons--Episodes"><a class="hoverable activable" href="'
              )[1]
              ?.split("</a></div>")[0]
              ?.split('</a><a class="hoverable activable" href="')
          );
        });
    } catch (error) {
      console.log(error);
    }
  };

  const addList = async () => {
    try {
      await axios.post(
        "https://easymovie-api.herokuapp.com/api/user-list/add",
        { userId, movieId }
      );
      setAdded(!added);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteList = async () => {
    try {
      await axios.delete(
        `https://easymovie-api.herokuapp.com/api/user-list/delete/${usersMovie?._id}`
      );
      setAdded(!added);
    } catch (error) {
      console.log(error);
    }
  };

  // const frameRef = useRef(null);
  // useEffect(() => {
  //   try {
  //     setTimeout(() => {
  //       frameRef.current.classList.add("active");
  //     }, 4000);
  //   } catch (error) {
  //   }
  // }, []);

  return (
    <>
      <div
        className="banner"
        style={{ backgroundImage: `url(${movie.movieBg})` }}
      >
        {/* <iframe ref={frameRef} src={`${movie.movieTrailer}?autoplay=1&controls=0&mute=1&loop=1&playlist=${Data[movieId].movieTrailer.split("/")[4]}`} width="100%" height="83%" title="trailer" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" allowfullscreen allow="autoplay"></iframe> */}
      </div>

      {isLoading ? (
        <DetailSkeleton />
      ) : (
        <div className="mb-3 movie-content container">
          <div className="movie-content__poster">
            <div
              className="movie-content__poster__img"
              style={{ backgroundImage: `url(${movie.moviePoster})` }}
            ></div>
          </div>

          <div className="movie-content__info">
            <h1 className="title">{movie.movieName}</h1>

            <div className="genres">
              <Link to={`/movie/${("" + movie.movieGenre).toLowerCase()}`}>
                <span className="genres__item genre">{movie.movieGenre}</span>
              </Link>
              <span className="genres__item">{movie.movieLimit}</span>
              <span className="genres__item">{`${movie.movieRating} / 10`}</span>
              <span className="genres__item">{`${movie.movieDuration} min`}</span>
              <span className="genres__item">{movie.movieDate}</span>
            </div>

            <p className="overview">{movie.movieOverview}</p>

            <div className="btns">
              <Link
                to={{
                  pathname: `/watch/${("" + movie.movieName)
                    .toLowerCase()
                    .replaceAll(" ", "-")}`,
                  moviePageUrl: movie.movieGenre?.split("-")[0] === "Series"? episodes[0].split('">')[0] : movie.movieVideo,
                  movieBg: movie.movieBg,
                }}
              >
                <Button>{movie.movieGenre?.split("-")[0] === "Series"? `Episode 1` : `Watch now`}</Button>
              </Link>

              <OutlineButton onClick={toggleModal}>Watch trailer</OutlineButton>
              <Modal
                modal={modal}
                toggleModal={toggleModal}
                trailerSrc={movie.movieTrailer}
              />

              <OutlineButton
                className="small"
                onClick={added ? deleteList : addList}
              >
                {added ? `Remove from list` : `Add to list`}
              </OutlineButton>
            </div>
          </div>
        </div>
      )}

      {movie.movieGenre?.split("-")[0] === "Series" && (
        <>
          <div style={{ paddingBottom: "3rem" }}></div>

          <div className="container">
            <div className="section mb-3">
              <div className="section__header mb-2">
                <h2>Episodes</h2>
              </div>
              <div className="eps-seasons">
                <div className="episodes">
                  <div className="btns">
                    {episodes?.map((item, key) => {
                      return (
                        <Link
                          key={key}
                          to={{
                            pathname: `/watch/${("" + movie.movieName)
                              .toLowerCase()
                              .replaceAll(" ", "-")}`,
                            moviePageUrl: item.split('">')[0],
                            movieBg: movie.movieBg,
                          }}
                        >
                          <OutlineButton className="btn">
                            {`Episode ${episodes.length - key}`}
                          </OutlineButton>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div className="seasons">
                  <div className="btns">
                    {seasons?.map((item, key) => {
                      return (
                        <OutlineButton
                          key={key}
                          className={seasonActive == key ? "active" : null}
                          onClick={() => handelSeason(key, item.split('">')[0])}
                        >
                          {`Season ${key + 1}`}
                        </OutlineButton>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div style={{ paddingBottom: "6rem" }}></div>

      <div className="container">
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Similar</h2>
          </div>

          <MovieList category={movie.movieGenre} id={movie._id} />
        </div>
      </div>

      <div style={{ paddingBottom: "1.5rem" }}></div>
    </>
  );
};

export default Detail;
