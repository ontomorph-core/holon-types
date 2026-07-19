# @holon/types

Shared TypeScript types, enums, error classes, and result helpers for the
**HOLON clinical-knowledge API**. This is the foundation package: the
[`@holon/client`](https://www.npmjs.com/package/@holon/client) SDK and the HOLON
services all build on the definitions here, so you can import the exact same
vocabulary identifiers, error codes, and entity shapes the API speaks.

Zero runtime dependencies. Pure types plus a handful of tiny helpers and enums.

```bash
npm install @holon/types
# pnpm add @holon/types
# yarn add @holon/types
# bun add @holon/types
```

## What's inside

### Error codes & classes

```ts
import { ErrorCode, HolonError, ValidationError } from "@holon/types";

throw new ValidationError("age must be a positive integer");

// HolonError carries a machine-readable code and optional response detail:
if (err instanceof HolonError && err.code === ErrorCode.CONCEPT_NOT_FOUND) { … }
```

- `ErrorCode` — the enum every HOLON error and error response uses
  (`CONCEPT_NOT_FOUND`, `NO_MAPPING_FOUND`, `INTERACTION_CHECK_FAILED`,
  `UNAUTHORIZED`, `RATE_LIMIT_EXCEEDED`, `VALIDATION_ERROR`, …).
- `HolonError` — base error class (`.code: ErrorCode`, `.details?: unknown`).
- `InvalidEclError`, `InvalidCqlError`, `ValidationError`, `TransactionError` —
  specific subclasses thrown by the query and validation layers.

### `ServiceResult` helpers

A lightweight discriminated-union result type used across the HOLON services,
with `ok()` / `err()` constructors:

```ts
import { ok, err, ErrorCode, type ServiceResult } from "@holon/types";

function lookup(id: number): ServiceResult<Concept> {
  const row = find(id);
  return row ? ok(row) : err("no such concept", ErrorCode.CONCEPT_NOT_FOUND);
}
```

### Vocabulary & domain enums

```ts
import { VocabularyId, DomainId, StandardConcept, MappingEquivalence } from "@holon/types";

VocabularyId.SNOMED_CT; // "SNOMED-CT"
VocabularyId.RXNORM;    // "RxNorm"
VocabularyId.LOINC;     // "LOINC"
```

Covers the supported source vocabularies (`SNOMED-CT`, `RxNorm`, `LOINC`,
`ICD11`, `HPO`, `FMA`, and more), concept `DomainId`s, `StandardConcept` flags,
and mapping `MappingEquivalence` / `MappingOrigin` classifiers.

### HOLON URI helpers

```ts
import { HOLON_URI_SCHEME, type HolonUriParts, MIME_TURTLE } from "@holon/types";
// HOLON_URI_SCHEME === "holon"; parse/emit holon:… concept URIs, serialize as text/turtle
```

### Entity & response shapes

Interfaces mirroring exactly what the API returns, so client code and server
code share one definition:

- **Concepts** — `Concept`, `ConceptProjection`, `IndexableConcept`, `ConceptAncestor`, `ConceptMapping`, `ConceptId`.
- **Clinical** — `DrugInteractionSeverity`, `EvidenceGrade`, `ConceptMapEquivalence`, `ConceptRelationshipType`.
- **API** — `ConceptResponse`, `AncestryResponse`, `DescendantsResponse`, `TranslationResponse`, `HealthResponse`.
- **Curation** — `CurationStatus`, `ConsumerRole`, `VocabularyReleaseStatus`, `UnmappedConcept`, `UnmappedPage`.

## When to use this directly

Most applications should install [`@holon/client`](https://www.npmjs.com/package/@holon/client),
which re-exports the types it needs and gives you the HTTP methods too. Install
`@holon/types` on its own when you are:

- building your own transport or a server that speaks the HOLON contract, or
- sharing HOLON enums/error codes across a codebase without pulling in the client.

## Related packages

- [`@holon/client`](https://www.npmjs.com/package/@holon/client) — the HTTP client built on these types.
- [`@dtp/sdk`](https://www.npmjs.com/package/@dtp/sdk) — the DTP digital-twin SDK.

## Documentation & support

- Developer docs: <https://developer.ontomorph.com/docs>
- Issues: <https://github.com/ontomorph-core/holon-types/issues>

## License

UNLICENSED — © OntoMorph. Usage governed by your OntoMorph platform agreement.
