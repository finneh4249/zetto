module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        'babel-preset-expo',
        {
          jsxImportSource: 'nativewind',
          // Disable automatic worklets/reanimated plugin injection — this
          // project does not use react-native-worklets or react-native-reanimated.
          worklets: false,
          reanimated: false,
        },
      ],
    ],
    plugins: [
      // NativeWind CSS class-name transform.
      //
      // We load the plugin directly from the dist path rather than through
      // `nativewind/babel` (which delegates to `react-native-css-interop/babel`)
      // because react-native-css-interop@0.2.x unconditionally registers
      // `react-native-worklets/plugin` in its top-level babel preset.  That
      // package is not installed in this project, causing the build to fail.
      //
      // The package has no top-level exports map, so the only way to import
      // the plugin in isolation is via the dist path.  This should be revisited
      // if a future release of react-native-css-interop makes the worklets
      // plugin conditional or exposes a dedicated export for the plugin alone.
      require('react-native-css-interop/dist/babel-plugin').default,
      'inline-react-svg',
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            // Only remap specific internal asset calls if needed, not all `@/`
            // Let tsconfig handle the `@/` mappings natively for most cases
          },
        },
      ],
    ],
  };
};
