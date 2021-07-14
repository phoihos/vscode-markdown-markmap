interface IAttributes {
    [key: string]: string
}

function _buildMarkmapAttrs(fenceAttrs: string, tokenAttrs: [string, string][] | null): IAttributes {
    const attrs: IAttributes = {};

    const regexValidation = /^\s*\w+\s*=/;
    if (regexValidation.test(fenceAttrs)) {
        const regexKeyValue = /(\w+)\s*=\s*("([^"]*)"|'([^']*)'|([^"'\s]*))/g;
        let match: RegExpExecArray | null = null;

        while ((match = regexKeyValue.exec(fenceAttrs)) !== null) {
            attrs[match[1].toLowerCase()] = match[2].replace(/^("|')(.*)\1$/, '$2');
        }
    }

    tokenAttrs?.forEach(e => { attrs[e[0].toLowerCase()] = e[1]; });

    return attrs;
}

export function matchMarkmapToken(tokenInfo: string, tokenAttrs: [string, string][] | null): IAttributes | null {
    const regexCurlyBrackets = /^\s*(markmap|mdmm|mmmd)\s*((\{)([^`~]*)(\})\s*)?$/i;
    const regexSingleMark = /^\s*(markmap|mdmm|mmmd)\s*((:|\?)([^`~]*))?$/i;

    const match = tokenInfo.match(regexCurlyBrackets) ?? tokenInfo.match(regexSingleMark);

    return (match !== null) ? _buildMarkmapAttrs(match[4], tokenAttrs) : null;
}
