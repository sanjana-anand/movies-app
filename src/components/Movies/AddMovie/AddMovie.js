import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as moviesActions from '../../../store/actions/movies';
import Button from '../../../components/UI/Button/Button';
import classes from './AddMovie.module.scss';
import Input from '../../../components/UI/Input/Input';

class AddMovie extends Component {
    state = {
        movieForm: {
            title: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Movie Title'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            releaseDate: {
                elementType: 'input',
                elementConfig: {
                    type: 'date',
                    placeholder: 'Release Date',
                    max: new Date().toISOString().split("T")[0]
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            actor: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Lead Actor'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            boxOfficeCollection: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Box Office Takings(In Millions)'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            imageUrl: {
                elementType: 'textarea',
                elementConfig: {
                    placeholder: 'Image URL'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            description: {
                elementType: 'textarea',
                elementConfig: {
                    placeholder: 'Description'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        loading: false
    }

    createMovieHandler = ( event ) => {
        event.preventDefault();
        this.setState( { loading: true } );
        const formData = {};
        for (let formElementIdentifier in this.state.movieForm) {
            formData[formElementIdentifier] = this.state.movieForm[formElementIdentifier].value;
        }
        this.props.onMovieAdded(formData);
        this.props.movieAdded();
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedMovieForm = {
            ...this.state.movieForm
        };
        const updatedFormElement = { 
            ...updatedMovieForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedMovieForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedMovieForm) {
            formIsValid = updatedMovieForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({movieForm: updatedMovieForm, formIsValid: formIsValid});
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.movieForm) {
            formElementsArray.push({
                id: key,
                config: this.state.movieForm[key]
            });
        }

        return (
            <div className={classes.MovieData}>
                <h3 className={classes.CenterAlign}>Enter Movie Details</h3>
                <form onSubmit={this.createMovieHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        label={formElement.config.elementConfig.placeholder}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                    ))}
                    <div className={classes.CenterAlign}>
                        <Button btnType="Success" disabled={!this.state.formIsValid}>Add Movie</Button>
                    </div>
                </form>            
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onMovieAdded: (movie) => dispatch(moviesActions.addMovie(movie)),
    }
};

export default connect(null, mapDispatchToProps)(AddMovie);