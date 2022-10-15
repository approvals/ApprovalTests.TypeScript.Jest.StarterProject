import {StringWrapper} from "./StringWrapper";
import {isArray} from "util";

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
        const re = /at ([^(]+) \(/g;
        const stack = `${new Error().stack}`;
        const lines = stack.split("\n");
        const line = lines[3]
        const test = "    at logVariables (/Users/llewellynfalco/Github/ApprovalTests.TypeScript.Jest.StarterProject/test/Logger/test.ts:6:18)"
        const aRegexResult = re.exec(line)?? [];
        const name = aRegexResult[1] || aRegexResult[2];

        this.log_line(`=> ${name}`)
        this.tabs += 1;
        code();
        this.tabs -= 1;
        this.log_line(`<= ${name}`)
    }

    variable(name: string, value: any, showTypes: boolean) {
        // if not self.toggles.variables:
        // return
        let toType = (v, s = "") => ''
        if (showTypes) {
            toType = (value, spacing = " ") => `${spacing}${printType(value)}`
        }

        if (Array.isArray(value)) {
            this.log_line(`variable: ${name}${toType(value, '')}.length = ${value.length}`)
            this.tabs += 1;
            value.forEach((v, i) => {
                this.logger(`${this.getTabs()}${name}[${i}] = ${v}${toType(v)}\n`);
            });
            this.tabs -= 1;
        }
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
 