// Generated by the ProjectIt Language Generator.
import { PiProjection, PiElement, Box } from "@projectit/core";

/**
 * Class CustomTestprojectProjection provides an entry point for the language engineer to
 * define custom build additions to the editor.
 * These custom build additions are merged with the default and definition-based editor parts
 * in a three-way manner. For each modelelement,
 * (1) if a custom build creator/behavior is present, this is used,
 * (2) if a creator/behavior based on the editor definition is present, this is used,
 * (3) if neither (1) nor (2) yields a result, the default is used.
 */
export class CustomTestprojectProjection implements PiProjection {
    rootProjection: PiProjection;
    name: string = "manual";

    constructor(name?: string) {
        if (!!name) {
            this.name = name;
        }
    }

    getBox(element: PiElement): Box {
        // Add any handmade projections of your own before next statement
        return null;
    }
}