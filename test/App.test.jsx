import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import App from '../client/src/components/App';
import Header from '../client/src/components/Header';
import Languages from '../client/src/components/Languages';
import Ratings from '../client/src/components/Ratings';
import ReviewList from '../client/src/components/ReviewList';
import Search from '../client/src/components/Search';
import TimeOfYear from '../client/src/components/TimeOfYear';
import TravelerType from '../client/src/components/TravelerType';

Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {
  let wrapper;

  // set `wrapper` before testing
  beforeAll(() => {
    wrapper = shallow(<App />);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(<App />);

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders one <Header /> component', () => {
    expect(wrapper.find(Header).length).toBe(1);
  });

  test('renders one <Languages /> component', () => {
    expect(wrapper.find(Languages).length).toBe(1);
  });

  test('renders one <Ratings /> component', () => {
    expect(wrapper.find(Ratings).length).toBe(1);
  });

  test('renders one <ReviewList /> component', () => {
    expect(wrapper.find(ReviewList).length).toBe(1);
  });

  test('renders one <Search /> component', () => {
    expect(wrapper.find(Search).length).toBe(1);
  });

  test('renders one <TimeOfYear /> component', () => {
    expect(wrapper.find(TimeOfYear).length).toBe(1);
  });

  test('renders one <TravelerType /> component', () => {
    expect(wrapper.find(TravelerType).length).toBe(1);
  });
});
