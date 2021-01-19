import React from 'react';
import classes from './MovieDetails.module.scss';

const MovieDetails = props => {
        return (
            <div className={classes.MovieDetails}>
                <img src={props.movie.imageUrl} alt={props.movie.title} />
                <div className={classes.Heading}>
                    <div  className={classes.Title}>{props.movie.title}</div>
                    <div className={classes.Date}>{props.movie.releaseDate}</div>
                </div>
                <div className={classes.SubHeading}>
                    <div  className={classes.Actor}>{props.movie.actor}</div>
                    <div className={classes.Collection}>{props.movie.boxOfficeCollection} Million USD</div>
                </div>
                <div className={classes.Description}>{props.movie.description}</div>                

            </div>
        )
}

export default MovieDetails;