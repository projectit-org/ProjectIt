// Generated by the ProjectIt Language Generator.
import * as uuid from "uuid";
import { PiElement, PiNamedElement, PiExpression, PiBinaryExpression } from "@projectit/core";
import { model } from "@projectit/core";
import { PiElementReference } from "./PiElementReference";
import { TaxRulesConceptType } from "./TaxRules";
import { IncomeType } from "./IncomeType";
import { TaxPayerType } from "./TaxPayerType";
import { PlaceholderExpression } from "./PlaceholderExpression";
import { Expression } from "./Expression";
import { BinaryExpression } from "./BinaryExpression";

@model
export class OrExpression extends BinaryExpression implements PiBinaryExpression {
    readonly $typename: TaxRulesConceptType = "OrExpression";

    constructor(id?: string) {
        super(id);

        this.left = new PlaceholderExpression();
        this.right = new PlaceholderExpression();
    }

    piLanguageConcept(): TaxRulesConceptType {
        return this.$typename;
    }

    piIsExpression(): boolean {
        return true;
    }

    piIsBinaryExpression(): boolean {
        return true;
    }

    piIsExpressionPlaceHolder(): boolean {
        return false;
    }

    public piSymbol(): string {
        return "or";
    }

    piPriority(): number {
        return 1;
    }

    public piLeft(): Expression {
        return this.left;
    }

    public piRight(): Expression {
        return this.right;
    }

    public piSetLeft(value: Expression): void {
        this.left = value;
    }

    public piSetRight(value: Expression): void {
        this.right = value;
    }
}
