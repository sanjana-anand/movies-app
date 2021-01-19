import * as actionTypes from './actionTypes';

export const addMovie = ( movie ) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    movie.releaseDate = new Date(movie.releaseDate).toLocaleDateString(undefined, options);
    return {
        type: actionTypes.ADD_MOVIE,
        movie: movie
    };
};

export const setMovies = ( movies ) => {
    return {
        type: actionTypes.SET_MOVIES,
        movies: movies
    };
};

export const initMovies = () => {
    return dispatch => {
        fetch('BondFilms.json', {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then( response => {
            return response.json();
        } )
        .then( response => {
            let movies = response['Bond Films'];
            movies = movies.map(movie => {
                return {
                    title: movie['Film'],
                    actor: movie['Bond Actor'],
                    description: movie['Description'],
                    imageUrl: movie['ImageURL'],
                    releaseDate: movie['UK release date'],
                    boxOfficeCollection: movie['Box Office(Millions)'],
                    isFavorite: false
                }
            });
            dispatch(setMovies(movies));
        });
    };
};

export const filterMovies = (movies) => {
    return {
        type: actionTypes.FILTER_MOVIES,
        movies: movies
    };
}

export const toggleFavorite = (title) => {
    return {
        type: actionTypes.TOGGLE_FAVORITE,
        title: title
    };
}