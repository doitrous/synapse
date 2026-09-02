| cluster | authored | held | remaining | total |
|---|---:|---:|---:|---:|
| anatomy | 49 | 0 | 0 | 49 |
| anatomy2 | 50 | 1 | 0 | 51 |
| histo | 50 | 0 | 0 | 50 |
| microbiology-direct | 38 | 0 | 0 | 38 |
| microbiology-pending | 7 | 0 | 0 | 7 |
| pathology-direct | 46 | 0 | 0 | 46 |
| pathology-pending | 14 | 0 | 0 | 14 |
| physabp-direct | 9 | 0 | 0 | 9 |
| physabp-pending | 19 | 1 | 0 | 20 |
| physblood-direct | 12 | 0 | 0 | 12 |
| physblood-pending | 18 | 0 | 0 | 18 |

## Held
- anatomy2-q00-held — BS-Q15 ("Which artery supplies the conus arteriosus from the left side?", key B, Left conus artery) -- no existing concept covers the left/right conus arteries anywhere in the corpus (checked LCA CON-CVS-1F1AB4B70AB06D and RCA CON-CVS-2A21F1B4F30B61 directly, neither mentions conus branches; find-existing.mjs "conus artery" and "left conus branch" both no hit). Minting a whole new concept (plus article/claims/citations) for this one narrow fact was judged not worth it this pass -- queued for the next tranche alongside the true remaining pool.
- physabp-q07-held — Q7 (location of peripheral chemoreceptors): the printed option D reads "C & D", a self-referential garbled option (should read something like "B & C" for carotid bifurcation and aortic arch together) -- the source paper's own printed key is D, which cannot be rendered as a clean, self-consistent option set. Held rather than silently repaired; the underlying fact (peripheral chemoreceptors sit at the bifurcation of the common carotid artery and in the aortic arch) is queued for the next tranche once a clean option set can be constructed or the source re-checked.

## Remaining
(none)
