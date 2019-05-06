import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import App from '../App.js';
import SearchBooks from '../components/SearchBooks.js';
import BookDesc from '../components/BookDesc.js';

describe('<App />', () => {
  it('contains an <App/> component', function () {
    const wrapper = shallow(<App/>);
    expect(wrapper.find(SearchBooks)).to.have.length(1);
  });

  it('contains an <SearchBooks/> component', function () {
    const wrapper = mount(<App/>);
    expect(wrapper.find(SearchBooks)).to.have.length(1);
  });
});
