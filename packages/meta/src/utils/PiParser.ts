import * as fs from "fs";
import { Checker } from "./Checker";
import { Parser } from "pegjs";
/**
 * Generic Parser, subclasses need to initialize the parser, checker and msg fields.
 */
export class PiParser<DEFINITION> {

    // No known type, as this is a Javascript parser object generated by pegjs.
    parser: Parser;
    checker: Checker<DEFINITION>;
    msg: string;

    parse(definitionFile: string): DEFINITION {
        // Check language file
        if (!fs.existsSync(definitionFile)) {
            console.log(this.msg + " definition file '" + definitionFile + "' does not exist, exiting.");
            process.exit(-1);
        }
        console.log(this.msg + " file is [" + definitionFile + "] ");
        const langSpec: string = fs.readFileSync(definitionFile, { encoding: "UTF8" });
        // Parse Language file
        let model: DEFINITION = null;
        try {
            model = this.parser["parse"](langSpec);
        } catch (e) {
            console.log(this.msg + ": Exception in Parser: " + e);
            console.log(JSON.stringify(e, null, 4));
            console.log("Location " + e.location.line + " col " + e.location.column);
            process.exit(-1);
        }
        if (model !== null) {
            this.checker.check(model);
            if (this.checker.hasErrors()) {
                console.log(this.msg + " checking errors:");
                this.checker.errors.forEach(error => console.log(error));
                console.log("Stopping because of errors.");
                process.exit(-1);
            }
            return model;
        } else {
            // TODO change error message
            console.log("ERROR: Language parser does not return a PiLanguage");
            process.exit(-1);
        }
    }
}