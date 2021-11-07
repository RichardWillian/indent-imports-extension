// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import Typescript from './code-languages/typescript';
import './shared/array.extenstion';

/*
import { novo } from 'alecrim12345';
import { novo } from 'alecrim123';
import { novo } from 'alecrim1';
import { novo } from 'alecrim123456';
import { novo } from 'alecrim1234';
import { novo } from 'alecrim1234567';
import { novo } from 'alecrim12';

export default class Teste {

}

*/

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('extension.indent-imports', () => {

		const editor = vscode.window.activeTextEditor;

		if (!editor)
			return;

		const document = editor.document;

		const lineCount = document.lineCount;
		const importsForIndentation: string[] = [];

		for (let i = 0; i < lineCount; i++) {
			const currentLine = document.lineAt(i);
			const text = currentLine.text;

			if (Typescript.checkIfIsAnImport(text))
				continue;

			importsForIndentation.push(text);
		}

		importsForIndentation.orderByLength();

		const selection = defineSelectionOfImports(importsForIndentation, editor);

		const result = importsForIndentation.join('\n');

		editor.edit(editBuilder => {
			editBuilder.replace(selection, result);
		});
	});

	context.subscriptions.push(disposable);
}

function defineSelectionOfImports(importsForIndentation: string[], editor: vscode.TextEditor) {
	const start = new vscode.Position(0, 0);
	const lastIndex = importsForIndentation.length - 1;
	const lastLine = importsForIndentation[lastIndex];
	const end = new vscode.Position(lastIndex, lastLine.length);
	const selection = new vscode.Selection(start, end);

	editor.selection = selection;
	return selection;
}

// this method is called when your extension is deactivated
export function deactivate() { }
