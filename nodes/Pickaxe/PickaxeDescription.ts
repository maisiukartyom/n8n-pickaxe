// File: UserDescription.ts
import { INodeProperties } from 'n8n-workflow';


export const pickaxeOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		// Show this operation dropdown only when the 'User' resource is selected.
		displayOptions: {
			show: {
				resource: ['pickaxe'],
			},
		},
		options: [
			{
				name: 'Get User',
				value: 'getUser',
				description: 'Get a single user by their email',
				action: 'Get a user',
				// Defines the API call for this operation
				routing: {
					request: {
						method: 'GET',
						url: '=/studio/user/{{$parameter.userEmail}}',
						qs: {
							studioId: '={{$parameter.studioId}}'
						}
					},
				},
			},
			{
				name: 'List Users',
				value: 'listUsers',
				description: 'Get a list of users',
				action: 'List users',
				// Defines the API call for this operation
				routing: {
					request: {
						method: 'GET',
						url: '/studio/user/list',
						qs: {
							skip: '={{$parameter.skip}}',
							take: '={{$parameter.take}}',
							studioId: '={{$parameter.studioId}}'
						},
					},
				},
			},
		],
		default: 'getUser',
	},
];


const getUserFields: INodeProperties[] = [
	{
		// eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
		displayName: 'Studio',
		name: 'studioId',
		type: 'options', // This tells n8n it's a dropdown
		default: '',
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		displayOptions: {
			show: {
				resource: ['pickaxe'],
				operation: ['getUser'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getStudios',
		},
	},
	{
		displayName: 'User Email',
		name: 'userEmail',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['pickaxe'],
				operation: ['getUser'],
			},
		},
		description: 'The email of the user to retrieve',
		placeholder: 'user@example.com',
	},
];


const listUsersFields: INodeProperties[] = [
	{
		// eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
		displayName: 'Studio',
		name: 'studioId',
		type: 'options', // This tells n8n it's a dropdown
		default: '',
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		displayOptions: {
			show: {
				resource: ['pickaxe'],
				operation: ['listUsers'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getStudios',
		},
	},
	{
		displayName: 'Skip',
		name: 'skip',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['pickaxe'],
				operation: ['listUsers'],
			},
		},
		description: 'The number of records to skip for pagination',
		placeholder: '0',
	},
	{
		displayName: 'Take',
		name: 'take',
		type: 'number',
		default: 50,
		displayOptions: {
			show: {
				resource: ['pickaxe'],
				operation: ['listUsers'],
			},
		},
		description: 'The maximum number of records to return',
		placeholder: '50',
	},
];

/**
 * This final array combines all the fields for all operations.
 * The `displayOptions` on each field will ensure that only the relevant
 * fields are shown to the user based on their selections.
 */
export const pickaxeFields: INodeProperties[] = [
	...getUserFields,
	...listUsersFields,
];