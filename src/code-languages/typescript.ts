export default class Typescript {

    static checkIfIsAnImport(text: string): boolean {

        const regex = /import(.*)/;
        const isAnImport = text.match(regex);

        return !isAnImport;
    }
}