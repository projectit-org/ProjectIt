import { PiElementReference } from "./PiElementReference";
import { PiLangElement } from "./PiLangElement";

const primitiveTypeName = "PiPrimitiveType";

export class PiLanguageUnit extends PiLangElement {
    concepts: PiConcept[] = [];
    interfaces: PiInterface[] = [];
    predefInstances: PiInstance[] = [];
    expressionPlaceHolder: PiExpressionConcept; // set by checker??
    rootConcept: PiConcept; // set by the checker TODO: check this

    constructor() {
        super();
        this.addPredefinedElements();
    }

    findConcept(name: string): PiConcept {
        return this.concepts.find(con => con.name === name);
    }

    findInterface(name: string): PiInterface {
        return this.interfaces.find(con => con.name === name);
    }

    findClassifier(name: string): PiClassifier {
        let result : PiClassifier;
        result = this.findConcept(name);
        if (result === undefined) result = this.findInterface(name);
        return result;
    }

    findExpressionBase(): PiExpressionConcept {
        const result = this.concepts.find(c => {
            return c instanceof PiExpressionConcept && (!!c.base ? !(c.base.referred instanceof PiExpressionConcept) : true);
        });
        return result as PiExpressionConcept;
    }

    private addPredefinedElements() {
        // make the primitive types
        let primitiveTypeConcept = new PiConcept();
        primitiveTypeConcept.name = "PiPrimitiveType";
        primitiveTypeConcept.language = this;
        this.concepts.push(primitiveTypeConcept);
        let STRING = new PiInstance();
        STRING.name = "string";
        STRING.concept = PiElementReference.create<PiConcept>(primitiveTypeConcept, "PiConcept");
        STRING.concept.owner = STRING;
        this.predefInstances.push(STRING);
        let NUMBER = new PiInstance();
        NUMBER.name = "number";
        NUMBER.concept = PiElementReference.create<PiConcept>(primitiveTypeConcept, "PiConcept");
        NUMBER.concept.owner = NUMBER;
        this.predefInstances.push(NUMBER);
        let BOOLEAN = new PiInstance();
        BOOLEAN.name = "boolean";
        BOOLEAN.concept = PiElementReference.create<PiConcept>(primitiveTypeConcept, "PiConcept");
        BOOLEAN.concept.owner = BOOLEAN;
        this.predefInstances.push(BOOLEAN);
        // TODO make the predefined functions
    }
}

export abstract class PiClassifier extends PiLangElement {
    language: PiLanguageUnit;
    properties: PiProperty[] = [];
    primProperties: PiPrimitiveProperty[] = [];

    parts(): PiConceptProperty[] {
        // return this.properties.filter(p => p instanceof PiConceptProperty && p.isPart);
        let result: PiConceptProperty[] = [];
        for (let prop of this.properties) {
            if (prop instanceof PiConceptProperty && prop.isPart) {
                result.push(prop);
            }
        }
        return result;
    }

    references(): PiConceptProperty[] {
        let result: PiConceptProperty[] = [];
        for (let prop of this.properties) {
            if (prop instanceof PiConceptProperty && !prop.isPart) {
                result.push(prop);
            }
        }
        return result;
    }

    allPrimProperties(): PiPrimitiveProperty[] {
        return this.primProperties;
    }

    allParts(): PiConceptProperty[] {
        return this.parts();
    }

    allReferences(): PiConceptProperty[] {
        return this.references();
    }

    allProperties(): PiProperty[] {
        let result : PiProperty[] = [];
        result = result.concat(this.allPrimProperties()).concat(this.allParts()).concat(this.allReferences());
        return result;
    }
}

export class PiInterface extends PiClassifier {
    base: PiElementReference<PiInterface>[] = [];

    allPrimProperties(): PiPrimitiveProperty[] {
        let result: PiPrimitiveProperty[] = this.primProperties;
        for (let intf of this.base) {
            result = result.concat(intf.referred.allPrimProperties());
        }
        return result;
    }

    allParts(): PiConceptProperty[] {
        let result: PiConceptProperty[] = this.parts();
        for (let intf of this.base) {
            result = result.concat(intf.referred.allParts());
        }
        return result;
    }

    allReferences(): PiConceptProperty[] {
        let result: PiConceptProperty[] = this.references();
        for (let intf of this.base) {
            result = result.concat(intf.referred.allReferences());
        }
        return result;
    }

    allProperties(): PiProperty[] {
        let result : PiProperty[] = [];
        result = result.concat(this.allPrimProperties()).concat(this.allParts()).concat(this.allReferences());
        return result;
    }
}

export class PiConcept extends PiClassifier {
    isAbstract: boolean = false;
    isRoot:boolean = false;
    base: PiElementReference<PiConcept>;
    interfaces: PiElementReference<PiInterface>[] = []; // the interfaces that this concept implements
    // TODO the following should be moved to the editor generator
    triggerIsRegExp: boolean;

