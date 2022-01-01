import { createClient } from 'microcms-js-sdk';

export const client = createClient({
    serviceDomain: process.env.NEXT_PUBLIC_apiKey,
    apiKey: process.env.NEXT_PUBLIC_serviceDomain,
});