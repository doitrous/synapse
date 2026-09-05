import Foundation

/// One choosable chapter in the question bank.
///
/// The web's `LibTopic`, reduced to what a scope needs. `subtopicIds` is empty
/// for a topic the questions named rather than the library — there is nothing
/// finer to offer under it.
struct ChooserTopic: Identifiable, Equatable, Sendable {
    let id: String
    let title: String
    let subjectId: String
    let subtopicIds: [String]
}

/// What a sitting is drawn from.
///
/// A port of `src/data/qbankScope.ts`. A scope is a set of keys, each either a
/// whole topic (`t:<id>`) or a single subtopic (`s:<id>`), so a student can
/// take a whole chapter or drill into one part of it. The same spelling as the
/// web, so a scope means the same thing on both.
enum QBankScope {

    static func topicKey(_ id: String) -> String { "t:\(id)" }
    static func subtopicKey(_ id: String) -> String { "s:\(id)" }

    /// The prefix marking a topic the questions named rather than the library.
    static let questionTopicPrefix = "qt:"

    static func isQuestionTopic(_ id: String) -> Bool { id.hasPrefix(questionTopicPrefix) }

    /// The subtopic ids a scope implies, expanding whole-topic selections.
    static func subtopicIds(in scope: Set<String>, topics: [ChooserTopic]) -> Set<String> {
        var ids: Set<String> = []
        var wholeTopics: Set<String> = []
        for key in scope {
            if key.hasPrefix("t:") { wholeTopics.insert(String(key.dropFirst(2))) }
            else if key.hasPrefix("s:") { ids.insert(String(key.dropFirst(2))) }
        }
        for topic in topics where wholeTopics.contains(topic.id) {
            ids.formUnion(topic.subtopicIds)
        }
        return ids
    }

    /// Narrow a pool to what the scope covers. An empty scope is everything.
    ///
    /// A whole-topic selection also matches on title, so questions whose
    /// library reference happens to differ are still included — without that, a
    /// bank whose questions are not cross-referenced to articles would come
    /// back empty for a chapter the student can plainly see has questions in it.
    static func questions(
        _ pool: [Question], inScope scope: Set<String>, topics: [ChooserTopic]
    ) -> [Question] {
        guard !scope.isEmpty else { return pool }

        let wanted = subtopicIds(in: scope, topics: topics)
        var titles: Set<String> = []
        for key in scope where key.hasPrefix("t:") {
            let id = String(key.dropFirst(2))
            if let topic = topics.first(where: { $0.id == id }) {
                titles.insert(topic.title.lowercased())
            }
        }

        return pool.filter { question in
            question.libraryIds.contains(where: wanted.contains)
                || titles.contains(question.topic.lowercased())
        }
    }

    /// The chapters a student can actually choose from.
    ///
    /// Built from the library where there is one, and from the questions where
    /// there is not. The web learnt this the hard way: a chooser built from the
    /// library alone shows an empty box to a bank that has questions but no
    /// published articles — which is what a university looks like before its
    /// library is written. Any topic a question names that the library does not
    /// cover becomes a topic in its own right, so the tree describes the bank
    /// rather than only the documented part of it.
    static func chooserTopics(_ pool: [Question], libraryTopics: [ChooserTopic] = []) -> [ChooserTopic] {
        let covered = Set(libraryTopics.map { $0.title.trimmingCharacters(in: .whitespaces).lowercased() })
        var extra: [ChooserTopic] = []
        var seen: Set<String> = []

        for question in pool {
            let title = question.topic.trimmingCharacters(in: .whitespaces)
            guard !title.isEmpty else { continue }
            let key = "\(question.subjectId)::\(title.lowercased())"
            guard !covered.contains(title.lowercased()), !seen.contains(key) else { continue }
            seen.insert(key)
            extra.append(ChooserTopic(
                id: "\(questionTopicPrefix)\(key)",
                title: title,
                subjectId: question.subjectId,
                subtopicIds: []
            ))
        }

        return libraryTopics + extra
    }

