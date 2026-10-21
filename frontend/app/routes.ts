import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/overview.tsx"),
  route("workspace", "routes/workspace.tsx"),
] satisfies RouteConfig;
