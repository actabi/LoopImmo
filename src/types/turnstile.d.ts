declare global {
  interface Window {
    turnstile: {
      render: (element: HTMLElement, options: any) => string
      remove: (widgetId: string) => void
      reset: (widgetId: string) => void
    }
  }
}

export {}
