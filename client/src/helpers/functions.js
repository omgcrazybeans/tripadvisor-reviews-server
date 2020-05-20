import _ from 'underscore';

/**
 * Determine if `field` is a plural.
 * @param {Number} field - The `field`
 * @returns {String} 's' if `field` > 1, otherise ''
 */
const isPlural = (field) => field > 1 ? 's' : '';


/**
 *
 * @param {Array} reviews
 * @param {Array} ratings
 * @param {Array} times
 * @param {Array} types
 */
const filterAll = (reviews, ratings, times, types) => {
  reviews = filterMonths(times, reviews);
  reviews = filterRatings(ratings, reviews);
  reviews = filterTypes(types, reviews);

  return reviews;
};


// `months` is used in `filterMonths( )`
const months = [
  { 'Mar-May': ['March', 'April', 'May'] },
  { 'Jun-Aug': ['June', 'July', 'August'] },
  { 'Sep-Nov': ['September', 'October', 'November'] },
  { 'Dec-Feb': ['December', 'January', 'February'] },
];


/**
 * Time of year filter.
 * @param {Array} times - An array of objects; each key is a month range and value is a boolean.
 * @param {Array} reviews - An array of objects; each object is a review.
 * @returns {Array} An array of reviews that satisfy a regular expression of selected times.
 */
const filterMonths = (times, reviews) => {
  // get the months, e.g. if { 'Jun-Aug': true } then selectedMonths = [ 'June', 'July', 'August']
  const selectedMonths = times.reduce((accum, time, index) => {
    const [key] = Object.keys(time);

    time[key] ? accum.push(...months[index][key]) : false;

    return accum;
  }, []);

  // create the regular expression, e.g. /(June.*|July.*|August.*)/
  let regexMonths;
  if (selectedMonths.length) {
    regexMonths = new RegExp(selectedMonths.reduce((accum, month, index) => {
      index !== selectedMonths.length - 1 ? accum += `${month}.*|` : accum += `${month}.*)`;

      return accum;
    }, '('));
  } else {
    return reviews;
  }

  // return reviews that satisfy the regular expression
  return reviews.filter(({ dateOfTrip }) => regexMonths.test(dateOfTrip));
};


// `max` is used in `filterRatings( )`
const max = 5;

/**
 * Ratings filter.
 * @param {Array} ratings - An array of objects; each key is a rating and value is a boolean. 
 * @param {Array} reviews - An array of objects; each object is a review.
 * @returns {Array} An array of reviews that satisfy a regular expression of selected ratings.
 */
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

  // if (uniqueWords.length) {
  //   return reviews.filter((review) => {
  //     for (let word of uniqueWords) {
  //       if (review.review.toLowerCase().includes(word)) {
  //         return review;
  //       }
  //     }
  //   });
  // }

  // return reviews;
};


/**
 * Travel type filter.
 * @param {Array} types - An array of objects; each key is a trip type and value is a boolean.
 * @param {Array} reviews - An array of objects; each object is a review.
 * @returns {Array} An array of reviews that satisfy a regular expression if selected travel types.
 */
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
