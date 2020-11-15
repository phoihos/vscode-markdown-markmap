import MarkdownIt = require('markdown-it');
import { transform } from 'markmap-lib';
import { Base64 } from 'js-base64';

const _idRecognizer = /^\s*(markmap|mdmm|mmmd)((\s+|:|\{)[^`~]*)?$/i;
//const _idRecognizer = /^(markmap|mdmm|mmmd)$/i;

export default function markdownItMarkmap(md: MarkdownIt) {
    const fallback = md.renderer.rules.fence?.bind(md.renderer.rules);

    md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        const token = tokens[idx];

        if (_idRecognizer.test(token.info)) {
            try {
                const attrs = buildAttributes(token.info);
                const embAttrs = token.attrs ? token.attrs.map(e => ({ [e[0].toLowerCase()]: e[1] })) : [];
                const { root } = transform(token.content);
                const data = { attrs: Object.assign(attrs, ...embAttrs), root };

                return `<svg class="markmap">${Base64.encode(JSON.stringify(data))}</svg>`;
            } catch (ex) {
                return `<pre>${ex}</pre>`
            }
        }

        return fallback?.(tokens, idx, options, env, self) ?? `<pre>${token.content}</pre>`;
    }
}

function buildAttributes(text: string) {
    const matched = text.match(/\{([^}]+)\}/g);
    const attrsText = matched?.[0] ?? '';
    if (!attrsText.length) return {};

    const jsonText = attrsText
        .replace(/\s\s+/g, ' ') // normalizes the spaces
        .replace(/=/g, ':') // changes the separators
        .replace(/\s*:\s*/g, '":"') // quotes around the keys and values
        .replace(/ /g, '","') // quotes around the keys and values
        .replace(/{/g, '{"') // quotes after begin culry bracket
        .replace(/}/g, '"}'); // quotes before end culry bracket

    try {
        return JSON.parse(jsonText);
    } catch (ex) {
        return {};
    }
}
