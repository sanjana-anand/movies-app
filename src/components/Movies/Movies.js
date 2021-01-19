import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import * as moviesActions from '../../store/actions/movies';
import Movie from './Movie/Movie';
import classes from './Movies.module.scss';
import Button from '../../components/UI/Button/Button';
import AddMovie from './AddMovie/AddMovie';
import Modal from '../UI/Modal/Modal';
import Loader from '../UI/Loader/Loader';

const Movies = (props) => {
  const [isFiltered, setIsFiltered] = React.useState(false);
  const [fromDate, setFromDate] = React.useState('');
  const [toDate, setToDate] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState('');
  const location = useLocation();
  const [showModal, setShowModal] = React.useState(false);
  
  useEffect(() => {
    props.onInitMovies();
  }, [])

  let movies = null;
  if ( !isFiltered && props.movies && props.movies.length > 0) {
    if(location.pathname === '/favorites') {
      movies = props.movies.filter( movie => {
        return movie.isFavorite;
      })
    } else {
      movies = props.movies;
    }
  } 

  if ( isFiltered && props.filteredMovies && props.filteredMovies.length > 0 ) {
    if(location.pathname === '/favorites') {
      movies = props.filteredMovies.filter( movie => {
        return movie.isFavorite;
      })
    } else {
      movies = props.filteredMovies;
    }
    
  } 
  
  if ( searchQuery.trim() ) {
    movies = movies.filter( movie => {
      return movie.actor.toLowerCase().includes(searchQuery.toLowerCase())
    });
  }
  
  const filterByDate = () => {
    setIsFiltered(false);
    const filteredMovies = props.movies.filter( movie => {
      return (new Date(movie.releaseDate).getTime() > new Date(fromDate).getTime() && new Date(movie.releaseDate).getTime() < new Date(toDate).getTime());
    })
    console.log(filteredMovies)
    props.onFilterMovies(filteredMovies);
    setIsFiltered(true);
  }

  const resetDateFilter = () => {
    props.onFilterMovies([]);
    setIsFiltered(false);
    setFromDate('');
    setToDate('');
  }

  const movieAdded = () => {
    props.onFilterMovies([]);
    setIsFiltered(false);
    setFromDate('');
    setToDate('');
    setSearchQuery('');
    setShowModal(false);
  }

  return (
    <React.Fragment>
      <div className={classes.Filters}>
        <div className={classes.DateFilter}>
          <div>
            <label>From</label>
            <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} max={new Date().toISOString().split("T")[0]}/>
          </div>
          <div>
            <label>To</label>
            <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} disabled={!fromDate} min={fromDate} max={new Date().toISOString().split("T")[0]}/>
          </div>
          <div className={classes.FilterButtons}>
            <Button clicked={filterByDate} btnType="Success" disabled={!fromDate || !toDate}>Filter</Button>
            <Button clicked={resetDateFilter} btnType="Danger" disabled={!fromDate || !toDate}>Reset</Button>
          </div>
        </div>
        <div>
            <label>Search</label>
            <input type="text" placeholder="By Lead Actor" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        </div>
        <div className={classes.AddButton}>
          <Button clicked={() => setShowModal(true)} btnType="Success" disabled={false}>Create</Button>
        </div>
      </div>

      <div className={classes.Movies}>
        { props.loading ? <Loader />
        : (movies && movies.length > 0) ? movies.map(movie => {
        return <Movie clicked={() => props.onToggleFavorite(movie.title)} key={movie.title} movie={movie} />
      }) : 'No Data Found!'}
        {   
          showModal ? 
          <Modal show={showModal} modalClosed={() => setShowModal(false)}>
              <AddMovie movieAdded={movieAdded}/>
          </Modal> :
          null 
        }
      </div>
    </React.Fragment>
    
  );
}

const mapStateToProps = state => {
  return {
      movies: state.movies,
      filteredMovies: state.filtered,
      loading: state.loading
  };
}

const mapDispatchToProps = dispatch => {
  return {
      onInitMovies: () => dispatch(moviesActions.initMovies()),
      onFilterMovies: (filteredMovies) => dispatch(moviesActions.filterMovies(filteredMovies)),
      onToggleFavorite: (title) => dispatch(moviesActions.toggleFavorite(title))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Movies);