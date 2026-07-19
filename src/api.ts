import type { Concept, ConceptAncestor, ConceptMapping } from "./concept.ts";

/** Response for GET /concepts/:id */
export interface ConceptResponse {
  concept: Concept;
  synonyms: string[];
}

/** Response for GET /concepts/:id/ancestors */
export interface AncestryResponse {
  conceptId: number;
  ancestors: Array<
    ConceptAncestor & { concept: Pick<Concept, "conceptId" | "conceptName" | "conceptCode"> }
  >;
}

/** Response for GET /concepts/:id/descendants */
export interface DescendantsResponse {
  conceptId: number;
  descendants: Array<
    ConceptAncestor & { concept: Pick<Concept, "conceptId" | "conceptName" | "conceptCode"> }
  >;
}

/** Response for POST /concepts/translate */
export interface TranslationResponse {
  found: boolean;
  matches: Array<{
    concept: Concept;
    mapping: ConceptMapping;
  }>;
}

/** Health check response. */
export interface HealthResponse {
  status: "ok" | "starting" | "degraded";
  version: string;
  vocabularies: Record<string, { version: string; conceptCount: number }>;
  uptime: number;
}
