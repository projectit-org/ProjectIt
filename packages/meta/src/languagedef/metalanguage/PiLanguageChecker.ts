import { Checker } from "../../utils/Checker";
import { PiLangConcept, PiLangConceptReference, PiLangElementProperty, PiLanguage } from "./PiLanguage";

// export type CheckB = { check: boolean, error: string, whenOk?: () => void };

export class PiLanguageChecker extends Checker<PiLanguage> {

    public check(language: PiLanguage): void {
        this.nestedCheck(
            {
                check: !!language.name,
                error: "Language should have a name, it is empty"
            });
        language.concepts.forEach(concept => this.checkConcept(concept));
    }

    checkConcept(concept: PiLangConcept): void {
        this.simpleCheck(!!concept.name, "Concept should have a name, it is empty");
        if(!!concept.base) {
            this.checkConceptReference(concept.base);
        }

        concept.parts.forEach(part => this.checkPiElementProperty(part));
        concept.references.forEach(ref => this.checkPiElementProperty(ref));

        if (concept.binaryExpression() && !(concept.isAbstract)) {
            this.simpleCheck(concept.getSymbol() !== "undefined", `Concept ${concept.name} should have a symbol`);
            this.simpleCheck(concept.getPriority() !== -1, `Concept ${concept.name} should have a priority`);

            const left = concept.allParts().find(part => part.name === "left");
            this.simpleCheck(!!left, `Concept ${concept.name} should have a left part, because it is a binary expression`);
            this.simpleCheck(!!left && left.type.concept().expression(), `Concept ${concept.name}.left should be an expression, but it isn't`);

            const right = concept.allParts().find(part => part.name === "right");
            this.simpleCheck(!!right, `Concept ${concept.name} should have a right part, because it is a binary expression`);
            this.simpleCheck(!!right && right.type.concept().expression(), `Concept ${concept.name}.right should be an expression, but it isn't`);
        }
    }

    checkPiElementProperty(element: PiLangElementProperty): void {
        this.simpleCheck(!!element.name, "Property should have a name, it is empty");
        this.nestedCheck(
            {
                check: !!element.type,
                error: "Element should have a type",
                whenOk: () => this.checkConceptReference(element.type)
            });
    }

    checkConceptReference(reference: PiLangConceptReference) {
        this.nestedCheck(
            {
                check: reference.name !== undefined,
                error: `Element reference ${"UNKNOWN"}.type should have a name, but doesn't`,
                whenOk: () => this.nestedCheck(
                    {
                        check: reference.concept() !== undefined,
                        error: `ElementReference to ${reference.name} cannot be resolved`
                    })
            })
    }
}
