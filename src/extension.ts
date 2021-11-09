import * as vscode from 'vscode';
import './shared/array.extenstion';
import Line from './model/line.model';
import { CodeLanguage } from './code-language/code-language';

export function activate(context: vscode.ExtensionContext) {

	const disposable = vscode.commands.registerCommand('extension.indent-imports', () => {

		const editor = vscode.window.activeTextEditor;

		if (!editor)
			return;

		const document = editor.document;

		const lineCount = document.lineCount;
		const importsForIndentation: Line[] = [];

		const codeLanguage = CodeLanguage.getCodeLanguage(document.languageId);

		if (!codeLanguage)
			return;

		for (let i = 0; i < lineCount; i++) {
			const currentLine = document.lineAt(i);
			const text = currentLine.text;

			if (codeLanguage.checkIfIsAnImport(text))
				continue;

			importsForIndentation.push(new Line(text, currentLine.lineNumber));
		}

		console.log(importsForIndentation);

		if (importsForIndentation.length === 0) {
			vscode.window.showInformationMessage('There are no elements to identify. Check the code language of your current file.');
			return;
		}

		importsForIndentation.map(x => x.text);

		const selection = defineSelectionOfImports(importsForIndentation, editor);

		const result = importsForIndentation.map(x => x.text).orderByLength().join('\n');

		editor.edit(editBuilder => {
			editBuilder.replace(selection, result);
		});
	});

	context.subscriptions.push(disposable);
}

function defineSelectionOfImports(importsForIndentation: Line[], editor: vscode.TextEditor) {
	const firstLine = importsForIndentation[0];
	const start = new vscode.Position(firstLine.lineNumber, 0);

	const lastIndex = importsForIndentation.length - 1;
	const lastLine = importsForIndentation[lastIndex];

	const end = new vscode.Position(lastLine.lineNumber, lastLine.text.length);

	const selection = new vscode.Selection(start, end);
	editor.selection = selection;
	
	return selection;
}

// this method is called when your extension is deactivated
export function deactivate() { }
