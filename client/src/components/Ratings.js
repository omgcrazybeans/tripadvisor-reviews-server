import React from 'react';
import { Label, P } from '../css/style';

const Ratings = ({ ratings, handleChange }) => (
  <form>
    <P>Traveler rating</P>
    {ratings.map((rating, i) => {
      const [key] = Object.keys(rating);

      return (
        <Label key={i}>
          <input
            type="checkbox"
            index={i}
            name={key}
            checked={rating[key]}
            onChange={handleChange}
          />
          {key}
          <br />
        </Label>
      );
    })}
  </form>
);

export default Ratings;
