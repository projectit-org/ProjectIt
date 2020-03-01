import { Names } from "../../Names";
import { PiLanguage } from "../../../metalanguage/PiLanguage";

export class LanguageIndexTemplate {
    constructor() {
    }

    generateIndex(language: PiLanguage): string {
        // sort all names alphabetically
        let tmp : string[] = [];
        language.concepts.map(c => 
            tmp.push(Names.concept(c))
        );
        language.enumerations.map(c =>
            tmp.push(Names.enumeration(c))
        );
        language.types.map(c =>
            tmp.push(Names.type(c))
        );
        tmp.push("WithType");
        tmp = tmp.sort();

        // the template starts here
        return `
        ${tmp.map(c => 
            `export * from "./${c}";`
        ).join("\n")}
        `;
    }

}
