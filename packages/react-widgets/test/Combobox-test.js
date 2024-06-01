import { mount } from 'enzyme'
import React from 'react'
import Combobox from '../src/Combobox'

describe('Combobox', function () {
  var dataList = [
    { label: 'jimmy smith', id: 0 },
    { label: 'sally smith', id: 1 },
    { label: 'pat doe', id: 2 },
    { label: 'suzy smith', id: 3 },
  ]

  it('should set initial values', function () {
    mount(<Combobox value={'hello'} onChange={() => {}} />)
      .find('input.rw-input')
      .tap((c) => expect(c.getDOMNode().value).to.equal('hello'))
  })

  it('should respect textField and dataKeys', function () {
    mount(
      <Combobox
        defaultValue={0}
        data={dataList}
        textField={(i) => i.label}
        dataKey="id"
      />,
    )
      .find('input.rw-input')
      .tap((c) => expect(c.getDOMNode().value).to.equal('jimmy smith'))
  })

  it('should pass NAME down', function () {
    mount(
      <Combobox
        defaultValue={0}
        data={dataList}
        textField="label"
        dataKey="id"
        name="hello"
      />,
    )
      .find('.rw-input')
      .tap((c) => expect(c.getDOMNode().hasAttribute('name')).to.equal(true))
  })

  it('should open when clicked', () => {
    let openSpy = sinon.spy()

    mount(<Combobox onToggle={openSpy} />)
      .find('button')
      .first()
      .simulate('click')

    expect(openSpy.calledOnce).to.equal(true)
    expect(openSpy.calledWith(true)).to.equal(true)
  })

  it('should not open when clicked while disabled or readOnly', () => {
    let openSpy = sinon.spy()

    mount(<Combobox onToggle={openSpy} disabled />)
      .find('button')
      .first()
      .simulate('click')

    mount(<Combobox onToggle={openSpy} readOnly />)
      .find('button')
      .first()
      .simulate('click')

    expect(openSpy.called).to.equal(false)
  })

  it('should start closed', () => {
    let inst = mount(
      <Combobox
        value={dataList[0]}
        data={dataList}
        textField="label"
        dataKey="id"
      />,
    )

    expect(inst.prop('open')).to.not.equal(true)
    expect(inst.find('Popup').prop('open')).to.not.equal(true)

    inst.assertNone('.rw-open')
    inst.assertSingle(`input[aria-expanded=false]`)
  })

  it('should foward props to Popup', () => {
    let props = mount(<Combobox open dropUp />)
      .find('Popup')
      .props()

    expect(props.dropUp).to.equal(true)
    expect(props.open).to.equal(true)
  })

  it('should simulate focus/blur events', () => {
    let blur = sinon.spy()
    let focus = sinon.spy()

    mount(<Combobox onBlur={blur} onFocus={focus} />)
      .simulateWithTimers('focus')
      .simulateWithTimers('blur')

    expect(focus.calledOnce).to.equal(true)
    expect(blur.calledOnce).to.equal(true)
  })

  it('should not simulate focus/blur events when disabled', () => {
    let blur = sinon.spy()
    let focus = sinon.spy()

    mount(<Combobox disabled onBlur={blur} onFocus={focus} />)
      .simulateWithTimers('focus')
      .simulateWithTimers('blur')

    expect(focus.called).to.equal(false)
    //expect(blur.called).to.equal(false)
  })

  it('should add correct markup when read-only', () => {
    let input = mount(<Combobox readOnly />)
      .find('.rw-input')
      .getDOMNode()

    expect(input.hasAttribute('readonly')).to.equal(true)
    expect(input.getAttribute('aria-readonly')).to.equal('true')
  })

  it('should add correct markup when disabled', () => {
    let input = mount(<Combobox disabled />)
      .find('.rw-input')
      .getDOMNode()

    expect(input.hasAttribute('disabled')).to.equal(true)
    expect(input.getAttribute('aria-disabled')).to.equal('true')
  })

  it('should not simulate form submission', function () {
    let spy = sinon.spy()

    mount(
      <form
        action="/"
        onSubmit={() => {
          throw new Error('should not submit!')
        }}
      >
        <Combobox data={dataList} onKeyDown={spy} />
      </form>,
    )
      .find('input')
      .simulate('keyDown', { key: 'Enter' })

    expect(spy.calledOnce).to.equal(true)
  })

  it('should call onChange with event object', () => {
    let change = sinon.spy()

    const evt = new Event('foo')

    mount(
      <Combobox
        open
        value="bar"
        data={dataList}
        onChange={change}
        onToggle={() => {}}
      />,
    )
      .find('List')
      .act((_) => _.prop('onChange')(null, { originalEvent: evt }))

    expect(change.getCall(0).args[1]).to.eql({
      originalEvent: evt,
      lastValue: 'bar',
      source: 'listbox',
    })
  })
})
