import {SemVer} from "../app/models/semver.class";

export const environment = {
	production: false,
	minRequiredFirmwareVersion: new SemVer(4),
	mqtt: {
		hostname: '10.0.0.9',
		port: 9001,
		path: '/mqtt'
	}
};
