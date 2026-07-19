/** Severity bands used by drug-drug interaction records. */
export type DrugInteractionSeverity =
  | "contraindicated"
  | "major"
  | "moderate"
  | "minor"
  | "unknown";

/** Evidence strength for an interaction or clinical recommendation. */
export type EvidenceGrade = "A" | "B" | "C" | "D" | "expert-opinion" | "unknown";

/** FHIR ConceptMap.equivalence value set. */
export type ConceptMapEquivalence =
  | "equivalent"
  | "equal"
  | "wider"
  | "subsumes"
  | "narrower"
  | "specializes"
  | "inexact"
  | "unmatched"
  | "disjoint";

/** Cross-vocabulary mapping relationship type. */
export type ConceptMappingRelationship = "maps-to" | "is-a" | "has-child" | "see-also" | "synonym";

/** Direct relationship edge between two concepts within a hierarchy. */
export type ConceptRelationshipType = "is_a" | "has_child" | "maps_to" | "causal_gene";
