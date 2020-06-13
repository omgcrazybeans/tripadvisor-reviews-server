import React from 'react';
import { Label, P, Span } from '../css/style';

const Languages = ({ languages, selected, handleChange }) => (
  <form>
    <P>Language</P>
    {languages.map((lang, i) => {
      const [key] = Object.keys(lang);

      return (
        <Label key={i}>
          <input
            type="radio"
            name={key}
            checked={selected === key}
            onChange={handleChange}
          />
          {key}
          <Span> ({lang[key]})</Span>
          <br />
        </Label>
      );
    })}
  </form>
);

export default Languages;
