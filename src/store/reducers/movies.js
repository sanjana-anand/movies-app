import * as actionTypes from '../actions/actionTypes';

const reducer = (state = {movies: [], filtered: [], loading: true}, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_MOVIE:
            return {
                ...state,
                movies: [action.movie, ...state.movies]
            };
        case actionTypes.SET_MOVIES:
            return {
                ...state,
                movies: action.movies,
                loading: false
            };
        case actionTypes.FILTER_MOVIES:
            return {
                ...state,
                filtered: action.movies,
            };
        case actionTypes.TOGGLE_FAVORITE:
            const updatedMovies = state.movies.map( movie => {
                if(movie.title === action.title) {
                    return {
                        ...movie,
                        isFavorite: !movie.isFavorite
                    }
                } 
                return movie;
            })
            const updatedFilteredMovies = state.filtered.map( movie => {
                if(movie.title === action.title) {
                    return {
                        ...movie,
                        isFavorite: !movie.isFavorite
                    }
                } 
                return movie;
            })
            return {
                ...state,
                movies: updatedMovies,
                filtered: updatedFilteredMovies
            }
        default:
            return state;
    }
}

export default reducer;