import React from 'react';
import classes from './Movie.module.scss';
import Card from '../../UI/Card/Card';
import Modal from '../../UI/Modal/Modal';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MovieDetails from '../MovieDetails/MovieDetails'

const Movie = (props) => {
    const [showModal, setShowModal] = React.useState(false);
    return (
        <div className={classes.Movie}>
            <Card>
                <div className={classes.CardContent}>
                    <div>
                        <img onClick={() => setShowModal(true)} alt={props.movie.tilm} src={props.movie.imageUrl}/>
                    </div>
                    <div className={classes.Title}>
                        <span>{props.movie.title}</span>
                        <span className={classes.Icon} onClick={props.clicked}>
                            {   props.movie.isFavorite ? 
                                <FavoriteIcon fontSize={"large"}/> :
                                <FavoriteBorderOutlinedIcon fontSize={"large"}/>
                            }
                        </span>
                    </div>
                    <div className={classes.Date}>
                        {props.movie.releaseDate}
                    </div>
                    <div className={classes.Actor}>
                        {props.movie.actor}
                    </div>
                </div>
            </Card>
            {   
                showModal ? 
                <Modal show={showModal} modalClosed={() => setShowModal(false)}>
                    <MovieDetails movie={props.movie} />
                </Modal> :
                null 
            }
        </div>
    );
}

export default Movie;