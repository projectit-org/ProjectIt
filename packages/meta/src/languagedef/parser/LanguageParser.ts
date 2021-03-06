import { PiLanguage, PiLanguageChecker } from "../metalanguage/";
import { PiParser } from "../../utils/PiParser";
import * as pegjsParser from "./LanguageGrammar";
import { getNonFatalParseErrors, setCurrentFileName } from "./LanguageCreators";
import { MetaLogger } from "../../utils/MetaLogger";

const LOGGER = new MetaLogger("LanguageParser").mute();

export class LanguageParser extends PiParser<PiLanguage> {
    constructor() {
        super();
        this.parser = pegjsParser;
        this.checker = new PiLanguageChecker(null);
    }

    protected merge(submodels: PiLanguage[]): PiLanguage {
        if (submodels.length > 0) {
            const result: PiLanguage = new PiLanguage();
            result.name = submodels[0].name;
            for (const sub of submodels) {
                if (sub.name === result.name) { // all submodels should be of the same model
                    result.concepts.push(...sub.concepts);
                    result.interfaces.push(...sub.interfaces);
                } else {
                    LOGGER.error(this, "All submodels should be of the same model, found submodel: '" + sub.name + "' in '" + result.name + "'.")
                }
            }
            result.conceptsAndInterfaces().forEach(classifier => {
                classifier.language = result;
            });
            return result;
        } else {
            return null;
        }
    }

    protected setCurrentFileName(file: string) {
        setCurrentFileName(file);
    }

    protected getNonFatalParseErrors() : string[] {
        return getNonFatalParseErrors();
    }
}
