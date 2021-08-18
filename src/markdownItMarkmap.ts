import MarkdownIt = require('markdown-it');
import { Transformer } from 'markmap-lib';
import { Base64 } from 'js-base64';
import { matchMarkmapToken } from './markmapTokenHelper';

export default function markdownItMarkmap(md: MarkdownIt) {
  const fallback = md.renderer.rules.fence;

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const attrs = matchMarkmapToken(token.info, token.attrs);

    if (attrs !== null) {
      try {
        const { root, features } = new Transformer().transform(token.content);
        const data = { attrs, root, features };

        return `<svg class="markmap">${Base64.encode(JSON.stringify(data))}</svg>`;
      } catch (ex) {
        return `<pre>${ex}</pre>`;
      }
    }

    return fallback?.(tokens, idx, options, env, self) ?? `<pre>${token.content}</pre>`;
  };
}
