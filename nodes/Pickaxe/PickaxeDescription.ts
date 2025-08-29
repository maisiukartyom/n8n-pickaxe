// File: UserDescription.ts
import { INodeProperties } from 'n8n-workflow';


export const pickaxeOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['pickaxe'],
			},
		},
		options: [
			{
				name: 'Call Pickaxe',
				value: 'callPickaxe',
				action: 'Call pickaxe',
				// Defines the API call for this operation
				routing: {
					request: {
						method: 'POST',
						url: '/integrations/api/pickaxes/submit',
						body: {
							formId: '={{$parameter.formId}}',
							message: "={{$parameter.message}}",
							type: "plain",
						},
					},
				},
			},
			{
				name: 'Create User',
				value: 'createUser',
				description: 'Create a new user with the provided details',
				action: 'Create user',
				// Defines the API call for this operation
				routing: {
					request: {
						method: 'POST',
						url: '/studio/user/create',
						body: {
							studioId: '={{$parameter.studioId}}',
							email: "={{$parameter.email}}",
							password: "={{$parameter.password}}",
							name: "={{$parameter.name}}",
							image: "={{$parameter.image}}",
							ipAddress: "={{$parameter.ipAddress}}",
							products: "={{$parameter.products}}",
							isEmailVerified: "={{$parameter.isEmailVerified}}"
						},
					},
				},
			},
			{
				name: 'Delete User',
				value: 'deleteUser',
				description: 'Delete a specific user by their email',
				action: 'Delete user',
				routing: {
					request: {
						method: 'DELETE',
						url: '/studio/user/{{$parameter.email}}',
						body: {
							studioId: '={{$parameter.studioId}}'
						},
					},
				},
			},
			{
				name: 'Get Pickaxe History',
				value: 'getPickaxeHistory',
				description: 'Fetch specific Pickaxe chat history',
				action: 'Get pickaxe history',
				// Defines the API call for this operation
				routing: {
					request: {
						method: 'POST',
						url: '/studio/pickaxe/history',
						body: {
							formId: "={{$parameter.formId}}",
							limit: "={{$parameter.historyLimit}}",
							skip: "={{$parameter.skip}}",
							lastDays: "={{$parameter.lastDays}}"
						}
					},
				},
			},
			{
				name: 'Get User',
				value: 'getUser',
				description: 'Retrieve a specific user by their email',
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
				name: 'Invite Users',
				value: 'inviteUsers',
				description: 'Invite a new user by sending an invitation email',
				action: 'Invite users',
				routing: {
					request: {
						method: 'POST',
						url: '/studio/user/invite',
						body: {
							studioId: '={{$parameter.studioId}}',
							productIds: "={{$parameter.products}}",
							emails: "={{$parameter.emails}}"
						},
					},
				},
			},
			{
				name: 'List Users',
				value: 'listUsers',
				description: 'List all users with optional pagination',
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
		required: true
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
		required: true
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
		default: 10,
		displayOptions: {
			show: {
				resource: ['pickaxe'],
				operation: ['listUsers'],
			},
		},
		description: 'The maximum number of records to return',
		placeholder: '10',
	},
];

const createUserFields: INodeProperties[] = [
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
				operation: ['createUser'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getStudios',
		},
		required: true
	},
	{
		// eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-multi-options
		displayName: 'Product Names',
		name: 'products',
		type: 'multiOptions',
		default: [],
		displayOptions: {
			show: {
				resource: ['pickaxe'],
				operation: ['createUser'],
			},
		},
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		typeOptions: {
			loadOptionsMethod: 'getProducts',
			loadOptionsDependsOn: ["studioId"]
		},
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		default: "",
		displayOptions: {
			show: {
				resource: ['pickaxe'],
				operation: ['createUser'],
			},
		},
		description: 'User email',
		placeholder: 'useremail@gmail.com',
		required: true
	},
	{
		displayName: 'Password',
		name: 'password',
		typeOptions: {
			password: true
		},
		type: 'string',
		default: "",
		displayOptions: {
			show: {
				resource: ['pickaxe'],
				operation: ['createUser'],
			},
		},
		description: 'User password',
	},
	{
		displayName: 'User Name',
		name: 'name',
		type: 'string',
		default: "",
		displayOptions: {
			show: {
				resource: ['pickaxe'],
				operation: ['createUser'],
			},
		},
	},
	{
		displayName: 'Image',
		name: 'image',
		type: 'string',
		default: "",
		displayOptions: {
			show: {
				resource: ['pickaxe'],
				operation: ['createUser'],
			},
		},
		description: "User image URL"
	},
	{
		displayName: 'IP Address',
		name: 'ipAddress',
		type: 'string',
		default: "",
		displayOptions: {
			show: {
				resource: ['pickaxe'],
				operation: ['createUser'],
			},
		},
		description: "User IP Address"
	},
	{
		displayName: 'User Email Verified',
		name: 'isEmailVerified',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['pickaxe'],
				operation: ['createUser'],
			},
		},
	},
];

