module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@views': './src/views',
        '@models': './src/models',
        '@controllers': './src/controllers',
        '@config': '.src/config'
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
