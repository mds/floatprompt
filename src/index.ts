// FloatPrompt Core - Database schema and scanner for Claude Code plugin
// Draft/future code lives in src/draft/

// Database schema (tables, types, DDL)
export * from "./db/schema.js";

// Scanner (Layer 1 mechanical)
export * from "./db/scan.js";

// Database client (connection wrapper)
export * from "./db/client.js";
