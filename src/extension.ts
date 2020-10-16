// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import MarkdownIt = require('markdown-it');
const markdownItAttrs = require('markdown-it-attrs');
import markdownItMarkmap from './markdownItMarkmap'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate() {
	return {
		extendMarkdownIt(md: MarkdownIt) {
			return md.use(markdownItAttrs).use(markdownItMarkmap);
		}
	};
}

// this method is called when your extension is deactivated
export function deactivate() { }
