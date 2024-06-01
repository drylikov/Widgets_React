const { stripIndent } = require('common-tags')

module.exports = function () {
  return stripIndent`
    let { Combobox, DropdownList, DateTimePicker,
      Calendar, SelectList, Multiselect } = ReactWidgets;

    let data = listOfPeople();

    <>
      <DropdownList
        data={data}
        textField="firstName"
        defaultValue={data[0]}
      />
      <Combobox
        data={data}
        textField="firstName"
        defaultValue={data[1]}
      />
      <Multiselect
        data={data}
        textField="firstName"
        defaultValue={data.slice(0, 2)}
      />
      <SelectList
        multiple
        data={data}
        textField="firstName"
        defaultValue={data[4]}
      />
      <DateTimePicker format="MMM dd yyyy h:mm tt" />
      <Calendar defaultView="year" />
    </>
  `
}
