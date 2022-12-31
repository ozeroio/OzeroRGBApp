import {Device} from './device.class';
import {SemVer} from "./semver.class";

describe('Device', () => {
	let semver: SemVer;

	beforeEach(async () => {
		semver = new SemVer(3, 1, 4, 4);
	});

	it('checkSupportedVersion', () => {
		expect(semver.isGreaterThan(new SemVer(3, 1, 4, 4))).toBeFalse();
	});
});
