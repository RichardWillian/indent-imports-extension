import { ICodeLanguage } from "./icode-language";

export default class Typescript implements ICodeLanguage {

    checkIfIsAnImport(text: string): boolean {
        const regex = /^import(.*)/;

        return !text.match(regex);
    }
}