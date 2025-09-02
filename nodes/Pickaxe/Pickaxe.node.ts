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
			async getDocuments(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
					const studioId = this.getCurrentNodeParameter('studioId') as string;
					const returnData: INodePropertyOptions[] = [];

					const {documents} = await this.helpers.requestWithAuthentication.call(
						this,
						'pickaxeApiOAuth2Api',
						{
							method: 'GET',
							url: 'https://api.pickaxe.co/v1/integrations/api/documents/list',
							json: true,
							qs: studioId ? {
								studioId
							} : {}
						},
					);

					for (const document of documents){
						const documentName = document.name
						const documentId = document.documentId
						returnData.push({
							name: documentName,
							value: documentId
						})
					}

					return returnData
				},
			async getPickaxes(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
					const studioId = this.getCurrentNodeParameter('studioId') as string;
					const returnData: INodePropertyOptions[] = [];

					const {pickaxes} = await this.helpers.requestWithAuthentication.call(
						this,
						'pickaxeApiOAuth2Api',
						{
							method: 'GET',
							url: 'https://api.pickaxe.co/v1/integrations/api/pickaxes/list',
							json: true,
							qs: studioId ? {
								studioId
							} : {}
						},
					);

					for (const pickaxe of pickaxes){
						const pickaxeName = pickaxe.formtitle
						const pickaxeId = pickaxe.formid
						returnData.push({
							name: pickaxeName,
							value: pickaxeId
						})
					}

					return returnData
				},
			async getProducts(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
					const studioId = this.getCurrentNodeParameter('studioId') as string;
					const returnData: INodePropertyOptions[] = [];

					const {products} = await this.helpers.requestWithAuthentication.call(
						this,
						'pickaxeApiOAuth2Api',
						{
							method: 'GET',
							url: 'https://api.pickaxe.co/v1/integrations/api/products/list',
							json: true,
							qs: studioId ? {
								studioId
							} : {}
						},
					);

					for (const product of products){
						const productName = product.name
						const productId = product.productId
						returnData.push({
							name: productName,
							value: productId
						})
					}

					return returnData
				},
		}
	}
}