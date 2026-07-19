# @ontomorph/holon-types

Shared TypeScript types, enums, error classes, and result helpers for the HOLON
clinical-knowledge API. This is the foundation package. The
[`@ontomorph/holon-client`](https://www.npmjs.com/package/@ontomorph/holon-client) SDK and the HOLON
services all build on the definitions here, so you can import the exact
vocabulary identifiers, error codes, and entity shapes the API speaks.

No runtime dependencies. Pure types, plus a handful of small helpers and enums.

> **The [wiki](https://github.com/ontomorph-core/holon-types/wiki) has the full guide:** getting started, concepts, guides, use cases, API reference, and FAQ.

```bash
npm install @ontomorph/holon-types
# pnpm add @ontomorph/holon-types
# yarn add @ontomorph/holon-types
# bun add @ontomorph/holon-types
```

## Concepts

A quick orientation to the domain these types describe.

**Concept.** A single clinical idea (a drug, a lab test, a diagnosis) with a
stable id, independent of which coding system named it. `Concept`,
`ConceptProjection`, and friends model it.

**Vocabulary.** A source coding system such as SNOMED CT, RxNorm, or LOINC. The
`VocabularyId` enum lists the ones HOLON supports.

**Domain.** What kind of thing a concept is (a `Drug`, a `Measurement`, a
`Condition`). The `DomainId` enum names them.

**ServiceResult.** How every HOLON service returns success or failure without
throwing: `ok(data)` or `err(message, code)`. Callers branch on `.success`
instead of wrapping each call in try/catch.

**ErrorCode and HolonError.** One shared enum of failure reasons, and one error
class that carries it. Whatever surfaces an error, from the client to a service,
speaks the same codes.

## What's inside

### Error codes and classes

```ts
import { ErrorCode, HolonError, ValidationError } from "@ontomorph/holon-types";

throw new ValidationError("age must be a positive integer");

// HolonError carries a machine-readable code and optional response detail:
if (err instanceof HolonError && err.code === ErrorCode.CONCEPT_NOT_FOUND) { … }
```

- `ErrorCode`: the enum every HOLON error and error response uses
  (`CONCEPT_NOT_FOUND`, `NO_MAPPING_FOUND`, `INTERACTION_CHECK_FAILED`,
  `UNAUTHORIZED`, `RATE_LIMIT_EXCEEDED`, `VALIDATION_ERROR`, and more).
- `HolonError`: the base error class (`.code: ErrorCode`, `.details?: unknown`).
- `InvalidEclError`, `InvalidCqlError`, `ValidationError`, `TransactionError`:
  specific subclasses thrown by the query and validation layers.

### `ServiceResult` helpers

A lightweight discriminated-union result type used across the HOLON services,
with `ok()` and `err()` constructors:

```ts
import { ok, err, ErrorCode, type ServiceResult } from "@ontomorph/holon-types";

function lookup(id: number): ServiceResult<Concept> {
  const row = find(id);
  return row ? ok(row) : err("no such concept", ErrorCode.CONCEPT_NOT_FOUND);
}
```

### Vocabulary and domain enums

```ts
import { VocabularyId, DomainId, StandardConcept, MappingEquivalence } from "@ontomorph/holon-types";

VocabularyId.SNOMED_CT; // "SNOMED-CT"
VocabularyId.RXNORM;    // "RxNorm"
VocabularyId.LOINC;     // "LOINC"
```

These cover the supported source vocabularies (`SNOMED-CT`, `RxNorm`, `LOINC`,
`ICD11`, `HPO`, `FMA`, and others), concept `DomainId`s, `StandardConcept`
flags, and the `MappingEquivalence` and `MappingOrigin` classifiers.

### HOLON URI helpers

```ts
import { HOLON_URI_SCHEME, type HolonUriParts, MIME_TURTLE } from "@ontomorph/holon-types";
// HOLON_URI_SCHEME === "holon"; parse and emit holon:… concept URIs, serialize as text/turtle
```

### Entity and response shapes

Interfaces mirroring exactly what the API returns, so client and server share one
definition:

- **Concepts:** `Concept`, `ConceptProjection`, `IndexableConcept`, `ConceptAncestor`, `ConceptMapping`, `ConceptId`.
- **Clinical:** `DrugInteractionSeverity`, `EvidenceGrade`, `ConceptMapEquivalence`, `ConceptRelationshipType`.
- **API:** `ConceptResponse`, `AncestryResponse`, `DescendantsResponse`, `TranslationResponse`, `HealthResponse`.
- **Curation:** `CurationStatus`, `ConsumerRole`, `VocabularyReleaseStatus`, `UnmappedConcept`, `UnmappedPage`.

## When to use this directly

Most applications should install [`@ontomorph/holon-client`](https://www.npmjs.com/package/@ontomorph/holon-client),
which re-exports the types it needs and gives you the HTTP methods too. Reach for
`@ontomorph/holon-types` on its own when you are:

- building your own transport, or a server that speaks the HOLON contract, or
- sharing HOLON enums and error codes across a codebase without pulling in the client.

## Related packages

- [`@ontomorph/holon-client`](https://www.npmjs.com/package/@ontomorph/holon-client): the HTTP client built on these types.
- [`@ontomorph/dtp-sdk`](https://www.npmjs.com/package/@ontomorph/dtp-sdk): the DTP digital-twin SDK.

## Documentation and support

- Developer docs: <https://developer.ontomorph.com/docs>
- Issues: <https://github.com/ontomorph-core/holon-types/issues>

## License

UNLICENSED. © OntoMorph. Usage is governed by your OntoMorph platform agreement.
