import { mount } from 'enzyme'
import React from 'react'
import { useLocalizer } from '../src/Localization'
import Month from '../src/Month'

describe('Month Component', function() {
  it('should use the right format', () => {
    var date = new Date(2015, 1, 16, 0, 0, 0),
      formatter = sinon.spy(() => 'hi')

    const LocalizedMonth = ({ messages, formats, ...props }) => (
      <Month {...props} localizer={useLocalizer(messages, formats)} />
    )

    mount(
      <LocalizedMonth
        value={date}
        focusedItem={date}
        onChange={() => {}}
        formats={{
          dayOfMonth: { day: '2-digit' },
        }}
      />,
    )
      // .print()
      .tap(inst => expect(inst.first('td').contains('01')).to.equal(true))
      .setProps({
        formats: { dayOfMonth: { day: 'numeric' } },
      })
      .tap(inst => expect(inst.first('td').contains('1')).to.equal(true))
      .setProps({
        formats: { dayOfMonth: formatter },
      })
      .tap(inst => expect(inst.first('td').contains('hi')).to.equal(true))

    expect(formatter.called).to.equal(true)
    expect(formatter.args[0].length).to.equal(2)
    expect(formatter.args[0][0]).to.be.a('Date')
  })
})
