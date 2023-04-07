import {SemVer} from "../app/models/semver.class";

export const environment = {
	production: false,
	minRequiredFirmwareVersion: new SemVer(5),
	mqtt: {
		hostname: '10.0.0.102',
		port: 3964,
		path: '/mqtt',
		username: 'mosquitto',
		password: ''
	}
};
