import { ICodeLanguage } from "./icode-language";

export class CSharp implements ICodeLanguage {
    checkIfIsAnImport(text: string): boolean {
        const regex = /using(.*)/;

        return !text.match(regex);
    }

}