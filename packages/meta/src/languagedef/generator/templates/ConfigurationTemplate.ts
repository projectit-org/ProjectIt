import {
    Names,
    PROJECTITCORE,
    EDITOR_FOLDER,
    VALIDATOR_GEN_FOLDER
} from "../../../utils/";
import { PiLanguage } from "../../metalanguage";

export class ConfigurationTemplate {

    generate(language: PiLanguage, relativePath: string): string {
        const configurationName = Names.configuration();
        const workerName = Names.checkerInterface(language);
        return `
            import { ${Names.PiProjection}, ${Names.PiActions}} from "${PROJECTITCORE}";
            import { ${Names.customActions(language)}, ${Names.customProjection(language)} } from "${relativePath}${EDITOR_FOLDER}";
            import { ${workerName } } from "${relativePath}${VALIDATOR_GEN_FOLDER}";
            
            /**
             * Class ${configurationName} is TODO add comment
             */
            class ${configurationName} {
                // add your custom editor projections here
                customProjection: ${Names.PiProjection}[] = [new ${Names.customProjection(language)}("manual")];
                // add your custom editor actions here
                customActions: ${Names.PiActions}[] = [new ${Names.customActions(language)}()];
                // add your custom validations here
                customValidations: ${workerName}[] = [];
            }
            
            export const projectitConfiguration = new ${configurationName}();
        `;
    }
}
