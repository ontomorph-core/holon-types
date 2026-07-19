/** Canonical vocabulary identifiers — primary keys of the `vocabularies` table. */
export enum VocabularyId {
  FMA = "FMA",
  SNOMED_CT = "SNOMED-CT",
  LOINC = "LOINC",
  RXNORM = "RxNorm",
  GO = "GO",
  HPO = "HPO",
  HGNC = "HGNC",
  CLINVAR = "ClinVar",
  DRUGBANK = "DrugBank",
  ORPHANET = "Orphanet",
  OMIM = "OMIM",
  ICD11 = "ICD11",
  /** Emotion Ontology (OBO: MFOEM) — Tier 2 mental & behavioral health. */
  MFOEM = "MFOEM",
  /** Medical Action Ontology (OBO: MAxO) — Tier 2 aging/palliative actions. */
  MAXO = "MAxO",
  /** Environment Ontology (OBO: ENVO) — Tier 2 environmental & occupational health. */
  ENVO = "ENVO",
  /** Exposure Ontology (OBO: ExO) — Tier 2 environmental & occupational exposures. */
  EXO = "ExO",
  /** Food Ontology (OBO: FOODON) — Tier 4 nutrition & lifestyle. */
  FOODON = "FOODON",
  /** Symptom Ontology (OBO: SYMP) — patient-reported symptoms / clinical findings. */
  SYMP = "SYMP",
  /** Sequence Ontology (OBO: SO) — genomic variant + feature types. */
  SO = "SO",
  /** Units of Measurement Ontology (OBO: UO) — measurement units. */
  UO = "UO",
  /** HCPCS Level II (CMS) — procedure/supply billing codes; free alternative to CPT. */
  HCPCS = "HCPCS",
  /** Mondo Disease Ontology (OBO: MONDO) — unified cross-reference disease terminology. */
  MONDO = "MONDO",
  /** Human Disease Ontology (OBO: DOID) — disease classification. */
  DOID = "DOID",
}

/**
 * HOLON knowledge-graph domains.
 *
 * The full set spans 30 domains aligned with OMOP CDM; only those in active use
 * are enumerated here — add new domains as adapters are introduced.
 */
export enum DomainId {
  ANATOMY = "anatomy",
  CONDITION = "condition",
  DRUG = "drug",
  MEASUREMENT = "measurement",
  OBSERVATION = "observation",
  PROCEDURE = "procedure",
  DEVICE = "device",
  SPECIMEN = "specimen",
  GENE = "gene",
  VARIANT = "variant",
  PHENOTYPE = "phenotype",
  BIOLOGICAL_PROCESS = "biological-process",
  MOLECULAR_FUNCTION = "molecular-function",
  CELLULAR_COMPONENT = "cellular-component",
  /** Tier 2 — mental & behavioral health (emotions, affect). */
  MENTAL_BEHAVIORAL = "mental-behavioral",
  /** Tier 2 — aging, palliative & end-of-life medical actions. */
  PALLIATIVE = "palliative",
  /** Tier 2 — environmental & occupational health (exposures, environments). */
  ENVIRONMENTAL = "environmental",
  /** Tier 4 — nutrition & lifestyle (foods, food products). */
  NUTRITION = "nutrition",
}

/** Concept standard-status codes. */
export enum StandardConcept {
  /** Preferred concept — maps directly into HOLON's standard graph. */
  STANDARD = "S",
  /** Classification-only concept — used for hierarchy, not clinical facts. */
  CLASSIFICATION = "C",
}

/** Directionality of a cross-vocabulary concept mapping. */
export enum MappingEquivalence {
  EQUIVALENT = "equivalent",
  WIDER = "wider",
  NARROWER = "narrower",
  INEXACT = "inexact",
}

/** Provenance of a concept mapping record. */
export enum MappingOrigin {
  IMPORTED = "imported",
  CURATOR = "curator",
  AUTOMATED = "automated",
}

// ── holonUri utilities ──

/** Scheme prefix for all HOLON canonical URIs (`holon:<vocab>:<code>`). */
export const HOLON_URI_SCHEME = "holon" as const;

/**
 * Construct a canonical holonUri from a vocabulary and concept code.
 * Format: `holon:<vocab-lowercase>:<code>`.
 */
export function buildHolonUri(vocab: VocabularyId, code: string): string {
  return `${HOLON_URI_SCHEME}:${vocab.toLowerCase()}:${code}`;
}

/** Parsed components of a holonUri string. */
export interface HolonUriParts {
  vocab: string;
  code: string;
}

/**
 * Parse a holonUri string into its vocab and code components.
 * Returns `null` if the string is not a valid holonUri.
 */
export function parseHolonUri(uri: string): HolonUriParts | null {
  if (!uri.startsWith(`${HOLON_URI_SCHEME}:`)) return null;
  const parts = uri.split(":");
  if (parts.length !== 3 || !parts[1] || !parts[2]) return null;
  return { vocab: parts[1], code: parts[2] };
}

// ── RDF / SPARQL MIME types ──

/** Turtle serialisation MIME type — used by Oxigraph load() and Fuseki graph store endpoint. */
export const MIME_TURTLE = "text/turtle" as const;

/** N-Triples MIME type — alternative bulk-load format. */
export const MIME_NTRIPLES = "application/n-triples" as const;
