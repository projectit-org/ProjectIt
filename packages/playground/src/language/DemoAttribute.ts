// Generated by the ProjectIt Language Generator.
import { observable } from "mobx";
import * as uuid from "uuid";
import { WithType } from "./WithType";
import { PiElement } from "@projectit/core";
import { model, MobxModelElementImpl } from "@projectit/model";
import { LanguageConceptType } from "./Language";

@model
export class DemoAttribute extends MobxModelElementImpl implements PiElement, WithType {
    readonly $type: LanguageConceptType = "DemoAttribute";
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

    get$Type(): LanguageConceptType {
        return this.$type;
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

    static create(name: string): DemoAttribute {
        const result = new DemoAttribute();
        result.name = name;
        return result;
    }
}