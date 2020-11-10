'use strict';

import { Markmap } from 'markmap-view';
import { Base64 } from 'js-base64';

const _svgOptions = {
  style: (id) => {
    return `.${id}-fo pre {
  padding: .2em .4em;
  font-size: calc(1em - 2px);
  color: #555;
  background-color: #f0f0f0;
  border-radius: 2px;
}`;
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
