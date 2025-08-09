// module.exports = {
//     resolver: {
//       sourceExts: ['jsx', 'js', 'ts', 'tsx'], // make sure tsx is included
//     },
//   };
  
const { getDefaultConfig } = require('expo/metro-config');

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);

  config.resolver.sourceExts = [...config.resolver.sourceExts, 'svg', 'mjs', 'cjs', 'jsx', 'js', 'ts', 'tsx'];

  return config;
})();
