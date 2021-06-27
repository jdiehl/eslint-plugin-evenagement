const { existsSync } = require('fs')
const { dirname, basename, extname, join } = require('path')

module.exports = {
  meta: {
    docs: {
      description: 'Check if UI component has a storybook',
      category: 'UI Component Storybooks',
      recommended: true,
    },
    fixable: 'code',

    messages: {
      noStorybook: 'UI component should have a storybook',
    },
  },

  create(context) {
    return {
      Program(node) {
        const filename = context.getFilename()
        if (!filename.match('/components/') || filename.match('.stories.')) return
        const dir = dirname(filename)
        const ext = extname(filename)
        const base = basename(filename)
        const baseWithoutExt = base.substr(0, base.length - ext.length)
        const story = join(dir, 'stories', `${baseWithoutExt}.stories${ext}`)

        if (!existsSync(story)) {
            context.report({
              node: node,
              messageId: 'noStorybook'
            })
          }
      }
    }
  }
}
