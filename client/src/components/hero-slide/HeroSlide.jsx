import React, { useEffect, useRef, useState } from "react";
import SwiperCore, { Autoplay } from "swiper";
import { SwiperSlide, Swiper } from "swiper/react";
import "./hero-slide.scss";
import Button, { OutlineButton } from "../button/Button";
import Modal from "../modal/Modal";
import { Link } from "react-router-dom";
import logo from "../../assets/mini-logo.svg"

const HeroSlide = ({ movie }) => {
  SwiperCore.use([Autoplay]);
  const heroRef = useRef(null);

  // const [isActive, setIsActive] = useState(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     // heroRef.current?.classList?.add("active");
  //     // setIsActive(true);
  //   }, 700);
  // }, []);

  const [modal, setModal] = useState(false);
  const [trailerIndex, setTrailerIndex] = useState(0);

  const toggleModal = (index = 0) => {
    setModal(!modal);
    setTrailerIndex(index);
  };

  return (
    <div className="hero-slide">
      <Swiper
        speed={1500}
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 4000 }}
      >
        {movie.map((item, key) => (
          <SwiperSlide key={key}>
            {({ isActive }) => (
              <div
                className={`hero-slide__item ${isActive && "active"}`}
                style={{
                  backgroundImage: `url(${item.movieBg})`,
                }}
              >
                <div className="hero-slide__item__content container">
                  <div className="hero-slide__item__content__info">
                    <div className="logo">
                      <img src={logo} alt="" className="logoImg"/>
                      <h3>{`${item?.movieGenre?.split("-")[0] === "Series"? 'SERIES' : 'MOVIE'}`}</h3>
                    </div>
                    
                    <Link to={`/detail/${item?._id}`}>
                      <h2 className="title">{item.movieName}</h2>
                    </Link>
                    <div className="overview">{item.movieOverview}</div>
                    <div className="btns">
                      <Link
                        to={
                          item.movieGenre?.split("-")[0] === "Series"
                            ? `/detail/${item?._id}`
                            : {
                                pathname: `/watch/${("" + item.movieName)
                                  .toLowerCase()
                                  .replaceAll(" ", "-")}`,
                                moviePageUrl: item.movieVideo,
                                movieBg: item.movieBg,
                              }
                        }
                      >
                        <Button>Watch now</Button>
                      </Link>

                      <OutlineButton onClick={(index) => toggleModal(key)}>
                        Watch trailer
                      </OutlineButton>
                    </div>
                  </div>

                  <div className="hero-slide__item__content__poster">
                    <img src={item.moviePoster} alt="" />
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <Modal
        modal={modal}
        toggleModal={toggleModal}
        // trailerSrc={item?.movieTrailer}
        trailerSrc={movie}
        index={trailerIndex}
      />
    </div>
  );
};

export default HeroSlide;
