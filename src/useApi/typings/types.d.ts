interface ActionCreator<A> {
  (...args: any[]): A
}
interface ActionCreatorsMapObject<A = any> {
  [key: string]: ActionCreator<A>
}
export type ActionUnion<T extends ActionCreatorsMapObject> = ReturnType<
  T[keyof T]
>
