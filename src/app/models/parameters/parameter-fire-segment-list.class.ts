import {EffectParameterType, Parameter} from "../parameter.class";
import {RandomAccess} from "../randomAccess.interface";
import {ParameterFireSegment} from "./parameter-fire-segment.class";

export class ParameterFireSegmentList extends Parameter {

	constructor(name: string, segments: Array<ParameterFireSegment> = []) {
		super(EffectParameterType.FIRE_SEGMENT_LIST, name);
		this._segments = segments;
	}

	private _segments: Array<ParameterFireSegment>;

	get segments(): Array<ParameterFireSegment> {
		return this._segments;
	}

	set segments(value: Array<ParameterFireSegment>) {
		this._segments = value;
	}

	removeSegment(instance: ParameterFireSegment): void {
		const index = this.segments.findIndex(value => value == instance);
		if (index != -1) {
			this.segments.splice(index, 1);
		}
	}

	getSerializationSize(): number {

		// Number of segments (1 byte) + size of each segment
		return 1 + this.segments.reduce((acc: number, current: ParameterFireSegment) => {
			return acc + current.getSerializationSize();
		}, 0);
	}

	deserialize(randomAccess: RandomAccess): void {
		const numSegments = randomAccess.readUnsignedChar();
		this.segments = [];
		for (let i = 0; i < numSegments; i++) {
			const segment = ParameterFireSegment.createFromDeserialize(randomAccess);
			this.segments.push(segment);
		}
	}

	serialize(randomAccess: RandomAccess): void {
		randomAccess.writeUnsignedChar(this.segments.length);
		this.segments.forEach(segment => segment.serialize(randomAccess));
	}
}
