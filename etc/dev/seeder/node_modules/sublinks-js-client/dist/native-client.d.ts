export type HTTPVerb = 'GET' | 'POST' | 'PUT' | 'OPTIONS' | 'DELETE' | 'PATCH';
import { HeadersObject } from './types/HeadersObject';
import { HttpClientConstructorOptions } from './types/HttpClientConstructorOptions';
import { StatusResponse } from './types/StatusResponse';
/** Sublinks HTTP client.  Used internally by SublinksClient or can be imported directly */
export declare class SublinksHttp {
    baseURL: string;
    headers: HeadersObject;
    fetchFunction: typeof globalThis.fetch;
    /**
     * SublinksHttp Client: Native API client for Sublinks.
     *
     * @param baseURL is a string in the form of 'https://instance.example.com'
     * @param options is an object used to provide additional options to the constructor.
    */
    constructor(baseURL: string, options?: HttpClientConstructorOptions);
    /** Standard fetch wrapper for native API calls.
     *
     * FormDataType is the type definition for the `form` parameter data
     * ResponseType is the type definition to expect from the response.
     *
     * @param method    HTTP method to use for the call
     * @param endpoint  The relative API endpoint (e.g. /siteinfo -> https://{instance.com}/sublinks-api/v2/siteinfo)
     * @param form      The optional body payload for non-GET requests or key/values for GET query string params
    */
    call<FormDataType extends object, ResponseType>(method: HTTPVerb, endpoint: string, form?: FormDataType): Promise<ResponseType>;
    /** Example method using the `call` wrapper to call the (non-existent) version endpoint */
    apiVersion(): Promise<StatusResponse>;
    /** Convenience method to set the OAuth 2.0 `Authorization: Bearer {token}` header */
    setAuthToken(token: string): void;
    /** Sets an individual header key to the provided value or removes the key from the headers if a value is not provided. */
    setHeader(key: string, value?: string): void;
}
