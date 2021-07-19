# Change Log

All notable changes to the "Markdown Preview Markmap Support" extension will be documented in this file.

## [1.4.4] - 2021-07-19

- Fixed : Pre-parsed svg data does not removed on rendering

## [1.4.3] - 2021-07-16

- Updated : `color` attribute feature to stable
- Added : KaTeX (Math Formula) syntax highlighting same as VS Code in VS Code 1.58+
- Added : Support specifying attribute value with spaces by single or double quotation marks

## [1.4.0] - 2021-07-08

- Fixed : KaTeX (Math Formula) rendering cutting issue (Related issue: #5)
- Removed : `kpadr` attribute as unnecessary
- Added : `color` attribute to change the **line color** of the mindmap
- Updated : `README.md`

## [1.3.2] - 2021-07-02

- Changed : The default value of `kpadr` attribute changed to `1.0` (also internal calculation has changed)
- Updated : `README.md`

## [1.3.1] - 2021-07-02

- Added : `kpadr` attribute to solve the KaTeX (Math Formula) rendering cutting issue (Related issue: #5)

## [1.3.0] - 2021-07-01

- Changed : Code highlighting only inside markmap contents (Related issue: #4)

## [1.2.3] - 2021-06-11

- Updated : Internal dependencies to solve security vulnerabilities

## [1.2.2] - 2021-05-07

- Updated : Internal dependencies to solve security vulnerabilities

## [1.2.1] - 2021-04-01

- Updated : Internal dependencies

## [1.2.0] - 2020-12-23

- Refactored : Build attributes feature
- Updated : Internal dependencies

## [1.1.0] - 2020-11-15

- Updated : Can parse `{key=value}` attributes with or without `markdown-it-attrs`
- Added : `mmmd` language id for fenced code block

## [1.0.1] - 2020-10-16

- Fixed : Not working with `{key=value}` attributes

## [1.0.0] - 2020-10-14

- Initial release
