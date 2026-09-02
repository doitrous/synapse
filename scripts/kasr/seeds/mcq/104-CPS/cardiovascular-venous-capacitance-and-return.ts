import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: "Physiology Cardiovascular System — Venous Capacitance and Filling Pressure",
  modulePath: "104 CPS > Physiology > Cardiovascular System > Vascular Function",
  articleId: "ART-104-PHY-VENOUS-RETURN-AND-BAROREFLEX",

  concepts: [
    {
      // Fresh mint. find-existing.mjs "capacitance vessels" / "venous
      // compliance" / "mean systemic filling pressure" returned no reusable
      // hit — "safe to create". Pinned to ART-104-PHY-VENOUS-RETURN-AND-
      // BAROREFLEX (docs/Kasr-Source-Imports/article/104-CPS-articles.md,
      // Draft, evidenced — 5 claims/5 spans per its own notes, not GENERATED_BY),
      // read in full before authoring against it: its Definition section
      // states mean systemic filling pressure precisely ("the pressure
      // present throughout the systemic circulation when the heart stops
      // pumping and flow is zero, at which point arterial pressure and right
      // atrial pressure have equalised") and its Mechanism section states
      // that "mean systemic filling pressure reflects blood volume against
      // the capacity of the circulation, and the capacity of the circulation
      // is mainly the capacity of the veins" — confirmed to teach the core of
      // this concept. Deliberately a different file from
      // physiology-circulatory-control-hemorrhagic-shock.ts (whose own
      // venous-return.determinants-and-equation concept is pinned to a
      // different, PROGRESS.md-documented mis-matched article) — this
      // concept and file are untouched by that open issue.
      key: "veins.capacitance-compliance-and-blood-volume-reservoir",
      label: "Veins are the circulation's capacitance vessels, holding the largest share of total blood volume and roughly eight to ten times the distensibility of arteries, so mean systemic filling pressure — the pressure left when the heart stops and flow is zero — depends mainly on venous capacity",
      definition: "Veins and venules are termed capacitance vessels because they hold the largest share of the body's total circulating blood volume of any vascular compartment — roughly 60-70% at rest — far more than arteries (roughly 10-15%) or capillaries (roughly 5%). This capacity comes from a compliance (distensibility) roughly eight to ten times greater than an artery of comparable size, so that within a vein's normal operating range a large increase in volume produces only a small rise in pressure — the shape of the venous pressure-volume curve, which flattens only once the vein wall approaches its own structural elastic limit at very high, excessive volumes. Mean systemic filling pressure is the pressure that would exist throughout the systemic circulation if the heart stopped pumping and flow fell to zero, at which point arterial and right atrial pressure have equalised; because the capacity of the whole circulation is mainly the capacity of its veins, mean systemic filling pressure is set chiefly by blood volume against venous capacity, not by any activity of the heart itself.",
      objective: "Name veins as the capacitance vessels holding the largest blood-volume share and greatest compliance, describe the shape of the venous pressure-volume curve, and define mean systemic filling pressure as the pressure when the heart has stopped and flow is zero.",
      pitfall: "Confusing mean systemic filling pressure with a measurement that depends on the heart's own pumping action. It is defined by the opposite condition — the heart stopped, flow at zero — which is exactly why it isolates the venous system's own capacity and blood volume from anything the heart is doing.",
      subject: "cvs",
      primary: "DIS-PHY-T02",
      secondary: [],
      modulePath: "104 CPS > Physiology > Cardiovascular System > Vascular Function",
      type: "mechanism",
      aliases: ["Capacitance vessels", "Venous compliance", "Mean systemic filling pressure", "MSFP", "Venous pressure-volume curve"],
      gaps: [
        "This leaf's covering article defines mean systemic filling pressure precisely (the pressure when the heart stops pumping and flow is zero, arterial and right atrial pressure equalised) and states that the capacity of the circulation is mainly the capacity of the veins, but it does not itself state the standard approximate figures this leaf's own bank tests directly: veins holding roughly 60-70% of total blood volume, a roughly eight-to-tenfold greater venous than arterial distensibility, or the shape of the vein's own pressure-volume (compliance) curve — a distinct curve from the venous-return-versus-right-atrial-pressure curve this article does teach in detail. These figures are standard, undisputed physiology, but are not yet written into this article's own prose. Flagging for the article-authoring lane.",
      ],
    },
  ],

  questions: [
    {
      key: "mean-systemic-filling-pressure-is-the-systemic-pressure-expe-0c028f3b",
      conceptKey: "veins.capacitance-compliance-and-blood-volume-reservoir",
      difficulty: "Moderate",
      questionType: "Mechanism",
      learningObjective: "Define mean systemic filling pressure as the pressure present when the heart has stopped pumping and flow is zero, not a hemorrhage, venous-diameter or aortic-pressure condition.",
      explanations: {
        A: "Complete exsanguination would drive pressure toward zero everywhere, not toward the equilibrium value mean systemic filling pressure actually names.",
        B: "Mean systemic filling pressure is the pressure present throughout the systemic circulation when the heart stops pumping and flow falls to zero, at which point arterial and right atrial pressure have equalised.",
        C: "Mean systemic filling pressure is defined by the heart stopping, not by veins reaching any particular diameter; venous tone at the moment flow stops is only one of the variables setting its actual value.",
        D: "The aorta's average (mean arterial) pressure is a quite different, much higher figure, measured with the heart actively pumping — the opposite condition from the one mean systemic filling pressure defines.",
      },
    },
    {
      key: "at-any-time-the-greatest-fraction-of-blood-volume-is-present-f63d75ba",
      conceptKey: "veins.capacitance-compliance-and-blood-volume-reservoir",
      difficulty: "Easy",
      questionType: "Recall of a true statement",
      learningObjective: "Name veins as the vascular compartment holding the greatest fraction of total blood volume at any moment.",
      explanations: {
        A: "The heart holds only a modest fraction of total blood volume at any instant, far less than the venous system.",
        B: "Arteries hold a moderate share, roughly 10-15%, of total blood volume — considerably less than the venous system's majority share.",
        C: "Veins and venules together hold the largest share of total circulating blood volume at any given moment, roughly 60-70%, functioning as a low-pressure capacitance reservoir.",
        D: "Capillaries hold only about 5% of total blood volume, the smallest major compartment, since they function for exchange rather than storage.",
      },
    },
    {
      key: "highest-compliance-largest-of-total-blood-volume-5a771246",
      conceptKey: "veins.capacitance-compliance-and-blood-volume-reservoir",
      difficulty: "Easy",
      questionType: "Recall of a true statement",
      learningObjective: "Pair highest compliance with largest blood-volume share as both belonging to veins, against arteries, capillaries and the aorta specifically.",
      explanations: {
        A: "Arteries are comparatively low-compliance, pressure-resisting vessels, not the reservoir compartment this combination describes.",
        B: "Capillaries hold the smallest blood-volume share of any major compartment and have no meaningful capacitance role.",
        C: "Veins combine the highest compliance of any vascular compartment with the largest share of total blood volume, the basis of their role as the circulation's reservoir.",
        D: "The aorta is a single large elastic artery with a comparatively stiff wall and far smaller blood-volume share than the venous system as a whole.",
      },
    },
    {
      key: "the-distensibility-of-the-veins-is-more-than-the-of-arteries-4051477c",
      conceptKey: "veins.capacitance-compliance-and-blood-volume-reservoir",
      difficulty: "Moderate",
      questionType: "Recall of a true statement",
      learningObjective: "State the standard approximate ratio (roughly tenfold) by which venous distensibility exceeds arterial distensibility.",
      explanations: {
        A: "Veins are considerably more distensible than arteries of comparable size, commonly rounded to roughly ten times, since their thinner walls with proportionally less smooth muscle and elastic tissue allow a much larger volume change for a given change in internal pressure.",
        B: "Twenty times overstates the standard comparison of venous to arterial distensibility.",
        C: "Thirty times substantially overstates the standard comparison.",
        D: "Forty times substantially overstates the standard comparison.",
      },
    },
    {
      key: "the-greatest-percentage-of-blood-volume-is-found-in-the-164c3d0c",
      conceptKey: "veins.capacitance-compliance-and-blood-volume-reservoir",
      difficulty: "Easy",
      questionType: "Recall of a true statement",
      learningObjective: "Name venules and veins together as holding the greatest percentage of total blood volume, against the aorta, distributing arteries/arterioles and capillaries.",
      explanations: {
        A: "The aorta alone holds only a small fraction of total blood volume.",
        B: "Distributing arteries and arterioles together hold a moderate share, well below the venous system's.",
        C: "Capillaries hold only about 5% of total blood volume, the smallest major compartment.",
        D: "Venules and veins together hold the greatest share of total blood volume, roughly 60-70%, as the circulation's capacitance reservoir.",
      },
    },
    {
      key: "the-pressure-volume-curve-of-veins-has-the-following-criteri-0f33e8a9",
      conceptKey: "veins.capacitance-compliance-and-blood-volume-reservoir",
      difficulty: "Moderate",
      questionType: "Mechanism",
      learningObjective: "Describe the shape of the venous pressure-volume curve — a large volume increase for a small pressure rise within the normal range — and rule out three reversed or invented alternatives.",
      explanations: {
        A: "Within its normal operating range, a vein's high compliance means a large increase in blood volume produces only a small rise in pressure — the functional basis of veins acting as the body's blood-volume reservoir.",
        B: "This describes low compliance (a large pressure change for a given volume change), the opposite of how veins normally behave within their compliant range.",
        C: "Near the vein wall's structural limit at excessive volumes, the volume-to-pressure ratio actually becomes very low, not high, as the stiffening wall demands progressively greater pressure for further distension.",
        D: "Vessel diameter does change, increasing as internal pressure rises within the elastic range; it does not remain constant, which is the entire basis of a pressure-volume relationship existing at all.",
      },
    },
    {
      key: "which-of-the-following-are-called-capacitance-vessels-that-h-06f1d3bd",
      conceptKey: "veins.capacitance-compliance-and-blood-volume-reservoir",
      difficulty: "Easy",
      questionType: "Recall of a true statement",
      learningObjective: "Name veins as the capacitance vessels holding most of the body's blood volume, against arteries, capillaries and arterioles.",
      explanations: {
        A: "Arteries are termed conductance vessels, not capacitance vessels, and hold a comparatively modest share of total blood volume.",
        B: "Veins are termed capacitance vessels because their high compliance and large aggregate volume let them hold the majority of the body's circulating blood volume at any given time.",
        C: "Capillaries hold only about 5% of total blood volume and function for exchange rather than volume storage.",
        D: "Arterioles are termed resistance vessels, the primary site of vascular resistance regulation, not capacitance vessels for blood-volume storage.",
      },
    },
    {
      key: "which-of-the-following-are-called-capacitance-vessels-that-h-3d3e4b7b",
      conceptKey: "veins.capacitance-compliance-and-blood-volume-reservoir",
      difficulty: "Easy",
      questionType: "Not sittable as extracted.",
      learningObjective: "Not sittable as extracted.",
      explanations: {},
      exclude: true,
      excludeReason: "Option A ('Arteries') has bled into the stem itself ('...most of the blood volume? @ Arteries', the '@' a corrupted 'A)' marker), leaving only 3 lettered options (B, C, D) — below the platform's 4-to-5-option import contract, caught by medical:batch on this commit's own gate run. The same fact, with a clean 4-option set, is already established by this leaf's own which-of-the-following-are-called-capacitance-vessels-that-h-06f1d3bd question.",
    },
  ],
}
