// Generated by the ProjectIt Language Generator.
import {
    DemoAbsExpression,
    DemoAndExpression,
    DemoAttribute,
    DemoAttributeType,
    DemoBinaryExpression,
    DemoBooleanLiteralExpression,
    DemoComparisonExpression,
    DemoDivideExpression,
    DemoEntity,
    DemoEqualsExpression,
    DemoExpression,
    DemoFunction,
    DemoFunctionCallExpression,
    DemoGreaterThenExpression,
    DemoIfExpression,
    DemoLessThenExpression,
    DemoLiteralExpression,
    DemoModel,
    DemoMultiplyExpression,
    DemoNumberLiteralExpression,
    DemoOrExpression,
    DemoPlaceholderExpression,
    DemoPlusExpression,
    DemoStringLiteralExpression,
    DemoType,
    DemoVariable,
    DemoVariableRef,
    PiElementReference
} from "../../language";

export class DemoCreator {
    public createDemoModel(name: string, functions: DemoFunction, entities: DemoEntity): DemoModel {
        let _result = new DemoModel();
        _result.name = name;

        if (functions !== null) _result.functions.push(functions);
        if (entities !== null) _result.entities.push(entities);

        return _result;
    }
    public createDemoEntity(name: string, attributes: DemoAttribute, functions: DemoFunction): DemoEntity {
        let _result = new DemoEntity();
        _result.name = name;

        if (attributes !== null) _result.attributes.push(attributes);
        if (functions !== null) _result.functions.push(functions);

        return _result;
    }
    public createDemoAttribute(name: string, declaredType: DemoAttributeType): DemoAttribute {
        let _result = new DemoAttribute();
        _result.name = name;
        _result.declaredType = declaredType;

        return _result;
    }
    public createDemoFunction(
        name: string,
        declaredType: DemoAttributeType,
        expression: DemoExpression,
        parameters: DemoVariable
    ): DemoFunction {
        let _result = new DemoFunction();
        _result.name = name;
        _result.declaredType = declaredType;
        _result.expression = expression;
        if (parameters !== null) _result.parameters.push(parameters);

        return _result;
    }
    public createDemoVariable(name: string, declaredType: DemoAttributeType): DemoVariable {
        let _result = new DemoVariable();
        _result.name = name;
        _result.declaredType = declaredType;

        return _result;
    }

    public createDemoPlaceholderExpression(): DemoPlaceholderExpression {
        let _result = new DemoPlaceholderExpression();

        return _result;
    }

    public createDemoStringLiteralExpression(value: string): DemoStringLiteralExpression {
        let _result = new DemoStringLiteralExpression();
        _result.value = value;

        return _result;
    }
    public createDemoNumberLiteralExpression(value: string): DemoNumberLiteralExpression {
        let _result = new DemoNumberLiteralExpression();
        _result.value = value;

        return _result;
    }
    public createDemoBooleanLiteralExpression(value: string): DemoBooleanLiteralExpression {
        let _result = new DemoBooleanLiteralExpression();
        _result.value = value;

        return _result;
    }
    public createDemoAbsExpression(expr: DemoExpression): DemoAbsExpression {
        let _result = new DemoAbsExpression();

        _result.expr = expr;

        return _result;
    }

    public createDemoMultiplyExpression(left: DemoExpression, right: DemoExpression): DemoMultiplyExpression {
        let _result = new DemoMultiplyExpression();

        _result.left = left;
        _result.right = right;

        return _result;
    }
    public createDemoPlusExpression(left: DemoExpression, right: DemoExpression): DemoPlusExpression {
        let _result = new DemoPlusExpression();

        _result.left = left;
        _result.right = right;

        return _result;
    }
    public createDemoDivideExpression(left: DemoExpression, right: DemoExpression): DemoDivideExpression {
        let _result = new DemoDivideExpression();

        _result.left = left;
        _result.right = right;

        return _result;
    }
    public createDemoAndExpression(left: DemoExpression, right: DemoExpression): DemoAndExpression {
        let _result = new DemoAndExpression();

        _result.left = left;
        _result.right = right;

        return _result;
    }
    public createDemoOrExpression(left: DemoExpression, right: DemoExpression): DemoOrExpression {
        let _result = new DemoOrExpression();

        _result.left = left;
        _result.right = right;

        return _result;
    }

    public createDemoLessThenExpression(left: DemoExpression, right: DemoExpression): DemoLessThenExpression {
        let _result = new DemoLessThenExpression();

        _result.left = left;
        _result.right = right;

        return _result;
    }
    public createDemoGreaterThenExpression(left: DemoExpression, right: DemoExpression): DemoGreaterThenExpression {
        let _result = new DemoGreaterThenExpression();

        _result.left = left;
        _result.right = right;

        return _result;
    }
    public createDemoEqualsExpression(left: DemoExpression, right: DemoExpression): DemoEqualsExpression {
        let _result = new DemoEqualsExpression();

        _result.left = left;
        _result.right = right;

        return _result;
    }
    public createDemoFunctionCallExpression(functionDefinition: DemoFunction): DemoFunctionCallExpression {
        let _result = new DemoFunctionCallExpression();

        _result.functionDefinition = new PiElementReference(functionDefinition, "DemoFunction");
        return _result;
    }
    public createDemoIfExpression(condition: DemoExpression, whenTrue: DemoExpression, whenFalse: DemoExpression): DemoIfExpression {
        let _result = new DemoIfExpression();

        _result.condition = condition;
        _result.whenTrue = whenTrue;
        _result.whenFalse = whenFalse;

        return _result;
    }
    public createDemoVariableRef(attribute: DemoAttribute): DemoVariableRef {
        let _result = new DemoVariableRef();

        _result.attribute = new PiElementReference(attribute, "DemoAttribute");
        return _result;
    }
}
