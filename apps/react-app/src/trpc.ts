import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type {AppRouter} from 'example-api'

export const trcp = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
          url: 'http://localhost:3001',
        }),
      ]
});
