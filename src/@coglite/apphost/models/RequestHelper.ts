const MetaPrefixDefaults = {
    metaPrefix: "_"
};

const removeMeta = (value : any, metaPrefix : string = MetaPrefixDefaults.metaPrefix) : any => {
    if(value) {
        const metaKeys = Object.keys(value).filter(key => key.startsWith(metaPrefix));
        metaKeys.forEach(metaKey => {
            delete value[metaKey];
        });
    }
    return value;
};

export { removeMeta, MetaPrefixDefaults }