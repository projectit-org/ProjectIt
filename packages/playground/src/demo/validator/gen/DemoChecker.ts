// Generated by the ProjectIt Language Generator.
import { PiError, PiTyper } from "@projectit/core";
import {
    DemoModel,
    DemoEntity,
    DemoAttribute,
    DemoFunction,
    DemoVariable,
    DemoExpression,
    DemoPlaceholderExpression,
    DemoLiteralExpression,
    DemoStringLiteralExpression,
    DemoNumberLiteralExpression,
    DemoBooleanLiteralExpression,
    DemoAbsExpression,
    DemoBinaryExpression,
    DemoMultiplyExpression,
    DemoPlusExpression,
    DemoDivideExpression,
    DemoAndExpression,
    DemoOrExpression,
    DemoComparisonExpression,
    DemoLessThenExpression,
    DemoGreaterThenExpression,
    DemoEqualsExpression,
    DemoFunctionCallExpression,
    DemoIfExpression,
    DemoVariableRef,
    DemoAttributeType,
    DemoType
} from "../../language";
import { DemoUnparser } from "../../../demo/unparser/DemoUnparser";

export class DemoChecker {
    myUnparser = new DemoUnparser();
    public checkDemoModel(modelelement: DemoModel, typer: PiTyper, errorList: PiError[]) {
        // @validName name
        if (!this.isValidName(modelelement.name)) {
            errorList.push(new PiError("'" + modelelement.name + "' is not a valid identifier", name));
        }
        // @notEmpty this.entities
        if (modelelement.entities.length == 0) {
            errorList.push(new PiError("List 'this.entities' may not be empty", modelelement.entities));
        }
        // @notEmpty this.functions
        if (modelelement.functions.length == 0) {
            errorList.push(new PiError("List 'this.functions' may not be empty", modelelement.functions));
        }
    }

    public checkDemoEntity(modelelement: DemoEntity, typer: PiTyper, errorList: PiError[]) {
        // @validName name
        if (!this.isValidName(modelelement.name)) {
            errorList.push(new PiError("'" + modelelement.name + "' is not a valid identifier", name));
        }
        // @notEmpty this.attributes
        if (modelelement.attributes.length == 0) {
            errorList.push(new PiError("List 'this.attributes' may not be empty", modelelement.attributes));
        }
        // @notEmpty this.functions
        if (modelelement.functions.length == 0) {
            errorList.push(new PiError("List 'this.functions' may not be empty", modelelement.functions));
        }
    }

    public checkDemoAttribute(modelelement: DemoAttribute, typer: PiTyper, errorList: PiError[]) {
        // @validName name
        if (!this.isValidName(modelelement.name)) {
            errorList.push(new PiError("'" + modelelement.name + "' is not a valid identifier", name));
        }
    }

    public checkDemoFunction(modelelement: DemoFunction, typer: PiTyper, errorList: PiError[]) {
        // @typecheck conformsTo( this.expression, this.declaredType )
        if (!typer.conformsTo(modelelement.expression, modelelement.declaredType)) {
            errorList.push(
                new PiError(
                    "Type of '" +
                        this.myUnparser.unparse(modelelement.expression) +
                        "' does not conform to (the type of) '" +
                        this.myUnparser.unparse(modelelement.declaredType) +
                        "'",
                    modelelement.expression
                )
            );
        }
        // @notEmpty this.parameters
        if (modelelement.parameters.length == 0) {
            errorList.push(new PiError("List 'this.parameters' may not be empty", modelelement.parameters));
        }
        // @validName name
        if (!this.isValidName(modelelement.name)) {
            errorList.push(new PiError("'" + modelelement.name + "' is not a valid identifier", name));
        }
    }

    public checkDemoVariable(modelelement: DemoVariable, typer: PiTyper, errorList: PiError[]) {
        // @validName name
        if (!this.isValidName(modelelement.name)) {
            errorList.push(new PiError("'" + modelelement.name + "' is not a valid identifier", name));
        }
    }

    public checkDemoAbsExpression(modelelement: DemoAbsExpression, typer: PiTyper, errorList: PiError[]) {
        // @typecheck equalsType( this.expr, DemoAttributeType:Integer )
        if (!typer.equalsType(modelelement.expr, DemoAttributeType.Integer)) {
            errorList.push(
                new PiError(
                    "Type of '" +
                        this.myUnparser.unparse(modelelement.expr) +
                        "' should be equal to (the type of) '" +
                        this.myUnparser.unparse(DemoAttributeType.Integer) +
                        "'",
                    modelelement.expr
                )
            );
        }
    }

