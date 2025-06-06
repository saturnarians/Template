// Importing PostCSS plugins
import tailwindcssNesting from 'tailwindcss/nesting/index.js';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes';
import postcssPresetEnv from 'postcss-preset-env';

export default {
  plugins: [
    'tailwindcss/nesting',        // Reference as string
    'tailwindcss',                // Reference as string
    'autoprefixer',               // Reference as string
    'postcss-flexbugs-fixes',     // Reference as string
    [
      'postcss-preset-env',       // Reference as string
      {
        autoprefixer: { flexbox: 'no-2009' },
        stage: 3,
        features: { 'custom-properties': false },
      },
    ],
  ],
};
