import React from 'react';
import { Label, P } from '../css/style';

const TravelerType = ({ types, handleChange }) => (
  <form>
    <P>Travel type</P>
    {types.map((month, i) => {
      const [key] = Object.keys(month);

      return (
        <Label key={i}>
          <input
            type="checkbox"
            index={i}
            name={key}
            checked={month[key]}
            onChange={handleChange}
          />
          {key}
          <br />
        </Label>
      );
    })}
  </form>
);

export default TravelerType;
