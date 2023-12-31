import {
	extractGeoMetadata,
	extractHeadersFromRequest,
	extractMiscMetadata,
	extractUrlMedataFromRequest,
	extractIpFromRequest,
	jsonToHtml,
} from './helpers';
import { Env, RequestMetadata } from './types';

async function asJsonResponse(data: RequestMetadata): Promise<Response> {
	return new Response(JSON.stringify(data), {
		status: 200,
		statusText: 'OK',
		headers: {
			'content-type': 'application/json',
		},
	});
}

async function asHtmlResponse(data: RequestMetadata): Promise<Response> {
	const dataHtml: string = jsonToHtml(data);
	const linkToJsonFormatHtml: string = `<a href="/?format=json">Show As JSON</a>`;

	return new Response(linkToJsonFormatHtml + dataHtml, {
		status: 200,
		statusText: 'OK',
		headers: {
			'content-type': 'text/html',
		},
	});
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const data: RequestMetadata = {
			method: request.method,
			ip: extractIpFromRequest(request),
			url: extractUrlMedataFromRequest(request),
			headers: extractHeadersFromRequest(request),
			geo: extractGeoMetadata(request),
			misc: extractMiscMetadata(request),
		};
		let response: Response;
		const format: string = new URL(request.url).searchParams.get('format') || '';

		switch (format.toLowerCase()) {
			case 'json':
				response = await asJsonResponse(data);
				break;
			case 'html':
				response = await asHtmlResponse(data);
				break;
			default:
				response = await asHtmlResponse(data);
		}
		return response;
	},
};