    /// How many questions sit under each topic and subtopic, for the badges.
    static func counts(
        _ pool: [Question], topics: [ChooserTopic]
    ) -> (topics: [String: Int], subtopics: [String: Int]) {
        var topicCounts: [String: Int] = [:]
        var subtopicCounts: [String: Int] = [:]

        for topic in topics {
            let title = topic.title.lowercased()
            for subtopic in topic.subtopicIds {
                subtopicCounts[subtopic] = pool.filter {
                    $0.libraryIds.contains(subtopic) || $0.topic.lowercased() == title
                }.count
            }
            topicCounts[topic.id] = pool.filter { question in
                question.topic.lowercased() == title
                    || question.libraryIds.contains(where: topic.subtopicIds.contains)
            }.count
        }
        return (topicCounts, subtopicCounts)
    }

    // MARK: - Choosing

    /// Tick or untick a whole chapter.
    ///
    /// Selecting supersedes any finer picks beneath it: having chosen the whole
    /// chapter, the subtopics under it are no longer a separate statement.
    static func toggleTopic(_ id: String, in scope: Set<String>, topics: [ChooserTopic]) -> Set<String> {
        var next = scope
        let key = topicKey(id)
        if next.contains(key) {
            next.remove(key)
        } else {
            next.insert(key)
            if let topic = topics.first(where: { $0.id == id }) {
                for subtopic in topic.subtopicIds { next.remove(subtopicKey(subtopic)) }
            }
        }
        return next
    }

    /// Tick or untick a subtopic.
    ///
    /// Unticking one out of a whole-topic selection explodes that selection into
    /// its parts, minus this one — otherwise "everything except this" would be
    /// unsayable, and the student would have to untick the chapter and re-tick
    /// each piece by hand.
    static func toggleSubtopic(
        _ subtopicID: String, under topicID: String, in scope: Set<String>, topics: [ChooserTopic]
    ) -> Set<String> {
        var next = scope
        let key = topicKey(topicID)
        let subKey = subtopicKey(subtopicID)

        if next.contains(key) {
            next.remove(key)
            if let topic = topics.first(where: { $0.id == topicID }) {
                for other in topic.subtopicIds where other != subtopicID {
                    next.insert(subtopicKey(other))
                }
            }
        } else if next.contains(subKey) {
            next.remove(subKey)
        } else {
            next.insert(subKey)
        }
        return next
    }

    /// Tick or untick a whole system.
    ///
    /// The web's subject row was once a header with no behaviour, so choosing
    /// "everything cardiovascular" meant ticking each chapter under it in turn.
    static func toggleSubject(
        _ subjectID: String, in scope: Set<String>, topics: [ChooserTopic]
    ) -> Set<String> {
        let group = topics.filter { $0.subjectId == subjectID }
        guard !group.isEmpty else { return scope }

        var next = scope
        let allOn = group.allSatisfy { next.contains(topicKey($0.id)) }
        for topic in group {
            for subtopic in topic.subtopicIds { next.remove(subtopicKey(subtopic)) }
            if allOn { next.remove(topicKey(topic.id)) } else { next.insert(topicKey(topic.id)) }
        }
        return next
    }

    /// Whether a chapter is fully in, partly in, or out.
    enum Tick { case on, partial, off }

    static func tick(topic: ChooserTopic, in scope: Set<String>) -> Tick {
        if scope.contains(topicKey(topic.id)) { return .on }
        let chosen = topic.subtopicIds.filter { scope.contains(subtopicKey($0)) }
        if chosen.isEmpty { return .off }
        return chosen.count == topic.subtopicIds.count ? .on : .partial
    }

    static func tick(subject: String, in scope: Set<String>, topics: [ChooserTopic]) -> Tick {
        let group = topics.filter { $0.subjectId == subject }
        guard !group.isEmpty else { return .off }
        let ticks = group.map { tick(topic: $0, in: scope) }
        if ticks.allSatisfy({ $0 == .on }) { return .on }
        return ticks.contains(where: { $0 != .off }) ? .partial : .off
    }
}
