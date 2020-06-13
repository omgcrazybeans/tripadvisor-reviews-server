import React from 'react';
import { Label, P } from '../css/style';

const TimeOfYear = ({ times, handleChange }) => (
  <form>
    <P>Time of year</P>
    {times.map((month, i) => {
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

export default TimeOfYear;
