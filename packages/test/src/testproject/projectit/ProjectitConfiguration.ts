// Generated by the ProjectIt Language Generator.
import { PiProjection, PiActions } from "@projectit/core";
import { CustomTestprojectActions, CustomTestprojectProjection } from "../editor";
import { TestprojectCheckerInterface } from "../validator/gen";

/**
 * Class ProjectitConfiguration is TODO add comment
 */
class ProjectitConfiguration {
    // add your custom editor projections here
    customProjection: PiProjection[] = [new CustomTestprojectProjection("manual")];
    // add your custom editor actions here
    customActions: PiActions[] = [new CustomTestprojectActions()];
    // add your custom validations here
    customValidations: TestprojectCheckerInterface[] = [];
}

export const projectitConfiguration = new ProjectitConfiguration();
