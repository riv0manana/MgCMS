'use client'

import { 
    QueryClientProvider,
    QueryClient,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactNode } from 'react';

let queryClient = new QueryClient();

const getClient = () => {
    if (!queryClient) {
        queryClient = new QueryClient();
    }
    return queryClient;
}

type BrowserQueryProps = {
    children: ReactNode;
}

export const BrowserQuery = ({
    children
}: BrowserQueryProps) => (
    <QueryClientProvider client={getClient()}>
        {process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
        {children}
    </QueryClientProvider>
)
