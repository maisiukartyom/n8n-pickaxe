// File: UserDescription.ts
import { INodeProperties } from 'n8n-workflow';

/**
 * Defines the "Operation" dropdown. When the resource is set to 'user', this parameter will be shown.
 * Each option in this dropdown represents a specific API endpoint and contains the routing information
 * needed to make the request.
 */
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
				name: 'Get',
				value: 'get',
				description: 'Get a single user by their email',
				action: 'Get a user',
				// Defines the API call for this operation
				routing: {
					request: {
						method: 'GET',
						// The '={{...}}' syntax embeds the userEmail parameter directly into the URL path.
						// Note: The '/=' at the start ensures the base URL is not prepended twice.
						url: '=/studio/user/{{$parameter.userEmail}}',
					},
				},
			},
			{
				name: 'List',
				value: 'list',
				description: 'Get a list of users',
				action: 'List users',
				// Defines the API call for this operation
				routing: {
					request: {
						method: 'GET',
						url: '/studio/user/list', // Endpoint for listing users
						// `qs` stands for Query String. These are automatically added to the URL.
						// e.g., /users?skip=0&take=50
						qs: {
							skip: '={{$parameter.skip}}',
							take: '={{$parameter.take}}',
						},
					},
				},
			},
		],
		default: 'get',
	},
];

// Define the fields to show when the 'Get' operation is selected.
const getUserFields: INodeProperties[] = [
	{
		displayName: 'User Email',
		name: 'userEmail',
		type: 'string',
		default: '',
		required: true,
		// Show this field only when resource is 'user' AND operation is 'get'.
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['get'],
			},
		},
		description: 'The email of the user to retrieve',
		placeholder: 'user@example.com',
	},
];

// Define the fields to show when the 'List' operation is selected.
const listUsersFields: INodeProperties[] = [
	{
		displayName: 'Skip',
		name: 'skip',
		type: 'number',
		default: 0,
		// Show this field only when resource is 'user' AND operation is 'list'.
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['list'],
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
				resource: ['user'],
				operation: ['list'],
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