    public checkDemoMultiplyExpression(modelelement: DemoMultiplyExpression, typer: PiTyper, errorList: PiError[]) {
        // @typecheck equalsType( this.left, DemoAttributeType:Integer )
        if (!typer.equalsType(modelelement.left, DemoAttributeType.Integer)) {
            errorList.push(
                new PiError(
                    "Type of '" +
                        this.myUnparser.unparse(modelelement.left) +
                        "' should be equal to (the type of) '" +
                        this.myUnparser.unparse(DemoAttributeType.Integer) +
                        "'",
                    modelelement.left
                )
            );
        }
        // @typecheck equalsType( this.right, DemoAttributeType:Integer )
        if (!typer.equalsType(modelelement.right, DemoAttributeType.Integer)) {
            errorList.push(
                new PiError(
                    "Type of '" +
                        this.myUnparser.unparse(modelelement.right) +
                        "' should be equal to (the type of) '" +
                        this.myUnparser.unparse(DemoAttributeType.Integer) +
                        "'",
                    modelelement.right
                )
            );
        }
    }

    public checkDemoPlusExpression(modelelement: DemoPlusExpression, typer: PiTyper, errorList: PiError[]) {
        // @typecheck equalsType( this.left, DemoAttributeType:Integer )
        if (!typer.equalsType(modelelement.left, DemoAttributeType.Integer)) {
            errorList.push(
                new PiError(
                    "Type of '" +
                        this.myUnparser.unparse(modelelement.left) +
                        "' should be equal to (the type of) '" +
                        this.myUnparser.unparse(DemoAttributeType.Integer) +
                        "'",
                    modelelement.left
                )
            );
        }
        // @typecheck equalsType( this.right, DemoAttributeType:Integer )
        if (!typer.equalsType(modelelement.right, DemoAttributeType.Integer)) {
            errorList.push(
                new PiError(
                    "Type of '" +
                        this.myUnparser.unparse(modelelement.right) +
                        "' should be equal to (the type of) '" +
                        this.myUnparser.unparse(DemoAttributeType.Integer) +
                        "'",
                    modelelement.right
                )
            );
        }
        // @typecheck conformsTo( this.left, this.right )
        if (!typer.conformsTo(modelelement.left, modelelement.right)) {
            errorList.push(
                new PiError(
                    "Type of '" +
                        this.myUnparser.unparse(modelelement.left) +
                        "' does not conform to (the type of) '" +
                        this.myUnparser.unparse(modelelement.right) +
                        "'",
                    modelelement.left
                )
            );
        }
    }

    public checkDemoDivideExpression(modelelement: DemoDivideExpression, typer: PiTyper, errorList: PiError[]) {
        // @typecheck equalsType( this.lef, DemoAttributeType:Integer )
        if (!typer.equalsType(modelelement.lef, DemoAttributeType.Integer)) {
            errorList.push(
                new PiError(
                    "Type of '" +
                        this.myUnparser.unparse(modelelement.lef) +
                        "' should be equal to (the type of) '" +
                        this.myUnparser.unparse(DemoAttributeType.Integer) +
                        "'",
                    modelelement.lef
                )
            );
        }
        // @typecheck equalsType( this.right, DemoAttributeType:Integer )
        if (!typer.equalsType(modelelement.right, DemoAttributeType.Integer)) {
            errorList.push(
                new PiError(
                    "Type of '" +
                        this.myUnparser.unparse(modelelement.right) +
                        "' should be equal to (the type of) '" +
                        this.myUnparser.unparse(DemoAttributeType.Integer) +
                        "'",
                    modelelement.right
                )
            );
        }
    }

    public checkDemoAndExpression(modelelement: DemoAndExpression, typer: PiTyper, errorList: PiError[]) {
        // @typecheck equalsType( this.left, DemoAttributeType:Boolean )
        if (!typer.equalsType(modelelement.left, DemoAttributeType.Boolean)) {
            errorList.push(
                new PiError(
                    "Type of '" +
                        this.myUnparser.unparse(modelelement.left) +
                        "' should be equal to (the type of) '" +
                        this.myUnparser.unparse(DemoAttributeType.Boolean) +
                        "'",
                    modelelement.left
                )
            );
        }
        // @typecheck equalsType( this.right, DemoAttributeType:Boolean )
        if (!typer.equalsType(modelelement.right, DemoAttributeType.Boolean)) {
            errorList.push(
                new PiError(
                    "Type of '" +
                        this.myUnparser.unparse(modelelement.right) +
                        "' should be equal to (the type of) '" +
                        this.myUnparser.unparse(DemoAttributeType.Boolean) +
                        "'",
                    modelelement.right
                )
            );
        }
    }

