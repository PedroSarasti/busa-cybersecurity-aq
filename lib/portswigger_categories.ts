/**
 * Categorías de PortSwigger Web Security Academy.
 */
export interface PortswiggerCategory {
  slug: string
  name: string
}

export const portswiggerCategories: PortswiggerCategory[] = [
  { slug: "sql-injection", name: "SQL injection" },
  { slug: "cross-site-scripting", name: "Cross-site scripting" },
  { slug: "csrf", name: "Cross-site request forgery (CSRF)" },
  { slug: "clickjacking", name: "Clickjacking" },
  { slug: "dom-based-vulnerabilities", name: "DOM-based vulnerabilities" },
  { slug: "cors", name: "Cross-origin resource sharing (CORS)" },
  { slug: "xxe", name: "XML external entity (XXE) injection" },
  { slug: "ssrf", name: "Server-side request forgery (SSRF)" },
  { slug: "http-request-smuggling", name: "HTTP request smuggling" },
  { slug: "os-command-injection", name: "OS command injection" },
  { slug: "server-side-template-injection", name: "Server-side template injection" },
  { slug: "path-traversal", name: "Path traversal" },
  { slug: "access-control", name: "Access control vulnerabilities" },
  { slug: "authentication", name: "Authentication" },
  { slug: "websockets", name: "WebSockets" },
  { slug: "web-cache-poisoning", name: "Web cache poisoning" },
  { slug: "insecure-deserialization", name: "Insecure deserialization" },
  { slug: "information-disclosure", name: "Information disclosure" },
  { slug: "business-logic-vulnerabilities", name: "Business logic vulnerabilities" },
  { slug: "http-host-header", name: "HTTP Host header attacks" },
  { slug: "oauth-authentication", name: "OAuth authentication" },
  { slug: "file-upload", name: "File upload vulnerabilities" },
  { slug: "jwt", name: "JWT" },
  { slug: "essential-skills", name: "Essential skills" },
  { slug: "prototype-pollution", name: "Prototype pollution" },
  { slug: "graphql", name: "GraphQL API vulnerabilities" },
  { slug: "race-conditions", name: "Race conditions" },
  { slug: "nosql-injection", name: "NoSQL injection" },
  { slug: "api-testing", name: "API testing" },
  { slug: "web-llm-attacks", name: "Web LLM attacks" },
  { slug: "web-cache-deception", name: "Web cache deception" },
]