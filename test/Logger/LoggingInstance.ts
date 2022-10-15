import {StringWrapper} from "./StringWrapper";

function printType(value) {
    return `<${value.constructor.name}>`;
}

export class LoggingInstance {
    logger: (string) => void;
    private counter: number = 0;
    private tabs: number = 0;

    constructor() {
        this.logger = console.log;
    }

    log_to_string(): StringWrapper {

        const stringWrapper = new StringWrapper();
        // self.log_with_timestamps = False
        // self.log_stack_traces = False
        this.logger = (t) => stringWrapper.append(t)
        return stringWrapper;
    }

    use_markers(additional_stack: number = 0, code: () => void) {
        code();
    }

    variable(name: string, value: any, showTypes: boolean) {
        // if not self.toggles.variables:
        // return
        let toType = (v, s = "") => ''
        if (showTypes) {
            toType = (value, spacing = " ") => `${spacing}${printType(value)}`
        }

        this.log_line(`variable: ${name}${toType(value, '')}.length = ${value.length}`)
        // with self.indent():
        // for (i, v) in enumerate(value):
        // self.logger(f"{self.get_tabs()}{name}[{i}] = {v}{to_type(v)}\n")
    }

    private log_line(text: string) {
        if (this.counter != 0) {
            this.logger("\n")
        }
        this.counter = 0
        //timestamp = this.get_timestamp() if use_timestamps else ""
        const timestamp = "";
        const output_message = `${timestamp}${this.getTabs()}${text}\n`
        this.logger(output_message)

    }

    private getTabs() {
        return "                                                ".substring(0, 2 * this.tabs);
    }
}
 