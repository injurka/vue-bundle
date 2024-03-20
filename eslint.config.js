import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  jsx: true,
  rules: {
    'ts/no-redeclare': 'off',
  },
  ignores: ['**/lib/**', '**/dist/**', '**/build/**', '**/tsconfig.tsbuildinfo/**'],
})
