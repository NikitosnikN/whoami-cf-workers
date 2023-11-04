import { GeoMetadata, MiscMetadata, StringMap, URLMetadata } from './types';
import { CfProperties } from '@cloudflare/workers-types';

export function extractGeoMetadata(request: Request): GeoMetadata | { [key: string]: any } {
	const cf: CfProperties | undefined = request.cf;
	return {
		continent: cf?.continent,
		region: cf?.region,
		regionCode: cf?.regionCode,
		country: cf?.country,
		city: cf?.city,
		timezone: cf?.timezone,
		latitude: cf?.latitude,
		longitude: cf?.longitude,
	};
}

export function extractMiscMetadata(request: Request): MiscMetadata | { [key: string]: any } {
	const cf: CfProperties | undefined = request.cf;
	return {
		clientTrustScore: cf?.clientTrustScore,
		asn: cf?.asn,
		asOrganization: cf?.asOrganization,
		colo: cf?.colo,
	};
}

export function extractHeadersFromRequest(request: Request): StringMap {
	const headers: StringMap = {};
	for (const [key, value] of request.headers.entries()) {
		headers[key] = value;
	}
	return headers;
}

export function extractUrlMedataFromRequest(request: Request): URLMetadata {
	const url: URL = new URL(request.url);
	const queryParams: StringMap = {};
	for (const [key, value] of url.searchParams.entries()) {
		queryParams[key] = value;
	}
	return {
		full: request.url,
		protocol: url.protocol,
		hostname: url.hostname,
		port: url.port,
		path: url.pathname,
		queryParams: queryParams,
	};
}

export function extractIpFromRequest(request: Request): string {
	return request.headers.get('cf-connecting-ip') || request.headers.get('x-real-ip') || '';
}

export function jsonToHtml(object: any): string {
	function generateHtmlRecursive(data: any) {
		let html = '';

		if (typeof data === 'object') {
			if (Array.isArray(data)) {
				html += '<ul>';
				data.forEach((item) => {
					html += '<li>' + generateHtmlRecursive(item) + '</li>';
				});
				html += '</ul>';
			} else {
				html += '<ul>';
				for (let key in data) {
					html += '<li>' + key + ':&emsp;' + generateHtmlRecursive(data[key]) + '</li>';
				}
				html += '</ul>';
			}
		} else {
			html += data;
		}

		return html;
	}

	return '<div>' + generateHtmlRecursive(object) + '</div>';
}