    public checkDemoOrExpression(modelelement: DemoOrExpression, typer: PiTyper, errorList: PiError[]) {
        // @typecheck equalsType( this.left, DemoAttributeType:Boolean )
        if (!typer.equalsType(modelelement.left, DemoAttributeType.Boolean)) {
            errorList.push(
                new PiError(
                    "Type of '" +
                        this.myUnparser.unparse(modelelement.left) +
                        "' should be equal to (the type of) '" +
                        this.myUnparser.unparse(DemoAttributeType.Boolean) +
                        "'",
                    modelelement.left
                )
            );
        }
        // @typecheck equalsType( this.right, DemoAttributeType:Boolean )
        if (!typer.equalsType(modelelement.right, DemoAttributeType.Boolean)) {
            errorList.push(
                new PiError(
                    "Type of '" +
                        this.myUnparser.unparse(modelelement.right) +
                        "' should be equal to (the type of) '" +
                        this.myUnparser.unparse(DemoAttributeType.Boolean) +
                        "'",
                    modelelement.right
                )
            );
        }
    }

    public checkDemoComparisonExpression(modelelement: DemoComparisonExpression, typer: PiTyper, errorList: PiError[]) {
        // @typecheck equalsType( this.left, this.right )
        if (!typer.equalsType(modelelement.left, modelelement.right)) {
            errorList.push(
                new PiError(
                    "Type of '" +
                        this.myUnparser.unparse(modelelement.left) +
                        "' should be equal to (the type of) '" +
                        this.myUnparser.unparse(modelelement.right) +
                        "'",
                    modelelement.left
                )
            );
        }
    }

    public checkDemoIfExpression(modelelement: DemoIfExpression, typer: PiTyper, errorList: PiError[]) {
        // @typecheck equalsType( this.condition, DemoAttributeType:Boolean )
        if (!typer.equalsType(modelelement.condition, DemoAttributeType.Boolean)) {
            errorList.push(
                new PiError(
                    "Type of '" +
                        this.myUnparser.unparse(modelelement.condition) +
                        "' should be equal to (the type of) '" +
                        this.myUnparser.unparse(DemoAttributeType.Boolean) +
                        "'",
                    modelelement.condition
                )
            );
        }
        // @typecheck conformsTo( this.whenTrue, this.whenFalse )
        if (!typer.conformsTo(modelelement.whenTrue, modelelement.whenFalse)) {
            errorList.push(
                new PiError(
                    "Type of '" +
                        this.myUnparser.unparse(modelelement.whenTrue) +
                        "' does not conform to (the type of) '" +
                        this.myUnparser.unparse(modelelement.whenFalse) +
                        "'",
                    modelelement.whenTrue
                )
            );
        }
    }

    public checkDemoExpression(modelelement: DemoExpression, typer: PiTyper, errorList: PiError[]) {}

    public checkDemoPlaceholderExpression(modelelement: DemoPlaceholderExpression, typer: PiTyper, errorList: PiError[]) {}

    public checkDemoLiteralExpression(modelelement: DemoLiteralExpression, typer: PiTyper, errorList: PiError[]) {}

    public checkDemoStringLiteralExpression(modelelement: DemoStringLiteralExpression, typer: PiTyper, errorList: PiError[]) {}

    public checkDemoNumberLiteralExpression(modelelement: DemoNumberLiteralExpression, typer: PiTyper, errorList: PiError[]) {}

    public checkDemoBooleanLiteralExpression(modelelement: DemoBooleanLiteralExpression, typer: PiTyper, errorList: PiError[]) {}

    public checkDemoBinaryExpression(modelelement: DemoBinaryExpression, typer: PiTyper, errorList: PiError[]) {}

    public checkDemoLessThenExpression(modelelement: DemoLessThenExpression, typer: PiTyper, errorList: PiError[]) {}

    public checkDemoGreaterThenExpression(modelelement: DemoGreaterThenExpression, typer: PiTyper, errorList: PiError[]) {}

    public checkDemoEqualsExpression(modelelement: DemoEqualsExpression, typer: PiTyper, errorList: PiError[]) {}

    public checkDemoFunctionCallExpression(modelelement: DemoFunctionCallExpression, typer: PiTyper, errorList: PiError[]) {}

    public checkDemoVariableRef(modelelement: DemoVariableRef, typer: PiTyper, errorList: PiError[]) {}

    private isValidName(name: string): boolean {
        if (name == null) return false;
        // cannot start with number
        if (/[0-9]/.test(name[0])) return false;
        // may contain letters, numbers, '$', and '_', but no other characters
        if (/[.|,|!|?|@|~|%|^|&|*|-|=|+|(|)|{|}|"|'|:|;|<|>|?]/.test(name)) return false;
        if (/\\/.test(name)) return false;
        if (/[/|[|]]/.test(name)) return false;
        // may not contain whitespaces
        if (/[\t|\n|\r| ]/.test(name)) return false;
        // may not be a Typescript keyword
        // TODO implement this
        return true;
    }
}
