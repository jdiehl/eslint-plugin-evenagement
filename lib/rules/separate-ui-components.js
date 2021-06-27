 module.exports = {
  meta: {
    docs: {
      description: 'Check if components with UI styling are separated from components with business logic',
      category: 'Separate UI Components',
      recommended: true,
    },
    fixable: 'code',

    messages: {
      classNameFound: 'Non-UI component should not use the className attribute',
      styleFound: 'Non-UI component should not use the style attribute'
    },
  },

  create(context) {
    return {
      JSXOpeningElement(node) {
        // skip components inside a components/ folder
        if (context.getFilename().match(/(\/components\/|\.stories\.)/)) return

        // check attributes for className and style
        for (const attr of node.attributes) {
          switch (attr.name?.name) {
          case 'className':
            context.report({
              node: attr,
              messageId: 'classNameFound'
            })
            break;
          case 'style':
            context.report({
              node: attr,
              messageId: 'styleFound'
            })
            break;
          }
        }
      }
    }
  }
}
