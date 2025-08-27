import { INodeType, INodeTypeDescription, NodeConnectionType  } from 'n8n-workflow';
// Import the operations and fields from your description file
import { pickaxeOperations, pickaxeFields } from './PickaxeDescription';

export class Pickaxe implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Pickaxe',
		name: 'pickaxe', // A more unique name is good practice
		icon: 'file:icon.svg',
		group: ['transform'],
		version: 1,
		// This subtitle dynamically shows the selected operation, like "Get" or "List"
		subtitle: '={{$parameter["operation"]}}',
		description: 'Interact with the Pickaxe APIs',
		defaults: {
			name: 'Pickaxe',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		// Connects the node to the credential you created
		credentials: [
			{
				name: 'pickaxeApiOAuth2Api',
				required: true,
			},
		],
		// Default settings for all requests made by this node
		requestDefaults: {
			baseURL: 'https://core-api.pickaxe.co/v1',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		// The main properties array defines the UI of the node
		properties: [
			// This is the top-level resource selector. For this node, it's always 'User'.
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'hidden', // Set to hidden as there is only one resource
				noDataExpression: true,
				options: [
					{
						name: 'Pickaxe',
						value: 'pickaxe',
					},
				],
				default: 'pickaxe',
			},

			// Use the spread operator to include the imported operations and fields
			...pickaxeOperations,
			...pickaxeFields,
		],
	};
}