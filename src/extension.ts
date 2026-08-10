import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	const onEnter = vscode.commands.registerCommand('semi-auto.onEnter', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;


		editor.edit(editBuilder => {
			editBuilder.insert(editor.selection.active, ';\n');
		});
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