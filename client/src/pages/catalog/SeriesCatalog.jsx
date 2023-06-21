import React from 'react'
import { useParams } from 'react-router-dom'
import MovieGrid from '../../components/movie-grid/MovieGrid';
import PageHeader from '../../components/page-header/PageHeader'
import { Link } from "react-router-dom";
import { OutlineButton } from "../../components/button/Button";
import MovieList from "../../components/movie-list/MovieList";

const SeriesCatalog = () => {
  return (
    <>
      <PageHeader>
        Series
      </PageHeader>

      <div className="container">
        <div className="section mb-3">
        <div className="container">
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Action Series</h2>
          </div>
          <MovieList category="Action"/>
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Comedy Series</h2>
          </div>
          <MovieList category="Comedy"/>
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Arabic Series</h2>
          </div>
          <MovieList category="Horror"/>
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Horror Series</h2>
          </div>
          <MovieList category="Animation"/>
        </div>
        <div style={{paddingBottom: '1.5rem'}}></div>
      </div>
        </div>
      </div>
      <div style={{paddingBottom: '1rem'}}></div>
    </>
  )
}

export default SeriesCatalog