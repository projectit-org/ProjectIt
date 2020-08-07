import { CONFIGURATION_FOLDER, ENVIRONMENT_GEN_FOLDER, Names, PathProvider, PROJECTITCORE } from "../../../utils";
import { PiLanguage } from "../../../languagedef/metalanguage/PiLanguage";
import { PiValidatorDef } from "../../../validatordef/metalanguage/ValidatorDefLang";

export class ValidatorTemplate {
    errorClassName : string = Names.PiError;
    validatorInterfaceName: string = Names.PiValidator;
    typerInterfaceName: string = Names.PiTyper;

    constructor() {
    }

    generateValidator(language: PiLanguage, validdef: PiValidatorDef, relativePath: string): string {
        const doValidDef = validdef !== null && validdef !== undefined;

        const allLangConcepts: string = Names.allConcepts(language);
        const generatedClassName: string = Names.validator(language);
        const rulesChecker: string = Names.rulesChecker(language);
        const nonOptionalsChecker: string = Names.nonOptionalsChecker(language);
        const referenceChecker: string = Names.referenceChecker(language);
        const walkerClassName: string = Names.walker(language);
    
        // Template starts here 
        return `
        import { ${this.validatorInterfaceName}, ${this.errorClassName}, ${this.typerInterfaceName} } from "${PROJECTITCORE}";
        import { ${allLangConcepts} } from "${relativePath}${PathProvider.allConcepts(language)}";
        import { ${nonOptionalsChecker} } from "./${nonOptionalsChecker}";    
        ${doValidDef ? `import { ${rulesChecker} } from "./${rulesChecker}";` : ``}
        import { ${referenceChecker} } from "./${referenceChecker}";
        import { ${walkerClassName} } from "${relativePath}${PathProvider.walker(language)}"; 
        import { projectitConfiguration } from "${relativePath}${CONFIGURATION_FOLDER}/${Names.configuration(language)}";

        /**
         * Class ${generatedClassName} implements the validator generated from, if present, the validator definition,
         * otherwise this class implements the default validator.
         * The implementation uses the visitor pattern to traverse the tree. Class ${walkerClassName} implements 
         * the actual checking of each node in the tree.
         */
        export class ${generatedClassName} implements ${this.validatorInterfaceName} {

            /**
             * Returns the list of errors found in 'modelelement'.
             * This method uses the visitor pattern to traverse the tree with 'modelelement' as top node, 
             * where classes ${nonOptionalsChecker}, ${referenceChecker},  implements the actual checking of each node in the tree.
             *
             * @param modelelement
             * @param includeChildren if true, the children of 'modelelement' are also checked.
             * The default for 'includeChildren' is true.
             */
            public validate(modelelement: ${allLangConcepts}, includeChildren?: boolean) : ${this.errorClassName}[]{
                // set the default such that children are included 
                // we do not use the TypeScript default for a parameter because we cannot distinguish a null value passed to this method
                // from no value for 'includeChildren'
                if (!!includeChildren) {
                } else {
                    includeChildren = true;
                }
                // initialize the errorlist        
                let errorlist : ${this.errorClassName}[] = [];
                
                // create the walker over the model tree
                let myWalker = new ${walkerClassName}();
                
                // create the checker on non-optional parts
                let myChecker = new ${nonOptionalsChecker}();
                myChecker.errorList = errorlist;      
                // and add the checker to the walker
                myWalker.myWorkers.push( myChecker );
                          
                // create the checker on references
                myChecker = new ${referenceChecker}();
                myChecker.errorList = errorlist;
                // and add the checker to the walker
                myWalker.myWorkers.push( myChecker );     
                ${doValidDef ? `               
                    // create the checker based on the rules in the validation definition (.valid file)
                    myChecker = new ${rulesChecker}();
                    myChecker.errorList = errorlist;
                    // and add the checker to the walker
                    myWalker.myWorkers.push( myChecker );`
                : `` }
                
                // add any custom validations
                myWalker.myWorkers.push(...projectitConfiguration.customValidations);
                                
                // do the work
                myWalker.walk(modelelement, ()=> { return includeChildren; } );

                // return any errors
                return errorlist;                               
            }
        }`;
    }

    generateIndex(language: PiLanguage, validdef: PiValidatorDef): string {
        return `
        export * from "./${Names.nonOptionalsChecker(language)}";
        export * from "./${Names.validator(language)}";
        ${!!validdef ? `export * from "./${Names.rulesChecker(language)}";` : ``}
        `;
    }
}
