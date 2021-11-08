import { CSharp } from "./csharp";
import { ICodeLanguage } from "./icode-language";
import Typescript from "./typescript";
import * as vscode from 'vscode';

export class CodeLanguage {

    static getCodeLanguage(languageId: string): ICodeLanguage | undefined {
        switch (languageId) {
            case 'typescript':
                return new Typescript();
            case 'csharp':
                return new CSharp();
            default:
                vscode.window.showInformationMessage(`The code language ${languageId} is not supported`);
        }
    }
}