type PartialParameters<F extends (...args: any[]) => any> = (
  ...args: Partial<Parameters<F>>
) => ReturnType<F>;


