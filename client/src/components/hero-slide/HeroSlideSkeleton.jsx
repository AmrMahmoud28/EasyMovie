import React from 'react'
import "./hero-slide-skeleton.scss";
import Button, { OutlineButton } from "../button/Button";

const HeroSlideSkeleton = () => {
  return (
    <div className="hero-slideSk">
      <div
        className="hero-slideSk__itemSk">
        <div className="hero-slideSk__itemSk__contentSk container">
          <div className="hero-slideSk__itemSk__contentSk__infoSk">
            <h2 className="titleSk">
            </h2>
            <div className="overviewSk">
            </div>
            <div className="overviewSk">
            </div>
            <div className="overviewSk">
            </div>
            <div className="btnsSk">
                <div className="btn1"></div>
                <div className="btn2"></div>
            </div>
          </div>

          <div className="hero-slideSk__itemSk__contentSk__posterSk">
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSlideSkeleton;