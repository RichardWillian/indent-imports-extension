// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { CodeLanguage } from './code-language/code-language';
import './shared/array.extenstion';

export function activate(context: vscode.ExtensionContext) {

	const disposable = vscode.commands.registerCommand('extension.indent-imports', () => {

		const editor = vscode.window.activeTextEditor;

		if (!editor)
			return;

		const document = editor.document;

		const lineCount = document.lineCount;
		const importsForIndentation: string[] = [];

		const codeLanguage = CodeLanguage.getCodeLanguage(document.languageId);

		if (!codeLanguage)
			return;

		for (let i = 0; i < lineCount; i++) {
			const currentLine = document.lineAt(i);
			const text = currentLine.text;

			if (codeLanguage.checkIfIsAnImport(text))
				continue;

			importsForIndentation.push(text);
		}

		if (importsForIndentation.length === 0) {
			vscode.window.showInformationMessage('There are no elements to identify. Check the code language of your current file.');
			return;
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
