import { IBinding } from "./IBinding";

interface IBoundProps<T = any, V = any> {
    binding?: IBinding<T, V>;
}

export { IBoundProps }