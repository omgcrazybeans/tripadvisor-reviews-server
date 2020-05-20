import React  from 'react';
import { FormSearch, InputSearch, LabelSearch } from '../css/style';

const Search = ({ handleChange, handleSubmit }) => (
  <FormSearch onSubmit={handleSubmit}>
    <LabelSearch>'
      <InputSearch
        onChange={handleChange}
      />
    </LabelSearch>
  </FormSearch>
);

export default Search;
