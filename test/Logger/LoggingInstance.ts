import {StringWrapper} from "./StringWrapper";


class Toggles {
    public queries: boolean;
    public messages: boolean;
    public variables: boolean;
    public hour_glass: boolean;
    public events: boolean;
    public markers: boolean;
    constructor(show: boolean) {
        this.queries = show;
        this.messages = show;
        this.variables = show;
        this.hour_glass = show;
        this.markers = show;
        this.events = show;
    }
}

function printType(value) {
    return `<${value.constructor.name}>`;
}

function getCallingMethod(additional_stack: number) {
    const re = /at ([^(]+) \(/g;
    const stack = `${new Error().stack}`;
    const lines = stack.split("\n");
    const stackDepth = 2 + additional_stack;
    const line = lines[stackDepth]
    const aRegexResult = re.exec(line) ?? [];
    const name = aRegexResult[1] || aRegexResult[2];
    return name;
}

export class LoggingInstance {
    logger: (string) => void;
    private counter: number = 0;
    private tabs: number = 0;
    private toggles = new Toggles(true);

    constructor() {
        this.logger = console.log;
    }

    log_to_string(): StringWrapper {

        const stringWrapper = new StringWrapper();
        // this.log_with_timestamps = False
        // this.log_stack_traces = False
        this.logger = (t) => stringWrapper.append(t)
        return stringWrapper;
    }

    use_markers(additional_stack: number = 0, code: () => void) {
        if (!this.toggles.markers){
            return;
        }
        const name = getCallingMethod(additional_stack + 1);

        this.log_line(`=> ${name}`)
        this.withTabbing(code)
        this.log_line(`<= ${name}`)
    }

    variable(name: string, value: any, showTypes: boolean) {
        if (!this.toggles.variables){
            return;
        }

        let toType = (v, s = "") => ''
        if (showTypes) {
            toType = (value, spacing = " ") => `${spacing}${printType(value)}`
        }

        if (Array.isArray(value)) {
            this.log_line(`variable: ${name}${toType(value, '')}.length = ${value.length}`)
            this.withTabbing(() => {
                value.forEach((v, i) => {
                    this.logger(`${this.getTabs()}${name}[${i}] = ${v}${toType(v)}\n`);
                });
            });
        } else {
            this.log_line(`variable: ${name} = ${value}${toType(value)}`)

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

    private withTabbing(code: () => void) {

        this.tabs += 1;
        code();
        this.tabs -= 1;
    }

    hour_glass() {
        if (!this.toggles.hour_glass){
            return;
        }

        this.counter += 1;
        if (this.counter == 1) {
            this.logger(`${this.getTabs()}.`);
        } else if (this.counter == 100) {
            this.logger("10\n")
            this.counter = 0
        } else if (this.counter % 10 == 0) {
            const digit = (this.counter / 10)
            this.logger(`${digit}`
            )
        } else {

            this.logger(".")
        }
    }


    show_all(show: boolean) {
        this.toggles = new Toggles(show);
    }

    event(event_name: string) {
        if (!this.toggles.events){
            return;
        }
        this.log_line(`event: ${event_name}`)
    }

    show_queries(show) {
        this.toggles.queries = show
    }
    show_markers(show) {
        this.toggles.markers = show
    }
    show_events(show) {
        this.toggles.events = show
    }
    show_messages(show) {
        this.toggles.messages = show
    }
    show_variables(show) {
        this.toggles.variables = show
    }
    show_hour_glass(show) {
        this.toggles.hour_glass = show
    }

    warning(exception) {

    }

    query(queryText: string) {
        if (!this.toggles.queries){
            return;
        }
        this.log_line(`Sql: ${queryText}`)
    }

    message(messageText: string) {
        if (!this.toggles.messages){
            return;
        }
        this.log_line(`message: ${messageText}`)
    }
}
 