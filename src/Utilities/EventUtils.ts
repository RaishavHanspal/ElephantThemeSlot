export class EventUtils {
    public static events: { [key: string]: Array<Function> } = {};
    /** emits the event and execute all the linked callbacks */
    public static emit(name: string, data: any) {
        if (!EventUtils.events[name])
            console.log(`${name} is not subcribed anywhere`);
        else
            EventUtils.events[name].forEach((callback: Function) => {
                callback(data);
            });
    }

    /** subscribe to events - once fired these will be executed */
    public static subscribe(name: string, callback: Function, scope: any): void {
        if (!EventUtils.events[name])
            EventUtils.events[name] = [callback.bind(scope || this)];
        else
            EventUtils.events[name].push(callback.bind(scope || this));
    }

    /** unsubscribe any events that are no longer required */
    public static unsubscribe(name: string, callback: Function, scope: any): void {
        if (EventUtils.events[name])
            EventUtils.events[name].splice(EventUtils.events[name].indexOf(callback.bind(scope || this)), 1);
    }
}
