/** Lifecycle states a curation-queue entry can occupy. */
export enum CurationStatus {
  /** Awaiting a curator decision. */
  PENDING = "pending",
  /** Resolved to a target concept. */
  MAPPED = "mapped",
  /** Marked un-mappable. */
  REJECTED = "rejected",
}

/** Authorization role granted to an API consumer. */
export enum ConsumerRole {
  /** Standard read access. */
  USER = "user",
  /** Elevated access to admin + curation endpoints. */
  ADMIN = "admin",
}

/** Lifecycle status of a vocabulary release. */
export enum VocabularyReleaseStatus {
  /** Imported, not yet reviewed. */
  STAGING = "staging",
  /** Reviewed and approved, not yet live. */
  APPROVED = "approved",
  /** Live and served to consumers. */
  PRODUCTION = "production",
  /** Superseded by a newer release. */
  ARCHIVED = "archived",
}

/** One unmapped-concept queue row, as returned by `GET /admin/curation/unmapped`. */
export interface UnmappedConcept {
  id: number;
  sourceValue: string;
  sourceSystem: string;
  displayText: string | null;
  frequency: number | null;
  firstSeenAt: string;
  lastSeenAt: string;
  status: CurationStatus;
  mappedToId: number | null;
  curatedBy: string | null;
  curatedAt: string | null;
}

/** Paginated curation-queue response from `GET /admin/curation/unmapped`. */
export interface UnmappedPage {
  total: number;
  items: UnmappedConcept[];
}
