const { stripIndent } = require('common-tags')

module.exports = function (widgetName) {
  return stripIndent`
    import { ${widgetName} } from 'react-widgets';

    let formats = [
      'MMM d yyyy',
      'MMM d yy',
      'd'
    ];

    <>
      <${widgetName} parse={formats}/>
      {/* the naive approach: just use the Date constructor */}
      <${widgetName} parse={str => new Date(str)}/>
      <span>Try typing a date using the specified formats</span>
    </>
  `
}
