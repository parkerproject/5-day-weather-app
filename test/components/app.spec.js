import React from 'react'
import { expect } from 'chai'
import { shallow, mount, render } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../src/actions'
import * as types from '../../src/actions/types'
import nock from 'nock'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

import App from '../../src/components/app'
import SearchForm from '../../src/components/search_form'
import Display from '../../src/components/display'

describe('App', function () {
  afterEach(() => {
    nock.cleanAll()
  })
  //
  // const expectedActions = [
  //   { type: types.FETCH_WEATHER }
  // ]
  //
  const store = mockStore({ weather: {} })
  //
  // return store.dispatch()
  //   .then(() => { // return of async actions
  //     expect(store.getActions()).toEqual(expectedActions)
  //   })

  it('contain <SearchForm/>  component', function () {
    const wrapper = mount(<SearchForm store={store} />)
    expect(wrapper.find(SearchForm)).to.have.length(1)
  })

  it('contain <Display/>  component', function () {
    const wrapper = mount(<Display store={store} />)
    expect(wrapper.find(Display)).to.have.length(1)
  })

  it('should have props for weather', function () {
    const wrapper = shallow(<App store={store} />)
    expect(wrapper.props().weather).to.be.defined
  })
})
