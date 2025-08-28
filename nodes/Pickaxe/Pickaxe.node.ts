import { INodeType, INodeTypeDescription, NodeConnectionType, ILoadOptionsFunctions, INodePropertyOptions  } from 'n8n-workflow';
import { pickaxeOperations, pickaxeFields } from './PickaxeDescription';

export class Pickaxe implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Pickaxe',
		name: 'pickaxe', // A more unique name is good practice
		icon: 'file:icon.svg',
		group: ['transform'],
		version: 1,
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
			baseURL: 'https://api.pickaxe.co/v1',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		// The main properties array defines the UI of the node
		properties: [
			// This is the top-level resource selector. For this node, it's always 'Pickaxe'.
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

	methods = {
		loadOptions: {
			async getStudios(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
					const returnData: INodePropertyOptions[] = [];

					const {studios} = await this.helpers.requestWithAuthentication.call(
						this,
						'pickaxeApiOAuth2Api', // The name of the credential to use
						{
							method: 'GET',
							url: 'https://api.pickaxe.co/v1/integrations/api/studios/list', // Your endpoint to get the list
							json: true,
						},
					);

					for (const studio of studios){
						const studioName = studio.name
						const studioId = studio.studioId
						returnData.push({
							name: studioName,
							value: studioId
						})
					}

					return returnData
				},
		}
	}
}