    allPrimProperties(): PiPrimitiveProperty[] {
        let result: PiPrimitiveProperty[] = this.primProperties;
        if (!!this.base) {
            result = result.concat(this.base.referred.allPrimProperties());
        }
        for (let intf of this.interfaces) {
            result = result.concat(intf.referred.allPrimProperties());
        }
        return result;
    }

    allParts(): PiConceptProperty[] {
        let result: PiConceptProperty[] = this.parts();
        if (!!this.base) {
            result = result.concat(this.base.referred.allParts());
        }
        for (let intf of this.interfaces) {
            result = result.concat(intf.referred.allParts());
        }
        return result;
    }

    allReferences(): PiConceptProperty[] {
        let result: PiConceptProperty[] = this.references();
        if (!!this.base) {
            result = result.concat(this.base.referred.allReferences());
        }
        for (let intf of this.interfaces) {
            result = result.concat(intf.referred.allReferences());
        }
        return result;
    }

    allProperties(): PiProperty[] {
        let result : PiProperty[] = [];
        result = result.concat(this.allPrimProperties()).concat(this.allParts()).concat(this.allReferences());
        return result;
    }

    implementedPrimProperties(): PiPrimitiveProperty[] {
        let result: PiPrimitiveProperty[] = this.primProperties;
        for (let intf of this.interfaces) {
            result = result.concat(intf.referred.allPrimProperties());
        }
        return result;
    }

    implementedParts(): PiConceptProperty[] {
        let result: PiConceptProperty[] = this.parts();
        for (let intf of this.interfaces) {
            result = result.concat(intf.referred.allParts());
        }
        return result;
    }

    implementedPReferences(): PiConceptProperty[] {
        let result: PiConceptProperty[] = this.references();
        for (let intf of this.interfaces) {
            result = result.concat(intf.referred.allReferences());
        }
        return result;
    }

    implementedProperties(): PiProperty[] {
        let result : PiProperty[] = [];
        result = result.concat(this.implementedPrimProperties()).concat(this.implementedParts()).concat(this.implementedPReferences());
        return result;
    }

    allSubConceptsDirect(): PiConcept[] {
        return this.language.concepts.filter(c => c.base?.referred === this);
    }

    allSubConceptsRecursive(): PiConcept[] {
        var result = this.language.concepts.filter(c => c.base?.referred === this);
        const tmp = this.language.concepts.filter(c => c.base?.referred === this);
        tmp.forEach(concept => result = result.concat(concept.allSubConceptsRecursive()));
        return result;
    }
}

export class PiExpressionConcept extends PiConcept {
    _isPlaceHolder: boolean;

    isExpressionPlaceholder(): boolean {
        return this._isPlaceHolder;
    }
}

export class PiBinaryExpressionConcept extends PiExpressionConcept {
    // left: PiExpressionConcept;
    // right: PiExpressionConcept;
    // TODO move to editor
    symbol: string;
    priority: number;

    getSymbol(): string {
        const p = this.symbol;
        return (!!p ? p : "undefined");
    }

    getPriority(): number {
        const p = this.priority;
        return (!!p ? p : -1);
    }
}

export class PiLimitedConcept extends PiConcept {
    instances: PiInstance[] = [];
}

export class PiProperty extends PiLangElement {
    isOptional: boolean;
    isList: boolean;
    isPart: boolean; // if false then it is a reference property
    type: PiElementReference<PiConcept>; // TODO this should be PiElementReference<PiClassifier>
    owningConcept: PiClassifier;
}

export class PiConceptProperty extends PiProperty {
    hasLimitedType: boolean; // set in checker
}

export class PiPrimitiveProperty extends PiProperty {
    isStatic: boolean;
	initialValue: string;
    primType: string;
    // The inherited 'type' cannot be used, because 'this' has a primitive type,
    // which is not a subtype of PiReference<PiConcept>
    // Therefore, here we have:
    // TODO dit moet beter worden!!!
    get type() : PiElementReference<PiConcept> {
        return PiElementReference.createNamed<PiConcept>(primitiveTypeName, "PiConcept");
    }
}

export class PiInstance extends PiLangElement {
    concept: PiElementReference<PiConcept>; // should be a limited concept
    props: PiPropertyInstance[] = [];
}

export class PiPropertyInstance extends PiLangElement {
    owningInstance: PiElementReference<PiInstance>;
    property: PiElementReference<PiProperty>;
    value: string;
}

// the following two classes are only used in the typer and validator definitions
export class PiFunction extends PiLangElement {
    language: PiLanguageUnit;
    formalparams: PiParameter[] = [];
    returnType: PiElementReference<PiConcept>;
}

export class PiParameter extends PiLangElement {
    type: PiElementReference<PiConcept>;
}
