// Generated by the ProjectIt Language Generator.
import { observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";

import { PiEditor, ProjectionalEditor, CompositeProjection } from "@projectit/core";

import { DemoProjection } from "../DemoProjection";
import { DemoProjectionDefault } from "./DemoProjectionDefault";
import { DemoActions } from "./DemoActions";
import { DemoContext } from "./DemoContext";
import { DemoEditor } from "./DemoEditor";
import { MyToolbarComponent } from "../../toolbars/MyToolbarComponent";

@observer
export class MainProjectionalEditor extends React.Component<any, {}> {
    private privateEditor: DemoEditor;

    constructor(props: any) {
        super(props);
        this.initEditors();
    }

    render() {
        var editor: DemoEditor = this.privateEditor;
        return (
            <div>
                {editor.mytoolbarItems && (editor.mytoolbarItems.length > 0 && <MyToolbarComponent editor={editor} toolbar={editor} />)}
                <div>
                    <ProjectionalEditor editor={editor} />
                </div>
            </div>
        );
    }

    initEditors() {
        const context = new DemoContext();
        const actions = new DemoActions();
        const rootProjection = new CompositeProjection();
        const projectionManual = new DemoProjection();
        const projectionDefault = new DemoProjectionDefault();
        rootProjection.addProjection("manual", projectionManual);
        rootProjection.addProjection("default", projectionDefault);
        this.privateEditor = new DemoEditor(context, rootProjection, actions);
        projectionDefault.setEditor(this.privateEditor);
    }
}
