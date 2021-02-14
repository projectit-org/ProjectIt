// Generated by the ProjectIt Language Generator.
import {
    PiProjection,
    PiElement,
    Box,
    HorizontalListBox,
    LabelBox,
    TextBox,
    VerticalListBox,
    AliasBox, SelectOption, SelectBox
} from "@projectit/core";
import { EntityEnvironment } from "../environment/gen/EntityEnvironment";
import { AttributeType } from "../language/gen/AttributeType";
import { AttributeWithLimitedType } from "../language/gen/AttributeWithLimitedType";
import { Entity } from "../language/gen/Entity";
import { EntityModelUnit } from "../language/gen/EntityModelUnit";
import { PiElementReference } from "../language/gen/PiElementReference";

import { projectitStyles } from "./styles/styles";
/**
 * Class CustomEntityProjection provides an entry point for the language engineer to
 * define custom build additions to the editor.
 * These custom build additions are merged with the default and definition-based editor parts
 * in a three-way manner. For each modelelement,
 * (1) if a custom build creator/behavior is present, this is used,
 * (2) if a creator/behavior based on the editor definition is present, this is used,
 * (3) if neither (1) nor (2) yields a result, the default is used.
 */

export class CustomEntityProjection implements PiProjection {
    rootProjection: PiProjection;
    name: string = "manual";

    constructor(name?: string) {
        if (!!name) {
            this.name = name;
        }
    }

    // tag::getBox[]
    getBox(element: PiElement): Box {
        // Add any handmade projections of your own before next statement
        return null;
    }
    // end::getBox[]

    // Most simple model box
    // tag::ModelBox1[]
    private createModelBox(model: EntityModelUnit): Box {
        return new HorizontalListBox(model, "model", [
            new LabelBox(model, "model-label", "Model"),
            new TextBox(model, "model-name", () => model.name, (c: string) => (model.name = c))
        ]);
    }
    // end::ModelBox1[]

    // Modelbox with style added
    // tag::ModelBox2[]
    private createModelBox2(model: EntityModelUnit): Box {
        return new HorizontalListBox(model, "model", [
            new LabelBox(model, "model-label", "Model", {
                style: projectitStyles.keyword
            }),
            new TextBox(model, "model-name", () => model.name, (c: string) => (model.name = c), {
                placeHolder: "<name>"
            })
        ]);
    }
    // end::ModelBox2[]

    // ModelBox with placeholder for the name and a list of entities
    // tag::ModelBox3[]
    private createModelBox3(model: EntityModelUnit): Box {
        return new VerticalListBox(model, "model", [
            new HorizontalListBox(model, "model-info", [
                new LabelBox(model, "model-keyword", "Model", {
                    style: projectitStyles.keyword
                }),
                new TextBox(model, "model-name", () => model.name, (c: string) => (model.name = c), {
                    placeHolder: "<name>"
                })
            ]),
            new LabelBox(model, "entity-keyword", "Entities", {
                style: projectitStyles.keyword
            }),
            new VerticalListBox(
                model,
                "entity-list",
                model.entities.map(ent => {
                    return this.rootProjection.getBox(ent);
                })
            )
        ]);
    }
    // end::ModelBox3[]

    private createEntityBox1(entity: Entity): Box {
        // tag::EntityBox1[]
        return new VerticalListBox(entity, "entity", [
            new HorizontalListBox(entity, "entity-keyword", [
                new LabelBox(entity, "entity-label", "entity", {
                    style: projectitStyles.keyword
                }),
                new TextBox(entity, "entity-name", () => entity.name, (c: string) => (entity.name = c))
            ]),
            new VerticalListBox(
                entity,
                "attributes",
                entity.attributes.map(att => {
                    return this.rootProjection.getBox(att);
                })
            )
        ]);
        // end::EntityBox1[]
    }

    // EntityBox with attributes, but no AliasBox
    // tag::EntityBox[]
    private createEntityBox(entity: Entity): Box {
        return new VerticalListBox(entity,"entity",
            [
                new HorizontalListBox(entity, "entity-info", [
                    new LabelBox(entity, "entity-keyword", "Entity", {
                        style: projectitStyles.keyword
                    }),
                    new TextBox(entity, "entity-name",
                        () => entity.name,
                        (c: string) => (entity.name = c),
                        { placeHolder: "<name>" })
                ]),
                new VerticalListBox( entity, "attribute-list",
                    entity.attributes.map(att => {
                        return this.rootProjection.getBox(att);
                    })
                )
            ]
        );
    }
    // end::EntityBox[]

    // EntityBox with AliasBox added for adding new attributes
    private createEntityBox3(entity: Entity): Box {
        return new VerticalListBox(
            entity,
            "entity",
            [
                new HorizontalListBox(entity, "entity-keyword", [
                    new LabelBox(entity, "entity-label", "entity", {
                        style: projectitStyles.keyword
                    }),
                    new TextBox(entity, "entity-name", () => entity.name, (c: string) => (entity.name = c))
                ]),
                // tag::CreateAttributeAction[]
                new VerticalListBox(entity,"attributes",
                    entity.attributes.map(att => {
                        return this.getBox(att);
                    })
                ).addChild(new AliasBox(entity, "end-of-attribute-list",
                    "add attribute"))
                // end::CreateAttributeAction[]
            ]
        );
    }


    // private createAttributeBox(att: AttributeWithLimitedType): Box {
    //     return new HorizontalListBox(
    //         att,
    //         "attribute",
    //         [
    //             new TextBox(att,"attribute-name",
    //                 () => { return att.name; },
    //                 (v: string) => { att.name = v; }
    //             ),
    //             new LabelBox(att, "colon", ":"),
    //             new TextBox(att,"attribute-type",
    //                 () => { return att.type; },
    //                 (v: string) => { att.type = v as AttributeWithLimitedType; }
    //             )
    //         ]
    //     );
    // }

    public getAttributeBox(attribute: AttributeWithLimitedType): Box {
        // tag::AttributeBox[]
        return new HorizontalListBox(
            attribute,
            "Attribute",
            [
                new TextBox(
                    attribute,"Attribute-name",
                    () => attribute.name,
                    (c: string) => (attribute.name = c as string),
                ),
                new LabelBox(attribute, "attribute-label", ": "),
                this.getReferenceBox(
                    attribute,
                    "Attribute-declaredType",
                    "<select declaredType>",
                    "AttributeType",
                    () => {
                        if (!!attribute.declaredType) {
                            return { id: attribute.declaredType.name, label: attribute.declaredType.name };
                        } else {
                            return null;
                        }
                    },
                    (option: SelectOption) => {
                        if (!!option) {
                            attribute.declaredType = PiElementReference.create<AttributeType>(
                                EntityEnvironment.getInstance().scoper.getFromVisibleElements(attribute, option.label, "AttributeType") as AttributeType,
                                "Type"
                            );
                        } else {
                            attribute.declaredType = null;
                        }
                    }
                )
            ]
        );
        // end::AttributeBox[]
    }

    public getReferenceBox(
        element: PiElement,
        role: string,
        placeholder: string,
        metaType: string,
        getAction: () => SelectOption,
        setAction: (o: SelectOption) => void
    ): Box {
        return new SelectBox(
            element,
            role,
            placeholder,
            () => {
                return EntityEnvironment.getInstance()
                    .scoper.getVisibleNames(element, metaType)
                    .map(name => ({
                        id: name,
                        label: name
                    }));
            },
            () => getAction(),
            (option: SelectOption) => setAction(option)
        );
    }


}