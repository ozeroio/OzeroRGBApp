import {Buffer} from "buffer";

export class RandomAccess {

    private readonly buffer: Buffer;
    private pos: number;

    constructor(private size: number) {
        this.buffer = new Buffer(size);
        this.pos = 0;
    }

    static createFrom(buff: Uint8Array): RandomAccess {
        const randomAccess = new RandomAccess(buff.length);
        buff.forEach((b: number) => {
            randomAccess.writeUnsignedChar(b);
        })
        randomAccess.reset();
        return randomAccess;
    }

    reset() {
        this.seek(0);
    }

    seek(pos: number) {
        if (pos < this.buffer.length) {
            this.pos = pos;
        }
    }

    readUnsignedChar(): number {
        this.ensureSpace(1);
        const value = this.buffer.readUint8(this.pos);
        this.pos += 1;
        return value;
    }

    writeUnsignedChar(value: number): void {
        this.ensureSpace(1);
        this.buffer.writeUint8(value, this.pos);
        this.pos += 1;
    }

    readChar(): number {
        this.ensureSpace(1);
        const value = this.buffer.readInt8(this.pos);
        this.pos += 1;
        return value;
    }

    writeChar(value: number): void {
        this.ensureSpace(1);
        this.buffer.writeInt8(value, this.pos);
        this.pos += 1;
    }

    readUnsignedInt(): number {
        this.ensureSpace(4);
        const value = this.buffer.readUint32LE(this.pos);
        this.pos += 4;
        return value;
    }

    writeUnsignedInt(value: number): void {
        this.ensureSpace(4);
        this.buffer.writeUint32LE(value, this.pos);
        this.pos += 4;
    }

    readUnsignedShort(): number {
        this.ensureSpace(2);
        const value = this.buffer.readUint16LE(this.pos);
        this.pos += 2;
        return value;
    }

    writeUnsignedShort(value: number): void {
        this.ensureSpace(2);
        this.buffer.writeUint16LE(value, this.pos);
        this.pos += 2;
    }

    readShort(): number {
        this.ensureSpace(2);
        const value = this.buffer.readInt16LE(this.pos);
        this.pos += 2;
        return value;
    }

    writeShort(value: number): void {
        this.ensureSpace(2);
        this.buffer.writeInt16LE(value, this.pos);
        this.pos += 2;
    }

    readInt(): number {
        this.ensureSpace(4);
        const value = this.buffer.readInt32LE(this.pos);
        this.pos += 4;
        return value;
    }

    writeInt(value: number): void {
        this.ensureSpace(4);
        this.buffer.writeInt32LE(value, this.pos);
        this.pos += 4;
    }

    readLong(): number {
        this.ensureSpace(4);
        const value = this.buffer.readFloatLE(this.pos);
        this.pos += 4;
        return value;
    }

    writeLong(value: number): void {
        this.ensureSpace(4);
        this.buffer.writeFloatLE(value, this.pos);
        this.pos += 4;
    }

    getBuffer(): Buffer {
        return this.buffer;
    }

    private ensureSpace(size: number): void {
        if (this.pos + size > this.buffer.length) {
            throw new Error('Buffer overflow.');
        }
    }
}
