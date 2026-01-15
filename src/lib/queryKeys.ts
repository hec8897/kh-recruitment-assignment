export const QUERY_KEYS = {
  tasks: ["tasks"] as const,
  task: (id: number) => ["task", id] as const,
  dashboard: ["dashboard"] as const,
  user: ["user"] as const,
};
