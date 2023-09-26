export interface Env {}

export type StringMap = {
	[key: string]: string;
};

export type URLMetadata = {
	full: string;
	protocol: string;
	hostname: string;
	port: string;
	path: string;
	queryParams: StringMap;
};

export type GeoMetadata = {
	continent?: string;
	region?: string;
	country?: string;
	city?: string;
	timezone?: string;
	postalCode?: string;
	latitude?: string;
	longitude?: string;
};

export type MiscMetadata = {
	clientTrustScore?: string;
	asn?: string;
	asOrganization?: string;
	colo?: string;
};

export type RequestMetadata = {
	method: string;
	ip: string;
	headers: StringMap;
	url: URLMetadata;
	geo: GeoMetadata;
	misc: MiscMetadata;
};
