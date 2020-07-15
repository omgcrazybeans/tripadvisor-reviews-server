import _ from 'underscore';

const isPlural = (field) => field > 1 ? 's' : '';

const filterAll = (reviews, ratings, times, types) => {
  reviews = filterMonths(times, reviews);
  reviews = filterRatings(ratings, reviews);
  reviews = filterTypes(types, reviews);
  return reviews;
};

const months = [
  { 'Mar-May': ['March', 'April', 'May'] },
  { 'Jun-Aug': ['June', 'July', 'August'] },
  { 'Sep-Nov': ['September', 'October', 'November'] },
  { 'Dec-Feb': ['December', 'January', 'February'] },
];

const filterMonths = (times, reviews) => {
  const selectedMonths = times.reduce((accum, time, index) => {
    const [key] = Object.keys(time);
    time[key] ? accum.push(...months[index][key]) : false;
    return accum;
  }, []);

  let regexMonths;
  if (selectedMonths.length) {
    regexMonths = new RegExp(selectedMonths.reduce((accum, month, index) => {
      index !== selectedMonths.length - 1 ? accum += `${month}.*|` : accum += `${month}.*)`;
      return accum;
    }, '('));
  } else {
    return reviews;
  }
  return reviews.filter(({ dateOfTrip }) => regexMonths.test(dateOfTrip));
};

const max = 5;

const filterRatings = (ratings, reviews) => {
  const selectedRatings = ratings.reduce((accum, rate, index) => {
    const [key] = Object.keys(rate);
    rate[key] ? accum.push(max - index) : false;
    return accum;
  }, []);

  let regexRatings;
  if (selectedRatings.length) {
    regexRatings = new RegExp(selectedRatings.reduce((accum, type, index) => {
      index !== selectedRatings.length - 1 ? accum += `${type}|` : accum += `${type})`;
      return accum;
    }, '('));
  } else {
    return reviews;
  }
  return reviews.filter(({ rating }) => regexRatings.test(rating));
};

const filterSearch = (target, reviews) => {
  const uniqueWords = _.uniq(target.toLowerCase().trim().split(/\s+/));

  return uniqueWords.length
    ? reviews.filter((review) => {
        for (let word of uniqueWords) {
          if (review.review.toLowerCase().includes(word)) {
            return review;
          }
        }
      })
    : reviews;
};

const filterTypes = (types, reviews) => {
  const selectedTypes = types.reduce((accum, type) => {
    const [key] = Object.keys(type);

    type[key] ? accum.push(key) : null;

    return accum;
  }, []);

  let regexTypes;
  if (selectedTypes.length) {
    regexTypes = new RegExp(selectedTypes.reduce((accum, type, index) => {
      // handle Family (young children) or Family (teens)
      type = type === 'Families' ? 'Family.*' : type;

      index !== selectedTypes.length - 1 ? accum += `${type}|` : accum += `${type})`;

      return accum;
    }, '('));
  } else {
    return reviews;
  }
  return reviews.filter(({ tripType }) => regexTypes.test(tripType));
};

export {
  isPlural,
  filterAll,
  filterMonths,
  filterSearch,
  filterRatings,
  filterTypes,
};