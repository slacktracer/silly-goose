export const makeEventBus = ({ description }: { description: string }) => {
  const eventBus = document.appendChild(document.createComment(description));

  const emit = (type: string, detail?: unknown) => {
    eventBus.dispatchEvent(new CustomEvent(type, { detail }));
  };

  const off = (type: string, listener: (event: CustomEvent) => void) =>
    eventBus.removeEventListener(type, listener as EventListener);

  const on = (type: string, listener: (event: CustomEvent) => void) => {
    eventBus.addEventListener(type, listener as EventListener);
  };

  const once = (type: string, listener: (event: CustomEvent) => void) =>
    eventBus.addEventListener(type, listener as EventListener, {
      once: true,
    });

  return {
    emit,
    off,
    on,
    once,
  };
};

// todo
// Compare with https://cameronnokes.com/blog/build-your-own-event-emitter-using-only-native-dom-apis/
// sync or async?

export type EventBus = ReturnType<typeof makeEventBus>;
