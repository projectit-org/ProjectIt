import { PiElement } from "../../language/PiModel";
import { BehaviorExecutionResult, PiCaret } from "../../util/BehaviorUtils";
import { PiKey } from "../../util/Keys";
import { initializeObject } from "../../util/PiUtils";
import { PiEditor } from "../PiEditor";
import { Box } from "./Box";
import { ChoiceTextHelper } from "./ChoiceTextHelper";
import { SelectOption } from "./SelectOption";
import { TextBox } from "./TextBox";

export abstract class AbstractChoiceBox extends Box {
    kind = "AbstractChoiceBox";
    placeholder: string;
    caretPosition: number = -1;
    textBox: TextBox;
    textHelper: ChoiceTextHelper;
    getSelectedOption(): SelectOption | null { return null; };
    getOptions(editor: PiEditor): SelectOption[] { return [] };
    async selectOption(editor: PiEditor, option: SelectOption): Promise<BehaviorExecutionResult> {
        return BehaviorExecutionResult.NULL;
    };

    setCaret: (caret: PiCaret) => void = () => {
        /* To be overwritten by `TextComponent` */
    };

    /** @internal
     * This function is called after the text changes in the browser.
     * It ensures that the SelectableComponent will calculate the new coordinates.
     */
    update: () => void = () => {
        /* To be overwritten by `AliasComponent` */
    };

    /** @internal
     * Simulate a KeyBoard event
     */
    triggerKeyPressEvent: (key: string) => void = () => {
        /* To be overwritten by `AbstractChoiceComponent` */
    };

    /** @internal
     * Simulate a KeyBoard event
     */
    triggerKeyDownEvent: (key: PiKey) => void = () => {
        /* To be overwritten by `AbstractChoiceComponent` */
    };

    public deleteWhenEmpty1(): boolean {
        return false;
    }

    constructor(exp: PiElement, role: string, placeHolder: string, initializer?: Partial<AbstractChoiceBox>) {
        super(exp, role);
        this.placeholder = placeHolder;
        this.textHelper = new ChoiceTextHelper();
        initializeObject(this, initializer);
        this.textBox = new TextBox(
            exp,
            "role" + "-textbox",
            () => {
                /* To be overwritten by `SelectComponent` */
                return this.textHelper.text;
            },
            (value: string) => {
                /* To be overwritten by `SelectComponent` */
                this.textHelper.text = value;
            },
            {
                parent: this,
                selectable: false,
                placeHolder: placeHolder
            }
        );
    }

    isEditable(): boolean {
        return true;
    }
}
