// Generated by the ProjectIt Language Generator.
import * as uuid from "uuid";
import { PiElement, PiNamedElement, PiExpression, PiBinaryExpression } from "@projectit/core";
import { model, MobxModelElementImpl, observablepart } from "@projectit/core";
import { PiElementReference } from "./PiElementReference";
import { TaxRulesConceptType } from "./TaxRules";
import { TaxRule } from "./TaxRule";
import { IncomeType } from "./IncomeType";
import { TaxPayerType } from "./TaxPayerType";
import { PlaceholderExpression } from "./PlaceholderExpression";
import { Expression } from "./Expression";

@model
export class TaxRuleCall extends MobxModelElementImpl implements PiElement {
    readonly $typename: TaxRulesConceptType = "TaxRuleCall";
    $id: string;

    constructor(id?: string) {
        super();

        if (!!id) {
            this.$id = id;
        } else {
            this.$id = uuid.v4();
        }
    }

    @observablepart functionDefinition: PiElementReference<TaxRule>;

    piLanguageConcept(): TaxRulesConceptType {
        return this.$typename;
    }

    piId(): string {
        return this.$id;
    }

    piIsExpression(): boolean {
        return false;
    }

    piIsBinaryExpression(): boolean {
        return false;
    }
}
