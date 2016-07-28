import React from 'react'
import { mount, shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
const store = mockStore({ weather: {} })

import Card from '../../src/components/card'
import Chart from '../../src/components/chart'
import Day from '../../src/components/day'

describe('Card component', () => {
  it('should have props.data', function () {
    const wrapper = shallow(<Card store={store} />)
    expect(wrapper.props().data).to.be.defined
  })

  it('contain <Chart/>  component', function () {
    const wrapper = mount(<Chart store={store} />)
    expect(wrapper.find(Chart)).to.have.length(1)
  })

  it('contain <Day/>  component', function () {
    let data = []
    const wrapper = mount(<Day store={store} data={data} />)
    expect(wrapper.find(Day)).to.have.length(1)
  })
  it('calls render', () => {
    sinon.spy(Card.prototype, 'render')
    const wrapper = mount(<Card store={store} />)
    expect(Card.prototype.render.calledOnce).to.equal(true)
  })
})
