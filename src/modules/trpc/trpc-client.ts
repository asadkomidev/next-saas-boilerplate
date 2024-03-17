import { AppRouter } from "@/modules/trpc";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { absoluteUrl } from "@/lib/absolute-url";

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: absoluteUrl("/api/trpc"),
    }),
  ],
});
