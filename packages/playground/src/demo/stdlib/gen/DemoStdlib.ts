// Generated by the ProjectIt Language Generator.
import { PiNamedElement, PiStdlib } from "@projectit/core";
import { DemoAttributeType } from "../../language/gen";

export class DemoStdlib implements PiStdlib {
    private static stdlib: PiStdlib;

    public static getInstance(): PiStdlib {
        if (this.stdlib === undefined || this.stdlib === null) {
            this.stdlib = new DemoStdlib();
        }
        return this.stdlib;
    }

    elements: PiNamedElement[] = [];

    constructor() {}
}