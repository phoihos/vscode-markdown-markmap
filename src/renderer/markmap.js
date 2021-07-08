'use strict';

import * as WebFont from 'webfontloader';
import { Markmap } from 'markmap-view';
import { Base64 } from 'js-base64';

const _katexName = 'katex';
const _katexFontConfig = {
  custom: {
    families: [
      'KaTeX_AMS',
      'KaTeX_Caligraphic:n4,n7',
      'KaTeX_Fraktur:n4,n7',
      'KaTeX_Main:n4,n7,i4,i7',
      'KaTeX_Math:i4,i7',
      'KaTeX_SansSerif:n4,n7,i4',
      'KaTeX_Script',
      'KaTeX_Size1',
      'KaTeX_Size2',
      'KaTeX_Size3',
      'KaTeX_Size4',
      'KaTeX_Typewriter'
    ],
    urls: ['https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css']
  }
};

function _buildSvgOption(attr) {
  return {
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
`;
    },
    color: attr.color?.length > 0 ? () => `${attr.color}` : Markmap.defaultOptions.color,
    autoFit: true
  };
}

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
  const markmaps = [];
  const render = () => {
    for (const { svg, data } of markmaps) {
      _resizeMarkmap(
        Markmap.create(svg, _buildSvgOption(data.attrs), data.root),
        data.attrs.scale ?? 1.1
      );
    }
  };
  let hasKatex = false;

  const svgs = document.querySelectorAll('.markmap');
  for (const svg of svgs) {
    const data = JSON.parse(Base64.decode(svg.innerHTML));
    markmaps.push({ svg, data });
    hasKatex = data.features[_katexName] ?? hasKatex;
  }

  if (!hasKatex) render();
  else WebFont.load({ ..._katexFontConfig, active: render, inactive: render });
}

_renderMarkmap();
