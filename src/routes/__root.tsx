import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Outlet />
    </QueryClientProvider>
  );
}