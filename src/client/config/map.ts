const mock = (env) => { return import("./mock").then(c => c.configure(env)); }
const defaultConfig = (env) => { return import("./default").then(c => c.configure(env)); }

export {
    mock,
    defaultConfig,
    defaultConfig as default
}

