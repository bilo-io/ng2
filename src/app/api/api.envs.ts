export const ENVS = {}

export interface Environment {
	envName: string;
	identitySts: string;
	identityApi: string;
	transitApi: string;
	clientId: string;
	clientSecret: string;
	scope: string;
}

let tapiClientId: string = '3a79ba9b-a589-4d6e-b201-37bb77a06a60';
let tapiSecret: string = 'fg+b4JlzSr6KlSORAJ9k3n3ZNkFXYChvsiqr8XOE5XA=';
let tapiScope: string = 'transitapi:all';

ENVS['local'] = {
	envName: 'LOCAL',
	identitySts: 'https://identity.whereismytransport.com',
	identityApi: 'https://identityapi-prod-webapp.azurewebsites.net/api',
	transitApi: 'http://localhost:26047/api',
	clientId: tapiClientId,
	clientSecret: tapiSecret,
	scope: tapiScope
};

ENVS['prod'] = {
	envName: 'PROD',
	identitySts: 'https://identity.whereismytransport.com',
	identityApi: 'https://identityapi-prod-webapp.azurewebsites.net/api',
	transitApi: 'https://transit.whereismytransport.com/api',
	clientId: tapiClientId,
	clientSecret: tapiSecret,
	scope: 'transitapi:all'
};

ENVS['test'] = {
	envName: 'TEST',
	identitySts: 'https://identity.whereismytransport.com',
	identityApi: 'https://identityapi-prod-webapp.azurewebsites.net/api',
	transitApi: 'https://transitapi-test-webapp.azurewebsites.net/api',
	clientId: tapiClientId,
	clientSecret: tapiSecret,
	scope: tapiScope
};

ENVS['dev'] = {
	envName: 'DEV',
	identitySts: 'https://identity.whereismytransport.com',
	identityApi: 'https://identityapi-prod-webapp.azurewebsites.net/api',
	transitApi: 'https://transitapi-dev-webapp.azurewebsites.net/api',
	clientId: tapiClientId,
	clientSecret: tapiSecret,
	scope: tapiScope
};

const defaultEnv = 'prod';
const hostname = window.location.hostname;
if (!localStorage.getItem('wingman_api_env')) {
	localStorage.setItem('wingman_api_env', defaultEnv);
}
const env = localStorage.getItem('wingman_api_env') || defaultEnv;

export var environments = ENVS;
export var settings = ENVS[env];

function setEnv(env:string)    {
	console.log('SwitchingEnvs:', env);
	settings = ENVS[env.toLowerCase()];	
};
