import {RandomAccess} from "./randomAccess.interface";

export class SemVer {

	static version0: number = 0;

	constructor(major?: number, minor?: number, patch?: number, build?: number) {
		this._major = major || 0;
		this._minor = minor || 0;
		this._patch = patch || 0;
		this._build = build || 0;
	}

	private _major: number;

	get major(): number {
		return this._major;
	}

	set major(value: number) {
		this._major = value;
	}

	private _minor: number;

	get minor(): number {
		return this._minor;
	}

	set minor(value: number) {
		this._minor = value;
	}

	private _patch: number;

	get patch(): number {
		return this._patch;
	}

	set patch(value: number) {
		this._patch = value;
	}

	private _build: number;

	get build(): number {
		return this._build;
	}

	set build(value: number) {
		this._build = value;
	}

	static createFromDeserialization(randomAccess: RandomAccess): SemVer {
		const version = new SemVer();
		version.deserialize(randomAccess);
		return version;
	}

	static serialize(randomAccess: RandomAccess) {
		randomAccess.writeUnsignedInt(SemVer.version0);
	}

	static deserialize(randomAccess: RandomAccess) {
		randomAccess.readUnsignedInt();
	}

	isGreaterThan(other: SemVer): boolean {
		if (this.major > other.major) {
			return true;
		}
		if (this.minor > other.minor) {
			return true;
		}
		if (this.patch > other.patch) {
			return true;
		}
		return this.build > other.build;
	}

	serialize(randomAccess: RandomAccess): void {
		randomAccess.writeUnsignedChar(this.major);
		randomAccess.writeUnsignedChar(this.minor);
		randomAccess.writeUnsignedChar(this.patch);
		randomAccess.writeUnsignedChar(this.build);
	}

	deserialize(randomAccess: RandomAccess): void {
		this.major = randomAccess.readUnsignedChar();
		this.minor = randomAccess.readUnsignedChar();
		this.patch = randomAccess.readUnsignedChar();
		this.build = randomAccess.readUnsignedChar();
	}

	toString(): string {
		return `v${this.major}.${this.minor}.${this.patch}`
	}
}