const inviteUsersFields: INodeProperties[] = [
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
				operation: ['inviteUsers'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getStudios',
		},
		required: true
	},
	{
		// eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-multi-options
		displayName: 'Product Names',
		name: 'products',
		type: 'multiOptions',
		default: [],
		displayOptions: {
			show: {
				resource: ['pickaxe'],
				operation: ['inviteUsers'],
			},
		},
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		typeOptions: {
			loadOptionsMethod: 'getProducts',
			loadOptionsDependsOn: ["studioId"]
		},
	},
	{
		// eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-multi-options
		displayName: 'User Emails',
		name: 'emails',
		type: 'string',
		placeholder: "useremail@gmail.com",
		default: [],
		displayOptions: {
			show: {
				resource: ['pickaxe'],
				operation: ['inviteUsers'],
			},
		},
		typeOptions: {
			multipleValues: true,
		},
		description: 'List of user emails to invite',
		required: true
	},
];

const deleteUserFields: INodeProperties[] = [
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
				operation: ['deleteUser'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getStudios',
		},
		required: true
	},
	{
		displayName: 'User Email',
		name: 'email',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['pickaxe'],
				operation: ['deleteUser'],
			},
		},
		description: 'The email of the user to delete',
		placeholder: 'user@example.com',
	},
];

const callPickaxeFields: INodeProperties[] = [
	{
		// eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
		displayName: 'Pickaxe',
		name: 'formId',
		type: 'options', // This tells n8n it's a dropdown
		default: '',
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		displayOptions: {
			show: {
				resource: ['pickaxe'],
				operation: ['callPickaxe'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getPickaxes',
		},
		required: true
	},
	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['pickaxe'],
				operation: ['callPickaxe'],
			},
		},
		description: 'Question to ask bot',
	},
];

const getPickaxeHistoryFields: INodeProperties[] = [
	{
		// eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
		displayName: 'Pickaxe',
		name: 'formId',
		type: 'options', // This tells n8n it's a dropdown
		default: '',
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		displayOptions: {
			show: {
				resource: ['pickaxe'],
				operation: ['getPickaxeHistory'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getPickaxes',
		},
		required: true
	},
	{
		displayName: 'Limit',
		name: 'historyLimit',
		type: 'number',
		default: 10,
		displayOptions: {
			show: {
				resource: ['pickaxe'],
				operation: ['getPickaxeHistory'],
			},
		},
		description: 'The maximum number of conversations to return',
		placeholder: '10',
	},
	{
		displayName: 'Skip',
		name: 'skip',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['pickaxe'],
				operation: ['getPickaxeHistory'],
			},
		},
		description: 'The number of recent conversations to skip',
		placeholder: '0',
	},
	{
		displayName: 'Last Days',
		name: 'lastDays',
		type: 'number',
		default: undefined,
		displayOptions: {
			show: {
				resource: ['pickaxe'],
				operation: ['getPickaxeHistory'],
			},
		},
		description: 'Latest days conversations',
		placeholder: '0',
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
	...createUserFields,
	...inviteUsersFields,
	...deleteUserFields,
	...callPickaxeFields,
	...getPickaxeHistoryFields
];