const readable_stream = require("readable-stream");
const end_of_stream = require("end-of-stream");
const once = require("once");
const Substream = require("./Substream");
const IGNORE_SUBSTREAM = Symbol('IGNORE_SUBSTREAM');


export class ObjectMultiplex extends readable_stream.Duplex {
    constructor(opts = {}) {
        super(Object.assign(Object.assign({}, opts), { objectMode: true }));
        this._substreams = {};
    }
    createStream(name) {
        // guard stream against destroyed already
        if (this.destroyed) {
            throw new Error(`ObjectMultiplex - parent stream for name "${name}" already destroyed`);
        }
        // guard stream against ended already
        if (this._readableState.ended || this._writableState.ended) {
            throw new Error(`ObjectMultiplex - parent stream for name "${name}" already ended`);
        }
        // validate name
        if (!name) {
            throw new Error('ObjectMultiplex - name must not be empty');
        }
        if (this._substreams[name]) {
            throw new Error(`ObjectMultiplex - Substream for name "${name}" already exists`);
        }
        // create substream
        const substream = new Substream.Substream({ parent: this, name });
        this._substreams[name] = substream;
        // listen for parent stream to end
        anyStreamEnd(this, (_error) => {
            return substream.destroy(_error || undefined);
        });
        return substream;
    }
    // ignore streams (dont display orphaned data warning)
    ignoreStream(name) {
        // validate name
        if (!name) {
            throw new Error('ObjectMultiplex - name must not be empty');
        }
        if (this._substreams[name]) {
            throw new Error(`ObjectMultiplex - Substream for name "${name}" already exists`);
        }
        // set
        this._substreams[name] = IGNORE_SUBSTREAM;
    }
    _read() {
        return undefined;
    }
    _write(chunk, _encoding, callback) {
        const { name, data } = chunk;

        console.log("Chunk Name: ", name, "Chunk Data: ", data);

        if (!name) {
            console.warn(`ObjectMultiplex - malformed chunk without name "${chunk}"`);
            return callback();
        }
        // get corresponding substream
        const substream = this._substreams[name];
        if (!substream) {
            console.warn(`ObjectMultiplex - orphaned data for stream "${name}"`);
            return callback();
        }
        // push data into substream
        if (substream !== IGNORE_SUBSTREAM) {
            substream.push(data);
        }
        return callback();
    }
}

// util
function anyStreamEnd(stream, _cb) {
    const cb = once(_cb);
    end_of_stream(stream, { readable: false }, cb);
    end_of_stream(stream, { writable: false }, cb);
}
//# sourceMappingURL=ObjectMultiplex.js.map