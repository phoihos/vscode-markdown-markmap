interface IAttributes {
    [key: string]: any
}

export function buildAttributes(fenceAttrsText: string, embedAttrsTexts: [string, string][] | null) {
    let fenceAttrs = {};

    try {
        const matched = fenceAttrsText.match(/\{([^}]+)\}/g);
        const matchedText = matched?.[0] ?? '';
        const jsonText = matchedText
            .replace(/\s\s+/g, ' ') // normalizes the spaces
            .replace(/=/g, ':') // changes the separators
            .replace(/\s*:\s*/g, '":"') // quotes around the keys and values
            .replace(/ /g, '","') // quotes around the keys and values
            .replace(/{/g, '{"') // quotes after begin culry bracket
            .replace(/}/g, '"}'); // quotes before end culry bracket

        fenceAttrs = JSON.parse(jsonText);
    } catch (ex) { }

    const embedAttrs = embedAttrsTexts?.map(e => ({ [e[0]]: e[1] })) ?? [];
    const mergedAttrs = Object.assign(Object.assign({}, fenceAttrs), ...embedAttrs);
    const attrs: IAttributes = {};

    Object.keys(mergedAttrs).forEach(key => {
        attrs[`${key}`.toLowerCase()] = mergedAttrs[key];
    });

    return attrs;
}
