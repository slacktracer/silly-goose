import { type EventBus, makeEventBus } from "./make-event-bus.js";

let mainEventBus: EventBus;

export const getMainEventBus = () =>
  mainEventBus !== undefined
    ? mainEventBus
    : makeEventBus({ description: "main-event-bus" });
