import {EffectParameterType, Parameter} from "../parameter.class";
import {RandomAccess} from "../randomAccess.interface";
import {ParameterColorSegment} from "./parameter-color-segment.class";

export class ParameterColorSegmentList extends Parameter {

    constructor(name: string, segments: Array<ParameterColorSegment> = []) {
        super(EffectParameterType.COLOR_SEGMENT_LIST, name);
        this._segments = segments;
    }

    private _segments: Array<ParameterColorSegment>;

    get segments(): Array<ParameterColorSegment> {
        return this._segments;
    }

    set segments(value: Array<ParameterColorSegment>) {
        this._segments = value;
    }

    removeSegment(instance: ParameterColorSegment): void {
        const index = this.segments.findIndex(value => value == instance);
        if (index != -1) {
            this.segments.splice(index, 1);
        }
    }

    getSerializationSize(): number {

        // Number of segments (1 byte) + size of each segment
        return 1 + this.segments.reduce((acc: number, current: ParameterColorSegment) => {
            return acc + current.getSerializationSize();
        }, 0);
    }

    deserialize(randomAccess: RandomAccess): void {
        const numSegments = randomAccess.readUnsignedChar();
        this.segments = [];
        for (let i = 0; i < numSegments; i++) {
            const segment = ParameterColorSegment.createFromDeserialize(randomAccess);
            this.segments.push(segment);
        }
    }

    serialize(randomAccess: RandomAccess): void {
        randomAccess.writeUnsignedChar(this.segments.length);
        this.segments.forEach(segment => segment.serialize(randomAccess));
    }
}
