import React from 'react'
import { mount, shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
const store = mockStore({ weather: {} })

import SearchForm from '../../src/components/search_form'

describe('Search form component', () => {
  it('should have myCity ref', () => {
    const wrapper = mount(<SearchForm store={store} />)
    expect(wrapper.ref('myCity')).to.exist
  })

  it('should have a search box ', () => {
    const wrapper = mount(<SearchForm store={store} />)
    expect(wrapper.find('input')).to.have.length(1)
  })

  it('calls componentDidMount', () => {
    sinon.spy(SearchForm.prototype, 'componentDidMount')
    const wrapper = mount(<SearchForm store={store} />)
    expect(SearchForm.prototype.componentDidMount.calledOnce).to.equal(true)
  })
})
