import React from 'react'
import { useParams } from 'react-router-dom'
import MovieGrid from '../../components/movie-grid/MovieGrid';
import PageHeader from '../../components/page-header/PageHeader'

const Catalog = () => {

  const {category} = useParams();

  return (
    <>
      <PageHeader>
        {getCategory(category)}
      </PageHeader>

      <div className="container">
        <div className="section mb-3">
          <MovieGrid category={category}/>
        </div>
      </div>
      <div style={{paddingBottom: '1rem'}}></div>
    </>
  )
}

function getCategory(category) {
  let result = category.charAt(0).toUpperCase() + category.slice(1);

  if (category !== "all"){
    return (result + " Movies");
  }
  else{
    return "Movies";
  }
}

export default Catalog