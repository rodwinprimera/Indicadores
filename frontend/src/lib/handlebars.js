// Dependencies
//minify se encarga de comprimir el codigo html 

import { minify } from 'html-minifier';

export function compress(content) {
  return minify(content.fn(this), {
    removeComments: true,
    collapseWhitespace: true,
    minifyJS: true
  });
}
