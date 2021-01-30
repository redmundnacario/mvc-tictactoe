export default class EventClass() {
    constructor () {
        this.listeners = []
    }

    addEventListeners (newListener) {
        this.listeners.push(newListener)
    }

    trigger (params) {
        this.listeners.forEach(listener => {
            listener(params)
        });
    }
}