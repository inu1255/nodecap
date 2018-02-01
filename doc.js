class Doc {
    constructor(obj) {
        this.types = {};
        this.num = 1;
        this.main = this.read(obj);
    }
    read(data) {
        if (data == null) {
            return "";
        }
        if (data instanceof Array) {
            return `Array<${this.read(data[0])}>`;
        }
        if (data instanceof Buffer) {
            return data.constructor.name;
        }
        if (typeof data === "object") {
            var name = data.constructor ? data.constructor.name : "Object";
            if (name == "Object") {
                name = "Type" + this.num++;
            }
            if (!this.types[name]) {
                var typedef = `/**\n * @typedef {Object} ${name}\n`;
                for (let k in data) {
                    let v = data[k];
                    typedef += ` * @property {${this.read(v)}} ${k}\n`;
                }
                typedef += ` */\n`;
                this.types[name] = typedef;
            }
            return name;
        }
        return data.constructor.name;
    }
    toString() {
        var s = "";
        for (let k in this.types) {
            if (k == this.main) continue;
            s += this.types[k];
        }
        s += this.types[this.main];
        return s;
    }
}

exports.Doc = Doc;
exports.doc = function(obj) {
    console.log(new Doc(obj).toString());
};