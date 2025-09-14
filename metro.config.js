const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add resolver configuration to handle anonymous files
config.resolver.platforms = ['ios', 'android', 'native', 'web'];
config.resolver.sourceExts = [...config.resolver.sourceExts, 'jsx', 'js', 'ts', 'tsx'];

// Add transformer configuration
config.transformer.minifierConfig = {
  keep_fnames: true,
  mangle: {
    keep_fnames: true,
  },
};

// Disable source maps for web to prevent anonymous file issues
if (process.env.EXPO_PLATFORM === 'web') {
  config.transformer.enableBabelRCLookup = false;
  config.transformer.enableBabelRuntime = false;
}

module.exports = config;