// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

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

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
// export function activate(context: vscode.ExtensionContext) {

// 	console.log('Congratulations, your extension "import-indentation" is now active!');
// 	let disposable = vscode.commands.registerCommand('import-indentation.helloWorld', () => {
// 		vscode.window.showInformationMessage('Richard Willian from Import Indentation!');
// 	});

// 	context.subscriptions.push(disposable);

// 	const disposable = vscode.commands.registerCommand('extension.reverseWord', () => {
// 		// Get the active text editor
// 		const editor = vscode.window.activeTextEditor;

// 		console.log(editor);

// 		if (editor) {
// 			const document = editor.document;
// 			const selection = editor.selection;

// 			// Get the word within the selection
// 			const word = document.getText();
// 			const reversed = word.split('').reverse().join('');
// 			editor.edit(editBuilder => {
// 				editBuilder.replace(selection, reversed);
// 			});
// 		}
// 	});

// 	context.subscriptions.push(disposable);
// }

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('extension.indent-imports', () => {

		const editor = vscode.window.activeTextEditor;

		if (!editor)
			return;

		const document = editor.document;

		const lineCount = document.lineCount;
		const newImports: string[] = [];

		for (let i = 0; i < lineCount; i++) {
			const currentLine = document.lineAt(i);
			const text = currentLine.text;

			const regex = /import(.*)/;
			const isImport = text.match(regex);

			if (!isImport)
				continue;

			const line = text.replace('teste', 'novo');

			newImports.push(line);
		}

		newImports.sort((a, b) => {
			if (a.length > b.length) {
				return 1;
			}
			if (a.length < b.length) {
				return -1;
			}
			return 0;
		});

		let start = new vscode.Position(0, 0);

		const lastIndex = newImports.length - 1;
		const lastLine = newImports[lastIndex];
		let end = new vscode.Position(lastIndex, lastLine.length);

		let selection = new vscode.Selection(start, end);
		editor.selection = selection;

		const result = newImports.join('\n');

		editor.edit(editBuilder => {
			editBuilder.replace(selection, result);
		});
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
