import axios from 'axios';
import React, { Component } from 'react';
import Header from './Header';
import Languages from './Languages';
import Ratings from './Ratings';
import ReviewList from './ReviewList';
import Search from './Search';
import TimeOfYear from './TimeOfYear';
import TravelerType from './TravelerType';
import { ReviewsBox } from '../css/style';
import OPTIONS from './app.config';
import { languages, ratings,times,types } from '../helpers/reviewsGridConfig';

class App extends Component {
  constructor(props) {
    super(props); // Sets `this.props`. Otherwise, when accessing `this.props`, would be `undefined`

    this.state = {
      ratings,
      times,
      types,
      languages,
      selectedLang: '',
      search: '',
      reviews: [],
    };

    this.handleLangChange = this.handleLangChange.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleTravelerChange = this.handleTravelerChange.bind(this);
    this.updateHelpful = this.updateHelpful.bind(this);
  }

  componentDidMount() {
    axios.get('/trip')
      .then(data => {
        console.log(`trip Data: `, data);
        // this.setState({ data })
      })
      .catch(console.error);
  }

  handleLangChange({ target: { name: selectedLang } }) {
    this.setState({
      selectedLang,
    });
  }

  handleRatingChange(event) {
    const { name, checked } = event.target;
    const index = event.target.getAttribute('index');
    const ratings = [...this.state.ratings];

    ratings[index] = {
      [name]: checked,
    };

    this.setState({
      ratings,
    });
  }

  handleSearchChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }


  handleSearchSubmit(event) {
    event.preventDefault();
  }

  handleTimeChange(event) {
    const { name, checked } = event.target;
    const index = event.target.getAttribute('index');
    const times = [...this.state.times];

    times[index] = {
      [name]: checked,
    };

    this.setState({
      times,
    });
  }

  handleTravelerChange(event) {
    const { name, checked } = event.target;
    const index = event.target.getAttribute('index');
    const types = [...this.state.types];

    types[index] = {
      [name]: checked,
    };

    this.setState({
      types,
    });
  }

  updateHelpful(event) {
    const { id } = event.target;
    const _id = id.split(',').map((num) => Number.parseInt(num));

    axios.put('/reviews', { _id }, OPTIONS)
      .then(({ data: reviews }) => this.setState({ reviews }))
      .catch(console.error);
  }

  render() {
    const { languages, ratings, reviews, search, selectedLang, times, types } = this.state;

    return (
      <div>
        <Header />
        <ReviewsBox>
          <Ratings
            ratings={ratings}
            handleChange={this.handleRatingChange}
          />
          <TravelerType
            types={types}
            handleChange={this.handleTravelerChange}
          />
          <TimeOfYear
            times={times}
            handleChange={this.handleTimeChange}
          />
          <Languages
            languages={languages}
            selected={selectedLang}
            handleChange={this.handleLangChange}
          />
        </ReviewsBox>
        <Search
          handleChange={this.handleSearchChange}
          handleSubmit={this.handleSearchSubmit}
        />
        <ReviewList
          ratings={ratings}
          reviews={reviews}
          target={search}
          times={times}
          types={types}
          handleChange={this.updateHelpful}
        />
      </div>
    );
  }
}

export default App;
