// Generated by the ProjectIt Language Generator.
import { PiProjection, PiActions } from "@projectit/core";
import { CustomScoperTestActions, CustomScoperTestProjection } from "../editor";
import { ScoperTestCheckerInterface } from "../validator/gen";

/**
 * Class ProjectitConfiguration is TODO add comment
 */
class ProjectitConfiguration {
    // add your custom editor projections here
    customProjection: PiProjection[] = [new CustomScoperTestProjection("manual")];
    // add your custom editor actions here
    customActions: PiActions[] = [new CustomScoperTestActions()];
    // add your custom validations here
    customValidations: ScoperTestCheckerInterface[] = [];
}

export const projectitConfiguration = new ProjectitConfiguration();