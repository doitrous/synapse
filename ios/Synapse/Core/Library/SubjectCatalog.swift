import Foundation

/// The organ systems and disciplines the curriculum is organised by — the
/// student-facing names behind the `subjectId` codes that tag every question,
/// article and resource.
///
/// A faithful port of the web's top-level `CURRICULUM_SUBJECTS`
/// (`src/data/curriculumCatalog.ts`), so both platforms name a subject the same
/// instead of the phone showing a bare uppercased code. Content can reference a
/// subject the catalogue no longer lists (an import from another curriculum, a
/// system since renamed); such an id falls back to its own code rather than an
/// empty label, exactly as the web's `getSubject` does.
///
/// English only for now — the web carries an Arabic label per subject; adding it
/// here means threading the interface language through the two call sites.
/// ponytail: English names, add the `ar` labels when the QB/Resources pass a language.
enum SubjectCatalog {

    struct Subject: Sendable { let name: String; let short: String }

    static let byId: [String: Subject] = [
        "cvs": .init(name: "Cardiovascular", short: "CVS"),
        "resp": .init(name: "Respiratory", short: "RESP"),
        "renal": .init(name: "Renal & Urinary", short: "RENAL"),
        "gi": .init(name: "Gastrointestinal", short: "GI"),
        "neuro": .init(name: "Neurology", short: "NEURO"),
        "endo": .init(name: "Endocrine", short: "ENDO"),
        "msk": .init(name: "Musculoskeletal", short: "MSK"),
        "pharm": .init(name: "Pharmacology", short: "PHARM"),
        "fnd": .init(name: "Foundations", short: "FND"),
        "dev": .init(name: "Human development", short: "DEV"),
        "haem": .init(name: "Blood and lymphoreticular", short: "HAEM"),
        "imm": .init(name: "Immune system", short: "IMM"),
        "inf": .init(name: "Infection and tropical medicine", short: "INF"),
        "obs": .init(name: "Pregnancy and childbirth", short: "OBS"),
        "gyn": .init(name: "Female reproductive", short: "GYN"),
        "androl": .init(name: "Male reproductive", short: "AND"),
        "psy": .init(name: "Behavioural health", short: "PSY"),
        "derm": .init(name: "Skin", short: "DERM"),
        "mul": .init(name: "Multisystem and emergencies", short: "MUL"),
        "pop": .init(name: "Population health", short: "POP"),
    ]

    /// A subject's display name, falling back to the uppercased id.
    static func name(_ id: String) -> String {
        byId[id]?.name ?? id.uppercased()
    }

    /// A subject's short code, falling back to the uppercased id.
    static func short(_ id: String) -> String {
        byId[id]?.short ?? id.uppercased()
    }
}
