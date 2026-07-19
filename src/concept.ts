import type {
  DomainId,
  MappingEquivalence,
  MappingOrigin,
  StandardConcept,
  VocabularyId,
} from "./vocabulary.ts";
export type { VocabularyId, DomainId, StandardConcept, MappingEquivalence, MappingOrigin };

/** The three-state convention for concept_id columns.
 *
 * - `0`   = confirmed unmapped (no equivalent exists in HOLON)
 * - `>0`  = mapped to a HOLON concept
 * - NULL  = enrichment pending (should not appear after import completes)
 */
export type ConceptId = number;

/** Minimal concept projection — surrogate id, source code, display name. */
export interface ConceptProjection {
  conceptId: number;
  conceptCode: string;
  conceptName: string;
}

/** Concept fields required to index a concept document for search. */
export interface IndexableConcept extends ConceptProjection {
  holonUri: string;
  vocabularyId: string;
  domainId: string;
}

/** Canonical identifier for a concept in the HOLON knowledge graph. */
export interface Concept {
  /** Integer surrogate key — the stable internal identifier. */
  conceptId: ConceptId;
  /** Full URI: 'holon:snomed:22298006'. Globally unique across all vocabularies. */
  holonUri: string;
  vocabularyId: VocabularyId | string;
  conceptCode: string;
  conceptName: string;
  /** Which of the 30 HOLON domains this concept belongs to. */
  domainId: DomainId | string;
  semanticType?: string;
  /** Standard = preferred clinical concept; Classification = hierarchy-only. */
  standardConcept?: StandardConcept;
  /** NULL = active concept. */
  validEndDate?: string;
  replacedById?: ConceptId;
  vocabularyVersion: string;
}

/** Pre-computed transitive closure row (OMOP CONCEPT_ANCESTOR pattern). */
export interface ConceptAncestor {
  ancestorConceptId: ConceptId;
  descendantConceptId: ConceptId;
  /** 0 = self-reference, 1 = direct parent, etc. */
  minLevels: number;
  maxLevels: number;
}

/** Cross-vocabulary mapping between two concepts. */
export interface ConceptMapping {
  id: number;
  sourceConceptId: ConceptId;
  targetConceptId: ConceptId;
  relationshipType: string;
  equivalence: MappingEquivalence;
  confidence?: number;
  origin: MappingOrigin;
}
