import type { makeEventBus } from "../core/make-event-bus";

export type EventBus = ReturnType<typeof makeEventBus>;
