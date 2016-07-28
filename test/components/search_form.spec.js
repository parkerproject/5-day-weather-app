import React from 'react'
import { mount, shallow } from 'enzyme'
import { expect } from 'chai'
import nock from 'nock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
const store = mockStore({ weather: {} })

import SearchForm from '../../src/components/search_form'

describe('Search form', function () {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should have myCity ref', function () {
    const wrapper = mount(<SearchForm store={store} />)
    expect(wrapper.ref('myCity')).to.exist
  })

  it('should have an input element ', function () {
    const wrapper = mount(<SearchForm store={store} />)
    expect(wrapper.find('input')).to.have.length(1)
  })

// it('calls componentDidMount', () => {
//   const wrapper = mount(<SearchForm store={store} />)
//   expect(SearchForm.prototype.componentDidMount.calledOnce).to.equal(true)
// })
})
