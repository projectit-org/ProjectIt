// Generated by the ProjectIt Language Generator.
import { PiProjection, PiActions } from "@projectit/core";
import { CustomDemoActions, CustomDemoProjection } from "../editor";
import { DemoCheckerInterface } from "../validator/gen";
import { CustomValidation } from "../validator/CustomValidation";

/**
 * Class ProjectitConfiguration is TODO add comment
 */
class ProjectitConfiguration {
    customProjection: PiProjection[] = [new CustomDemoProjection("manual")];
    customActions: PiActions[] = [new CustomDemoActions()];
    customValidations: DemoCheckerInterface[] = [new CustomValidation()];
}

export const projectitConfiguration = new ProjectitConfiguration();
