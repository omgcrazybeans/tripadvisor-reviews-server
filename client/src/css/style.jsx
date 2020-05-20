import styled from 'styled-components';

// const Font = styled('font')`
//   font-family: 'Trip Sans', Arial, sans-serif !important;
//   font-size: 14px;
// `;

// Style <p> tag in `Languages`, `Ratings`, `TimeOfYear`, and `TravelerType` components
const P = styled.p`
  font-family: 'Trip Sans', Arial, sans-serif !important;
  font-size: 14px;
  font-weight: 700;
  color: rgb(0, 10, 18);
`;

// Style <label> tag in `Languages`, `Ratings`, `TimeOfYear`, and `TravelerType` components
const Label = styled.label`
  font-family: 'Trip Sans', Arial, sans-serif !important;
  font-size: 14px;
  color: rgb(0, 0, 0)
`;

// Style number in `Languages` component
const Span = styled.span`
  font-family: 'Trip Sans', Arial, sans-serif !important;
  font-size: 14px;
  color: rgb(118, 118, 118);
`;

// half-circle
const HalfCircle = styled.div`
  display: inline-block;
  background-color: #00aa6c;
  height: 16px;
  width: 8px;
  -moz-border-radius: 16px 0 0 16px;
  border-radius: 16px 0 0 16px;
`;

// full-circle
const FullCircle = styled.div`
  display: inline-block;
  background-color: #00aa6c;
  height: 16px;
  width: 16px;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
`;

// transparent-circle
const TransparentCircle = styled.div`
  display: inline-block;
  border: 1px solid #00aa6c;
  height: 14px;
  width: 14px;
  -webkit-border-radius: 7px;
  -moz-border-radius: 7px;
`;

// Style flexbox in `App` component
const ReviewsBox = styled.div`
  /* create flex layout */
  display: flex;

  /* define flow direction */
  flex-flow: row nowrap;

  /* define how remaining space is destributed */
  justify-content: space-around;


  /* define background */
  background-color: white;
  
  /* define border */
  border-top: 1px solid #D3D3D3;
  border-bottom: 2px solid black;
  border-left: 2px solid black;
  border-right: 2px solid black;


  padding: 0;
  margin: 0;
  list-style: none;
`;

// Style <h2> tag in `Header` component
const H2 = styled.h2`
  /* create flex layout */
  display: flex;
  
  /* define border */
  border-top: 2px solid black;
  border-bottom: 1px solid #D3D3D3;
  border-left: 2px solid black;
  border-right: 2px solid black;

  /* define flow direction */
  flex-flow: row nowrap;

  /* define how remaining space is destributed */
  justify-content: flex-start;
  
  padding: 10px;
  margin: 0;

  /* define font */
  font-family: 'Trip Sans', Arial, sans-serif !important;
  font-size: 28px;
  color: #000a12;

  /* define background */
  background-color: white;
`;

// Style <form> tag in `Search` component
const FormSearch = styled.form`
  /* create flex layout */
  display: flex;

  /* define flow direction */
  flex-flow: row nowrap;

  /* define how remaining space is destributed */
  justify-content: flex-start;
  
  padding: 0;
  margin: 10px 0 10px 0;

  /* define font */
  font-family: 'Trip Sans', Arial, sans-serif !important;
  font-size: 14px;
`;

// Style <input type="search"> tag in `Search` component
const InputSearch = styled.input.attrs({
  type: 'search',
  name: 'search',
  placeholder: '🔎 Search reviews',
})`
  width: 100%;

  /* define font */
  font-family: 'Trip Sans', Arial, sans-serif !important;
  font-size: 14px;
`;

const LabelSearch = styled.label`
  width: 100%;
  color: #ececec;
`;

export {
  FormSearch,
  FullCircle,
  H2,
  HalfCircle,
  InputSearch,
  Label,
  LabelSearch,
  P,
  ReviewsBox,
  Span,
  TransparentCircle,
};
