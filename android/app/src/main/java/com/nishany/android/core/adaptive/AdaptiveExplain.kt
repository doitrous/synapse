package com.nishany.android.core.adaptive

/**
 * What the engine tells a student about itself.
 *
 * A port of the copy in `src/data/adaptive/explain.ts`, kept as data rather than
 * written into a view. These sentences are the product's promises about what it
 * does and does not measure, and they must read identically wherever they appear.
 */
object AdaptiveExplain {

    data class Note(val heading: String, val body: String)

    val WRONG_ATTEMPTS_VERSUS_WEAK_CONCEPTS = Note(
        heading = "Wrong answers and weak concepts are counted differently",
        body = "If you answer three questions incorrectly and all three were mainly testing the same " +
            "concept, that records three wrong attempts and at most one weak concept. The mistakes are all " +
            "kept -- they make repairing that concept more urgent -- but they do not create three separate " +
            "weaknesses. This is why the number of wrong answers you remember is usually larger than the " +
            "number of weak concepts shown.",
    )

    val ADAPTIVE_CHOOSES_WHAT_TO_STUDY = Note(
        heading = "Adaptive practice chooses what to study",
        body = "Adaptive blocks deliberately oversample what you are weakest at and what is due for review. " +
            "Your accuracy inside them is therefore not a fair estimate of your exam performance, and it is " +
            "not used as one.",
    )

    val READINESS_MEASURES_WHERE_YOU_STAND = Note(
        heading = "Readiness assessment measures where you stand",
        body = "A readiness assessment is drawn from questions held back from your practice and balanced " +
            "against your exam blueprint. That is what makes its range meaningful.",
    )
}
