import React, { useEffect, useRef, useState } from "react";
import "./hero-slide.scss";
import Button, { OutlineButton } from "../button/Button";
import Modal from "../modal/Modal";
import { Link } from "react-router-dom";

const HeroSlide = ({ movie }) => {
  const heroRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      heroRef.current?.classList?.add("active");
    }, 700);
  }, []);

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div className="hero-slide">
      <div
        ref={heroRef}
        className="hero-slide__item"
        style={{
          backgroundImage: `url(${movie.movieBg})`,
        }}
      >
        <div className="hero-slide__item__content container">
          <div className="hero-slide__item__content__info">
            <Link to={`/detail/${movie?._id}`}>
              <h2 className="title">{movie.movieName}</h2>
            </Link>
            <div className="overview">{movie.movieOverview}</div>
            <div className="btns">
              <Link
                to={{
                  pathname: `/watch/${("" + movie.movieName)
                    .toLowerCase()
                    .replaceAll(" ", "-")}`,
                  moviePageUrl: movie.movieVideo,
                  movieBg: movie.movieBg,
                }}
              >
                <Button>
                  {movie.movieGenre?.split("-")[0] === "Series"
                    ? `Episode 1`
                    : `Watch now`}
                </Button>
              </Link>

              <OutlineButton onClick={toggleModal}>Watch trailer</OutlineButton>
              <Modal
                modal={modal}
                toggleModal={toggleModal}
                trailerSrc={movie.movieTrailer}
              />
            </div>
          </div>

          <div className="hero-slide__item__content__poster">
            <img src={movie.moviePoster} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlide;
