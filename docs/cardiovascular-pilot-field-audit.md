# Cardiovascular pilot field audit

Generated from `server/data/medical-library-v1.json` on 2026-08-10. The executable check is `npm run medical:audit`.

## Result

- 10 articles; 50 article fields checked per record.
- 111 readable article sections; 101 sections contain claim-linked facts.
- Every article ends with a dedicated **Components and relations** section.
- 140 canonical concepts; 42 concept fields checked per record.
- 16 typed relationships; 4 currently pass the strict evidence gate.
- 140 atomic claims and 167 citations.
- 27 article facts link to more than one resource.
- No missing required field, broken article/concept/claim/citation/resource reference, or absolute authoring path.

## Fields intentionally left empty

Empty does not mean forgotten. Each record stores a field-specific reason in `fieldNotes` when a field is applicable but cannot be filled safely.

- Arabic titles, labels, and aliases remain empty until reviewed Arabic terminology is supplied.
- Module IDs remain empty because the source names the Cardiovascular module but does not provide a verified live module ID.
- Question IDs remain empty until validated question records are linked.
- Media remains empty until its exact source, locator, rights, alt text, and teaching necessity are reviewed.
- Concept pitfalls remain empty when no concept-specific misconception is explicitly supported by the qualified source.
- Review dates remain empty for claims and articles that have not passed their evidence gate.
- Local file-resource approvals remain pending until the hash-matched file is uploaded to authenticated storage.

## Publication rule

The pilot keeps the original conservative gate: one article and 24 concepts are publishable; the rest stay under review. A high extraction confidence does not replace independent medical verification. Treatment, procedure, dose, emergency, and recommendation content cannot auto-publish.

## Data-model rule

Canonical Subjects & Topics placement is the source of truth. The older university curriculum fields remain an optional compatibility overlay. Missing overlay microtopic or nanotopic IDs do not weaken a valid canonical placement and are never invented.
