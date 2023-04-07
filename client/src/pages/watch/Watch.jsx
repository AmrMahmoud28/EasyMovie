import React, { useEffect, useState } from "react";
import "./watch.scss";

import { Link, useLocation } from "react-router-dom";

const Watch = () => {
  const [movieUrl, setMovieUrl] = useState();
  const location = useLocation();
  const moviePageUrl = location?.moviePageUrl;
  const movieBg = location?.movieBg;

  // const [isMyServer, setIsMyServer] = useState(true);
  const [resolution, setResolution] = useState(0);

  // useEffect(()=> {
  //   fetch(
  //     'https://easymovie-cors.herokuapp.com/https://myciiima.homes/watch/%d9%85%d8%b4%d8%a7%d9%87%d8%af%d8%a9-%d9%81%d9%8a%d9%84%d9%85-puss-in-boots-the-last-wish-2022-%d9%85%d8%aa%d8%b1%d8%ac%d9%85/'
  //   )
  //     .then((response) => response.text())
  //     .then((text) =>
  //       {const url = [];
  //       for(let i = 1; i <= 3; i++){
  //         url.push((
  //           text
  //             .split('<a class="hoverable activable" target="_blank" href=')[i]
  //             .split(
  //               '><quality>'
  //             )[0]
  //             .replaceAll('"', "")
  //         ))
  //       }
  //       console.log(url)
  //       setMovieUrl(url)
  //     }
  //     );
  // }, [])

  useEffect(() => {
    // fetch("https://easymovie-cors.herokuapp.com/" + moviePageUrl)
    fetch(moviePageUrl)
      .then((response) => response.text())
      .then((text) => {
        const url = [];
        for (let i = 1; i <= 3; i++) {
          url.push(
            text
              ?.split('<a class="hoverable activable" target="_blank" href=')
              [i]?.split("><quality>")[0]
              ?.replaceAll('"', "")
          );
        }
        setMovieUrl(url);
      });
  }, [moviePageUrl]);

  return (
    <div className="watch">
      <div className="back">
        <Link to="/">Home</Link>

      <div className="resolutions">
          <div className={`resolution1 ${resolution === 0 ? "active" : null}`}>
            <p onClick={() => setResolution(0)}>1080p</p>
          </div>
          <div className={`resolution2 ${resolution === 1 ? "active" : null}`}>
            <p onClick={() => setResolution(1)}>720p</p>
          </div>
          <div className={`resolution3 ${resolution === 2 ? "active" : null}`}>
            <p onClick={() => setResolution(2)}>480p</p>
          </div>
      </div>
      </div>

      <video
        className="movie"
        src={movieUrl && movieUrl[resolution]}
        autoPlay
        progress
        controls
        poster={movieBg}
      />

      {/* {isMyServer ? (
        <video
        className="movie"
        src={movieUrl}
        autoPlay
        progress
        controls
        // poster={movieBg}
      />
      ) : (
        <iframe className='movie' src='https://www.linkbox.to/player.html?id=fp35qw000016' title="movie" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" allowFullScreen allow="fullscreen;"></iframe>
      )} */}
    </div>
  );
};

export default Watch;
