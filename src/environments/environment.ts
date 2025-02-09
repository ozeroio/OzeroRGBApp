import {SemVer} from "../app/models/semver.class";

export const environment = {
	production: false,
	minRequiredFirmwareVersion: new SemVer(5),
	mqtt: {
		hostname: 'mqtt.ozero.io',
		port: 3964,
		path: '/mqtt',
		username: 'ozero',
		password: ''
	}
};
