// Generated by the ProjectIt Language Generator.
import { PiProjection, PiActions } from "@projectit/core";
import { CustomDemoActions, CustomDemoProjection } from "../editor";
import { DemoCheckerInterface } from "../validator/gen";

/**
 * Class ProjectitConfiguration is TODO add comment
 */
class ProjectitConfiguration {
    // add your custom editor projections here
    customProjection: PiProjection[] = [new CustomDemoProjection("manual")];
    // add your custom editor actions here
    customActions: PiActions[] = [new CustomDemoActions()];
    // add your custom validations here
    customValidations: DemoCheckerInterface[] = [];
}

export const projectitConfiguration = new ProjectitConfiguration();
