class CodeSet {
    private map: { [key: string] : string };
    constructor(map: { [key: string] : string }) {
        this.map = map;
    }
    getDesc(code) {
        if (!code) {
            return code;
        }
        return this.map[code.trim()] || code;
    }
}

export { CodeSet as default }
