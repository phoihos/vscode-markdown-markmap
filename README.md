# Markdown Preview Markmap Support

Visualize Markdown as Mindmap (A.K.A Markmap) to VS Code's built-in markdown preview.

![Demo 1](./images/readme/demo1.png)

## Features

- Preview support to built-in markdown preview
- Syntax highlighting support to `markmap` fenced code block
    - See below a [demo](#syntax-highlighting)
- Attributes support to `markmap` fenced code block
    - See below [details](#attributes)

## Installation

To install this extension go to `View->Extensions` and search for `markdown-markmap`. Next click Install.

## Usage

Create mindmap in markdown using `markmap` (or `mdmm` or `mmmd`) fenced code blocks:

~~~markdown
```markmap
# Mindmap

## Extension

- [markdown-markmap](https://github.com/phoihos/vscode-markdown-markmap)

## Powered by

- <https://markmap.js.org/>
- [markmap-lib](https://github.com/gera2ld/markmap-lib)

## Highlighting

- links
- **inline** ~~text~~ *styles*
- multiline
  text
- `inline code`
-   ```js
    console.log('code block');
    ```
- Katex
  - $\pm\sqrt{a^2 + b^2}$
  - $x = {-b \pm \sqrt{b^2-4ac} \over 2a}$
  - $$\int_{0}^{\infty} f(x) dx$$
```
~~~

## Syntax Highlighting

Syntax highlighting support exactly the same as VS Code's `markdown`.

![Demo 2](./images/readme/demo2.png)

## Attributes

Add attributes to `markmap` fenced code block with `{key1=value1 key2=value2}` curly brackets:
> Multiple attributes are separated by `space`.  
> **Use single or double quotation marks when specifying value with spaces.**

~~~markdown
```markmap {scale=1.1 color=#888}
···
```
~~~

Available attributes:

| Key   | Default Value        | Description                                                                    |
| ----- | -------------------- | ------------------------------------------------------------------------------ |
| scale | `1.1`                | Scale the preview render size                                                  |
| color | Empty (for Colorful) | Change the line color using predefined color name, or with RGB, HEX, HSL value |

Available formats to attribute:

| Format                      | Description              |
| --------------------------- | ------------------------ |
| `{key1=value1 key2=value2}` | Wrap with curly brackets |
| `:key1=value1 key2=value2`  | Start with colon mark    |
| `?key1=value1 key2=value2`  | Start with question mark |

## Markmap Visualizing

Powered by [gera2ld/markmap-lib](https://github.com/gera2ld/markmap/tree/master/packages/markmap-lib).

## Settings

Currently, there is no settings.

## Issues

If you find any problems using this extension or you want to propose new features to it, feel free to open an issue on [Github](https://github.com/phoihos/vscode-markdown-markmap/issues).

## Release Notes

Detailed Release Notes are available [here](https://github.com/phoihos/vscode-markdown-markmap/blob/master/CHANGELOG.md) or above **Changelog** tab.
