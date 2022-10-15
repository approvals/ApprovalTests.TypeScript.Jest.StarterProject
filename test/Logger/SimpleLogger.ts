import {SingleWrapper, ThreadedWrapper, Wrapper} from "./Wrapper";

import {LoggingInstance} from "./LoggingInstance";
import {StringWrapper} from "./StringWrapper";


export class SimpleLogger {


    static _wrapper: Wrapper<LoggingInstance> = new SingleWrapper(new LoggingInstance())

    static register_logger(log_method: (string) => void): void {
        this._wrapper.get().logger = log_method
    }

    static log_to_string(log_separate_threads: boolean = true): StringWrapper {
        //with threading.Lock():
        if (log_separate_threads && this._wrapper instanceof SingleWrapper) (
            this._wrapper = new ThreadedWrapper(() => new LoggingInstance())
        )
        return SimpleLogger._wrapper.get().log_to_string()

    }

    static use_markers(code: () => void): void {
        this._wrapper.get().use_markers(1, code);
    }

    static variable(name: string, value: any, show_types: boolean = false) {
        SimpleLogger._wrapper.get().variable(name, value, show_types = show_types)
    }
/*


    static event(event_name: str)

->
    None:
        SimpleLogger._wrapper.get
().

    event(event_name)

    static show_timestamps(display: bool)

->
    None:
        SimpleLogger._wrapper.get
().
    log_with_timestamps = display

    static query(query_text: str)

->
    None:
        SimpleLogger._wrapper.get
().

    query(query_text)

    static message(message: str)

->
    None:
        SimpleLogger._wrapper.get
().

    message(message)

    static warning(text: str = "", exception: BaseException = None)

->
    None:
        SimpleLogger._wrapper.get
().

    warning(text, exception)

    static show_queries(show: bool):
        SimpleLogger._wrapper.get

().

    show_queries(show)

    static show_all(show: bool):
        SimpleLogger._wrapper.get

().

    show_all(show)

    static show_messages(show: bool):
        SimpleLogger._wrapper.get

().

    show_messages(show)

    static show_variables(show: bool):
        SimpleLogger._wrapper.get

().

    show_variables(show)

    static show_hour_glass(show: bool):
        SimpleLogger._wrapper.get

().

    show_hour_glass(show)

    static show_markers(show: bool):
        SimpleLogger._wrapper.get

().

    show_markers(show)

    static show_events(show: bool):
        SimpleLogger._wrapper.get

().

    show_events(show)

 */
    static hour_glass() {
        this._wrapper.get().hour_glass();

    }
}