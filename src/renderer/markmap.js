'use strict';

import { Markmap } from 'markmap-view';
import { Base64 } from 'js-base64';

const _svgOptions = {
  style: (id) => {
    return `\
.${id}-container code[class*=language-], .${id}-container pre[class*=language-] {
  font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
  font-size: 1em;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  line-height: 1.5;
  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;
  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none
}
.${id}-container pre[class*=language-] {
  margin: 0;
  padding: .2em .4em;
  overflow: auto
}
.${id}-container :not(pre)>code[class*=language-] {
  padding: .1em;
  border-radius: .3em;
  white-space: normal
}
`
  },
  autoFit: true
};

function _resizeMarkmap(mm, scale) {
  const { minX, maxX, minY, maxY } = mm.state;
  const width = (maxY - minY) * scale;
  const height = (maxX - minX) * scale;

  const svg = mm.svg.node();
  svg.style.width = `${width}`;
  svg.style.height = `${height}`;

  mm.fit();
}

function _renderMarkmap() {
  const svgs = document.querySelectorAll('.markmap');
  for (const svg of svgs) {
    const data = JSON.parse(Base64.decode(svg.innerHTML));
    _resizeMarkmap(Markmap.create(svg, _svgOptions, data.root), data.attrs.scale ?? 1.1);
  }
}

_renderMarkmap();
