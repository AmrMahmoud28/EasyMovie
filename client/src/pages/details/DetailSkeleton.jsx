import React from 'react'
import "./detail-skeleton.scss"

const DetailSkeleton = () => {
  return (
    <>
        <div className="mb-3 movie-contentSk container">
        <div className="movie-contentSk__posterSk">
        </div>

        <div className="movie-contentSk__infoSk">
          <h1 className="titleSk">
          </h1>

          <div className="genresSk">
            <span className="genresSk__itemSk"></span>
            <span className="genresSk__itemSk"></span>
            <span className="genresSk__itemSk"></span>
            <span className="genresSk__itemSk"></span>
            <span className="genresSk__itemSk"></span>
          </div>

          <p className="overviewSk"></p>
          <p className="overviewSk"></p>
          <p className="overviewSk"></p>

          <div className="btnsSk">
                <div className="btn1"></div>
                <div className="btn2"></div>
                <div className="btn3"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailSkeleton