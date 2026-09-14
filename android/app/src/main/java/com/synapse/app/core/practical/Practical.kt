package com.synapse.app.core.practical

/**
 * A practical item: an OSCE station, a clinical case, a lab or imaging set, or
 * a skills checklist. A direct port of iOS `Core/Model/Practical.swift` — the
 * five types are one content shape with different blocks filled in, which is
 * why [type] decides what a runner shows rather than a separate model per
 * screen.
 *
 * This MVP renders three of the five: OSCE stations, Clinical cases, and
 * Skills checklists (`feature/practical/PracticalScreen.kt`). "Lab
 * interpretation" / "Imaging interpretation" items still project cleanly
 * through [PracticalProjection] — they carry [questions] just like iOS — but
 * no tab shows them yet; see that file's doc comment for the deferral. Oral
 * questions and Histology slides are a different content kind entirely on iOS
 * (they don't exist there) and are web-only surfaces this task's brief scoped
 * out of this pass.
 */
data class Practical(
    val id: String,
    val title: String,
    val subjectId: String,
    /** As authored: "OSCE station", "Clinical case", "Lab interpretation", "Imaging interpretation", "Skills checklist". */
    val type: String,
    val difficulty: String,
    val minutes: Int?,
    val marks: Int?,
    val learningObjective: String?,
    /** What the candidate is told before they start. */
    val candidateInstructions: String?,
    /** The mark scheme, as sections of tickable points. */
    val markSections: List<MarkSection>,
    /** A case's staged decision points. */
    val decisions: List<Decision>,
    /** A lab or imaging set's questions. */
    val questions: List<LabQuestion>,
    val debrief: String?,
    val references: List<String>,
) {
    data class MarkSection(val id: String, val title: String, val items: List<String>)
    data class Decision(val id: String, val title: String, val context: String, val prompt: String?, val answer: String?)
    data class LabQuestion(val id: String, val prompt: String, val answer: String?)
}

/** Total tickable points across every [Practical.markSections] — what a station or checklist run is scored out of. */
fun Practical.totalMarkItems(): Int = markSections.sumOf { it.items.size }
