import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import "../setupTests.js";

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
