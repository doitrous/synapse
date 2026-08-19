import Foundation
import Testing
@testable import Synapse

/// Pinned to `src/data/qbankScope.ts` run under Node against the same pool.
/// A scope is written in the same spelling on both platforms, so a sitting
/// scoped on the website means the same thing here.
struct QBankScopeTests {

    private func question(_ id: String, _ subject: String, _ topic: String, refs: [String] = []) -> Question {
        Question(
            id: id, subjectId: subject, topic: topic, difficulty: "Easy",
            vignette: "", stem: "", options: [], correctLabel: "A", explanation: "",
            learningObjective: nil, estimatedSeconds: nil, libraryIds: refs, conceptIds: []
        )
    }

    private var pool: [Question] {
        [
            question("1", "cvs", "Heart failure"),
            question("2", "cvs", "Heart failure"),
            question("3", "cvs", "Acute coronary syndromes"),
            question("4", "resp", "Asthma"),
            question("5", "resp", "Asthma", refs: ["sub-a"]),
        ]
    }

    /// The case that actually ships: questions published, no library written.
    /// A chooser built from the library alone would show an empty box here.
    @Test func aBankWithNoLibraryStillHasChapters() {
        let topics = QBankScope.chooserTopics(pool)
        #expect(topics.map(\.id) == [
            "qt:cvs::heart failure",
            "qt:cvs::acute coronary syndromes",
            "qt:resp::asthma",
        ])
        #expect(topics.map(\.title) == ["Heart failure", "Acute coronary syndromes", "Asthma"])
        #expect(topics.allSatisfy { $0.subtopicIds.isEmpty })
        #expect(topics.allSatisfy { QBankScope.isQuestionTopic($0.id) })
    }

    @Test func countsMatchTheWeb() {
        let topics = QBankScope.chooserTopics(pool)
        let counts = QBankScope.counts(pool, topics: topics)
        #expect(counts.topics == [
            "qt:cvs::heart failure": 2,
            "qt:cvs::acute coronary syndromes": 1,
            "qt:resp::asthma": 2,
        ])
        #expect(counts.subtopics.isEmpty)
    }

    @Test func aLibraryChapterSupersedesTheSynthesisedOne() {
        let library = [ChooserTopic(id: "lt1", title: "Asthma", subjectId: "resp", subtopicIds: ["sub-a"])]
        let topics = QBankScope.chooserTopics(pool, libraryTopics: library)

        #expect(topics.map(\.id) == ["lt1", "qt:cvs::heart failure", "qt:cvs::acute coronary syndromes"])

        let counts = QBankScope.counts(pool, topics: topics)
        #expect(counts.topics["lt1"] == 2)
        #expect(counts.subtopics["sub-a"] == 2)
    }

    @Test func anEmptyScopeIsEverything() {
        let topics = QBankScope.chooserTopics(pool)
        #expect(QBankScope.questions(pool, inScope: [], topics: topics).count == 5)
    }

    /// Matching on title as well as reference: without it, a bank whose
    /// questions are not cross-referenced to articles comes back empty for a
    /// chapter the student can see has questions in it.
    @Test func aWholeChapterMatchesByTitleToo() {
        let topics = QBankScope.chooserTopics(pool)
        let scope: Set<String> = [QBankScope.topicKey("qt:cvs::heart failure")]
        #expect(QBankScope.questions(pool, inScope: scope, topics: topics).map(\.id) == ["1", "2"])
    }

    @Test func aSubtopicNarrowsToItsOwnQuestions() {
        let library = [ChooserTopic(id: "lt1", title: "Asthma", subjectId: "resp", subtopicIds: ["sub-a"])]
        let topics = QBankScope.chooserTopics(pool, libraryTopics: library)
        let scope: Set<String> = [QBankScope.subtopicKey("sub-a")]
        #expect(QBankScope.questions(pool, inScope: scope, topics: topics).map(\.id) == ["5"])
    }

    @Test func aWholeChapterExpandsToItsSubtopics() {
        let library = [ChooserTopic(id: "lt1", title: "Asthma", subjectId: "resp", subtopicIds: ["sub-a"])]
        #expect(QBankScope.subtopicIds(
            in: [QBankScope.topicKey("lt1")], topics: library
        ) == ["sub-a"])
    }

    // MARK: - Ticking

    private var tree: [ChooserTopic] {
        [
            ChooserTopic(id: "a", title: "A", subjectId: "cvs", subtopicIds: ["a1", "a2"]),
            ChooserTopic(id: "b", title: "B", subjectId: "cvs", subtopicIds: []),
        ]
    }

    /// Choosing a whole chapter makes any finer picks under it redundant, so
    /// they go — leaving them would mean the same thing said twice.
    @Test func aWholeChapterSupersedesItsParts() {
        let scope = QBankScope.toggleTopic("a", in: [QBankScope.subtopicKey("a1")], topics: tree)
        #expect(scope == [QBankScope.topicKey("a")])
    }

    /// The rule that makes "everything except this one" sayable at all.
    @Test func untickingOnePartExplodesTheChapter() {
        let scope = QBankScope.toggleSubtopic(
            "a1", under: "a", in: [QBankScope.topicKey("a")], topics: tree
        )
        #expect(scope == [QBankScope.subtopicKey("a2")])
    }

    @Test func aSubtopicTogglesOnItsOwn() {
        var scope = QBankScope.toggleSubtopic("a1", under: "a", in: [], topics: tree)
        #expect(scope == [QBankScope.subtopicKey("a1")])
        scope = QBankScope.toggleSubtopic("a1", under: "a", in: scope, topics: tree)
        #expect(scope.isEmpty)
    }

    /// Picking a whole system used to mean ticking each chapter under it by hand.
    @Test func aSystemTicksEverythingUnderIt() {
        var scope = QBankScope.toggleSubject("cvs", in: [], topics: tree)
        #expect(scope == [QBankScope.topicKey("a"), QBankScope.topicKey("b")])

        scope = QBankScope.toggleSubject("cvs", in: scope, topics: tree)
        #expect(scope.isEmpty)
    }

    @Test func aPartlyChosenChapterSaysSo() {
        #expect(QBankScope.tick(topic: tree[0], in: []) == .off)
        #expect(QBankScope.tick(topic: tree[0], in: [QBankScope.topicKey("a")]) == .on)
        #expect(QBankScope.tick(topic: tree[0], in: [QBankScope.subtopicKey("a1")]) == .partial)
        #expect(QBankScope.tick(
            topic: tree[0], in: [QBankScope.subtopicKey("a1"), QBankScope.subtopicKey("a2")]
        ) == .on)
    }

    @Test func aPartlyChosenSystemSaysSo() {
        #expect(QBankScope.tick(subject: "cvs", in: [], topics: tree) == .off)
        #expect(QBankScope.tick(subject: "cvs", in: [QBankScope.topicKey("a")], topics: tree) == .partial)
        #expect(QBankScope.tick(
            subject: "cvs", in: [QBankScope.topicKey("a"), QBankScope.topicKey("b")], topics: tree
        ) == .on)
    }
}
