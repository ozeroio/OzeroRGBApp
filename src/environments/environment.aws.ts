import {SemVer} from "../app/models/semver.class";

export const environment = {
	production: true,
	minRequiredFirmwareVersion: new SemVer(5),
	mqtt: {
		hostname: 'mqtt.ozero.io',
		port: 3964,
		path: '/mqtt',
		username: 'mosquitto',
		password: ''
	}
};
