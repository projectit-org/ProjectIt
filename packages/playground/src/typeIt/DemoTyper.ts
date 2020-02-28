import { DemoAbsExpression, DemoAttributeType, DemoBinaryExpression, DemoComparisonExpression, 
    DemoEntity, DemoIfExpression, DemoNumberLiteralExpression, DemoStringLiteralExpression } from "../language";
import { DemoModelElement } from "../scopeIt/DemoModelElement";
import { DemoType } from "../language/DemoType";
import { type } from "os";

export interface Typer {
    inferType(modelelement: DemoModelElement) : DemoType;

    conform(type1: DemoType, type2: DemoType) : boolean; // type 1 <= type 2 conformance direction
    conformList(typelist1: DemoType[], typelist2: DemoType[]) : boolean;  

    isType(elem : DemoModelElement) : boolean;
    typeName(elem : DemoType): string; 
}

export class DemoTyper implements Typer {

    inferType(modelelement: DemoModelElement): DemoType {
        // generate if statement for all lang elements that have @hasType annotation
        // the result should be according to the @inferType rules
        // i.e. every @hasType annotated elem should have an @inferType rule
        if (this.isType(modelelement)) {
            return modelelement as DemoType;
        } else if (modelelement instanceof DemoStringLiteralExpression) {
            return DemoAttributeType.String;
        } else if (modelelement instanceof DemoNumberLiteralExpression) {
            return DemoAttributeType.Integer;
//        } else if (modelelement instanceof DemoBooleanLiteralExpression) {
//            return DemoAttributeType.Boolean;
        } else if (modelelement instanceof DemoComparisonExpression) { // moet voor zijn parent staan om deze te overriden!
            return DemoAttributeType.Boolean;
        } else if (modelelement instanceof DemoBinaryExpression) {
            return this.inferType(modelelement.left);
            // @inferType = commonSuperType(this.left.type, this.right.type)
        } else if (modelelement instanceof DemoAbsExpression) {
            return this.inferType(modelelement.expr);
    //    } else if (modelelement instanceof DemoVariableRef) {
    //        return modelelement.referredName.type;
    //    } else if (modelelement instanceof DemoFunctionCallExpression) {
    //        return modelelement.functionDefinition.name;
        } else if (modelelement instanceof DemoIfExpression) {
            return this.inferType(modelelement.whenTrue);
        }
        return DemoAttributeType.ANY; // default
    }    

    // for now: simply implemented on basis of equal identity of the types
    // should be implemented based on the conformance rules in Typer Description file
    conform(type1: DemoType, type2: DemoType): boolean {
        // @conformanceRule 'entityRule1' e1:PG_Entity <= e2:PG_Entity { // meaning that Entity e2 conforms to Entity e1 if the following holds
        //     e2.inheritsFrom(e1) // needs inheritance relationship between PG_Entities in .lang, this is currently not defined
        //     or 
        //     e2.attributes.equals(e1.attributes) // effectively, only this condition will be tested
        // }
        // if( type1 instanceof DemoEntity && type2 instanceof DemoEntity ) {
        //     // for now, check only if there is a name of an attribute that is the same on both types
        //     // TODO implement conformanceRule completely
        //     for( let attr1 of type1.attributes ) {
        //         for( let attr2 of type2.attributes ) {
        //             return attr1.name === attr2.name;
        //         }
        //     }
        // }
        if( type1.$id === type2.$id) return true;
        return false;
    }

    conformList(typelist1: DemoType[], typelist2: DemoType[]): boolean {
        if (typelist1.length !== typelist2.length) return false;
        let result : boolean = true;
        for (let index in typelist1) {
            result = this.conform(typelist1[index], typelist2[index]);
            if (result == false) return result;
        }
        return result;
    }

    isType(elem: DemoModelElement): boolean { // ook hier alle namen gemerkt met @isType
        if (elem instanceof DemoEntity) {
            console.log("isType: checking " + elem.name + " of metatype " + elem.get$Type());
            return true;
        } else if (elem instanceof DemoAttributeType) {
            console.log("isType: checking " + elem.asString() + " of metatype " + elem.get$Type());
            return true;
        }
        return false;
    }

    typeName(elem: DemoType): string { 
        if (elem instanceof DemoEntity) return elem.name;
        if (elem instanceof DemoAttributeType) return elem.asString();
        return "";
    }
}