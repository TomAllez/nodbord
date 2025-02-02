export interface InputOutput<T> {
    name: string
    value: T
    port: string
}

export interface NodeInterface<T> {
    id: string
    type: string
    inputs: InputOutput<T>[]
    outputs: InputOutput<T>[]
    logic: (
        inputs: InputOutput<T>[]
    ) => Promise<InputOutput<T>[]> | InputOutput<T>[]
}
