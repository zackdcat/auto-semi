import * as vscode from 'vscode';

function shouldInsertSemicolon(editor: vscode.TextEditor): boolean {
	const position = editor.selection.active;
	const line = editor.document.lineAt(position.line);
	const textBeforeCursor = line.text.substring(0, position.character);
	const trimmed = textBeforeCursor.trim();

	if (trimmed.length === 0) return false;
	if (trimmed.endsWith(';')) return false;

	return true;
}

export function activate(context: vscode.ExtensionContext) {

	const onEnter = vscode.commands.registerCommand('semi-auto.onEnter', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;

		if (shouldInsertSemicolon(editor)) {
			editor.edit(editBuilder => {
				editBuilder.insert(editor.selection.active, ';\n');
			});
		} else {
			editor.edit(editBuilder => {
				editBuilder.insert(editor.selection.active, '\n');
			});
		}
	});

	const onCtrlEnter = vscode.commands.registerCommand('semi-auto.onCtrlEnter', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;


		editor.edit(editBuilder => {
			editBuilder.insert(editor.selection.active, '\n');
		});
	});

	context.subscriptions.push(onEnter, onCtrlEnter);
}

export function deactivate() {}