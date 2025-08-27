import {
	IAuthenticate,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class PickaxeApiOAuth2Api implements ICredentialType {
	name = 'pickaxeApiOAuth2Api';
	extends = ['oAuth2Api'];
	displayName = 'Pickaxe OAuth2 API';
	documentationUrl = 'https://docs.pickaxe.com/integrations/n8n';

	// The `properties` array is now empty because the user does not need to enter anything.
	properties: INodeProperties[] = [
		{
			displayName: 'Grant Type',
			name: 'grantType',
			type: 'hidden',
			default: 'authorizationCode',
		},
		{
			displayName: 'Authorization URL',
			name: 'authUrl',
			type: 'hidden',
			default: 'https://core-api.pickaxe.co/oauth/authorize',
		},
		{
			displayName: 'Access Token URL',
			name: 'accessTokenUrl',
			type: 'hidden',
			default: 'https://core-api.pickaxe.co/oauth/token',
		},
		{
			displayName: 'Auth URI Query Parameters',
			name: 'authQueryParameters',
			type: 'hidden',
			default: '',
		},
		{
			displayName: 'Authentication',
			name: 'authentication',
			type: 'hidden',
			default: 'body',
		},
		{
			displayName: 'Client ID',
			name: 'clientId',
			type: 'hidden',
			default: 'pickaxe-n8n-integration',
		},
		{
			displayName: 'Client Secret',
			name: 'clientSecret',
			type: 'hidden',
			default: 'wjqMFYuPbWVyVQQmsqNnAN9q1ciSvSfS',
		},
		{
			displayName: 'Scope',
			name: 'scope',
			type: 'hidden',
			default: '',
		},
	];

	// This defines the entire OAuth2 flow for n8n
	authenticate: IAuthenticate = {
		type: 'generic',
		
		properties: {
			headers: {
				'Authorization': 'OAuth {{$credentials.authentication.access_token}}',
			}
		}
	};

	// Test method remains the same - it's still a best practice!
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://core-api.pickaxe.co',
			url: '/oauth/whoami',
		},
	};
}