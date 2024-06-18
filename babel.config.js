module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'module:react-native-dotenv',
    [
      'module-resolver',
      {
        alias: {
          '@slices': './app/reduc/slices',
        },
      }
      
    ]
    
  ]
};
