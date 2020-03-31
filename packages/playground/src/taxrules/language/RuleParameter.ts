// Generated by the ProjectIt Language Generator.
import { observable } from "mobx";
import * as uuid from "uuid";
import { PiElement, PiNamedElement, PiExpression, PiBinaryExpression } from "@projectit/core";
import { model, MobxModelElementImpl, observablepart } from "@projectit/core";
import { PiElementReference } from "./PiElementReference";
import { TaxRulesConceptType } from "./TaxRules";
import { IncomePart } from "./IncomePart";
import { IncomeType } from "./IncomeType";
import { TaxPayerType } from "./TaxPayerType";
import { PlaceholderExpression } from "./PlaceholderExpression";
import { Expression } from "./Expression";

@model
export class RuleParameter extends MobxModelElementImpl implements PiNamedElement {
    readonly $typename: TaxRulesConceptType = "RuleParameter";
    $id: string;

    constructor(id?: string) {
        super();

        if (!!id) {
            this.$id = id;
        } else {
            this.$id = uuid.v4();
        }
    }

    @observable name: string;

    @observablepart type: IncomePart;

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

    static create(name: string): RuleParameter {
        const result = new RuleParameter();
        result.name = name;
        return result;
    }
}
