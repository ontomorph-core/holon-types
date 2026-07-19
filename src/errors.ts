/** All error codes used across HOLON services. */
export enum ErrorCode {
  // Lookup
  CONCEPT_NOT_FOUND = "CONCEPT_NOT_FOUND",
  VOCABULARY_NOT_FOUND = "VOCABULARY_NOT_FOUND",
  CONSUMER_NOT_FOUND = "CONSUMER_NOT_FOUND",
  INVALID_CONCEPT_CODE = "INVALID_CONCEPT_CODE",
  // Translation
  NO_MAPPING_FOUND = "NO_MAPPING_FOUND",
  AMBIGUOUS_MAPPING = "AMBIGUOUS_MAPPING",
  // Reasoning
  INTERACTION_CHECK_FAILED = "INTERACTION_CHECK_FAILED",
  PHENOTYPE_MATCH_FAILED = "PHENOTYPE_MATCH_FAILED",
  // NLP
  EXTRACTION_FAILED = "EXTRACTION_FAILED",
  NORMALIZATION_FAILED = "NORMALIZATION_FAILED",
  // Infrastructure
  DB_ERROR = "DB_ERROR",
  TX_DEADLOCK = "TX_DEADLOCK",
  TX_SERIALIZATION_FAILURE = "TX_SERIALIZATION_FAILURE",
  TX_TIMEOUT = "TX_TIMEOUT",
  TRIPLE_STORE_ERROR = "TRIPLE_STORE_ERROR",
  CACHE_ERROR = "CACHE_ERROR",
  NLP_SERVICE_UNAVAILABLE = "NLP_SERVICE_UNAVAILABLE",
  LLM_SERVICE_UNAVAILABLE = "LLM_SERVICE_UNAVAILABLE",
  // Auth
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  LICENSE_REQUIRED = "LICENSE_REQUIRED",
  RATE_LIMIT_EXCEEDED = "RATE_LIMIT_EXCEEDED",
  // Input
  VALIDATION_ERROR = "VALIDATION_ERROR",
  INVALID_ECL = "INVALID_ECL",
  INVALID_CQL = "INVALID_CQL",
  // General
  NOT_IMPLEMENTED = "NOT_IMPLEMENTED",
}

/** Base error class for all HOLON errors. */
export class HolonError extends Error {
  constructor(
    message: string,
    public readonly code: ErrorCode,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "HolonError";
  }
}

/** Caller submitted an ECL expression that the simplified parser cannot handle. */
export class InvalidEclError extends HolonError {
  constructor(expression: string) {
    super(
      `Unsupported ECL expression: ${expression}. Supported: < SCTID, << SCTID, > SCTID, >> SCTID, SCTID, *`,
      ErrorCode.INVALID_ECL,
    );
  }
}

/** Caller submitted a CQL expression that the CQL-lite engine cannot handle. */
export class InvalidCqlError extends HolonError {
  constructor(expression: string) {
    super(
      `Unsupported CQL expression: ${expression}. Supported: literals (boolean/integer/decimal/string/null), and/or/not, comparisons (= != < <= > >=), arithmetic (+ - * /), in ValueSet('<ecl|vocab:code,...>'), exists(<list>), AgeInYears(), [Condition: ValueSet(...)], define "Name": <expr> with references`,
      ErrorCode.INVALID_CQL,
    );
  }
}

/** Generic input validation failure. */
export class ValidationError extends HolonError {
  constructor(message: string, details?: unknown) {
    super(message, ErrorCode.VALIDATION_ERROR, details);
  }
}

/**
 * A database transaction rolled back. Carries the transaction id (for log
 * correlation) and a classified infrastructure code (deadlock / serialization /
 * timeout / generic DB error) without leaking raw driver internals.
 */
export class TransactionError extends HolonError {
  constructor(
    message: string,
    code: ErrorCode,
    public readonly txId: string,
  ) {
    super(message, code, { txId });
    this.name = "TransactionError";
  }
}
