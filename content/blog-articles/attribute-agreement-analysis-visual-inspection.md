---
automation_run: "2026-11-11-14"
title: "Attribute Agreement Analysis for Visual Inspection in Automotive Electronics"
meta_title: "Attribute Agreement Analysis for Visual Inspection | TrolinkTek"
meta_description: "Use attribute agreement analysis to qualify visual inspection across factories and receiving teams. Review repeatability, false accepts and limit samples."
canonical: "https://trolink-tek.com/blog/attribute-agreement-analysis-visual-inspection/"
slug: "attribute-agreement-analysis-visual-inspection"
category: "Quality control"
author: "TrolinkTek Editorial Team"
published: "2026-11-11T14:08:28+08:00"
updated: "2026-11-11T14:08:28+08:00"
primary_keyword: "attribute agreement analysis for visual inspection"
secondary_keywords: ["visual inspection repeatability","inspector agreement","cosmetic limit samples","false accepts","reference classification"]
funnel: "MOFU"
target_buyer: "Supplier quality engineers qualifying visual inspection with factories and receiving teams"
image: "/assets/blog/attribute-agreement-analysis-visual-inspection.png"
image_alt: "Two inspectors examining black car display bezels under a factory inspection lamp"
---

# Attribute Agreement Analysis for Visual Inspection in Automotive Electronics

Use attribute agreement analysis to check whether factory and receiving inspectors make the same visual accept or reject decision on the same parts and whether their decisions match an approved reference. Give representative inspectors coded samples, including parts on both sides of the cosmetic limit. Ask them to inspect each sample in separate randomized rounds under the documented conditions. Review repeatability, agreement between inspectors, and agreement with the reference separately. For a portable car screen, pay particular attention to rejected bezel marks that inspectors accept and acceptable marks they reject. A shared decision can still be wrong. Supplier quality teams should use those error patterns to decide whether the inspection can support lot release, needs a narrower scope, or must be corrected and studied again.

## Decide which inspection judgment the study must support

An attribute is a category assigned during inspection, such as acceptable or reject. Attribute agreement analysis evaluates the consistency of those assignments within an inspector, across inspectors, and, where a reference is available, against that reference. The [Minitab explanation of attribute agreement](https://support.minitab.com/en-us/minitab/help-and-how-to/quality-and-process-improvement/measurement-system-analysis/supporting-topics/attribute-agreement-analysis/what-is-an-attribute-agreement-analysis-also-called-attribute-gage-r-r-study/) defines these comparisons, and [ISO/TR 14468](https://www.iso.org/standard/52900.html) provides illustrations of the method.

Write the decision down before collecting samples. For example, can an outgoing inspector and an importer receiving inspector apply the same accept or reject rule to a visible mark on the front bezel of a portable car screen? Identify the part revision, finish, surface zone, inspection point and permissible viewing conditions. A second characteristic, such as damage visible only when the display is powered, may need its own method and study. A single rating that combines both defects would make it harder to tell which rule caused a disagreement.

Check where the judgment sits in the process. A cosmetic decision may sit alongside independent fit and functional checks. The [incoming quality inspection guide](/blog/wireless-carplay-adapter-incoming-quality-inspection/) shows how buyers organize incoming checks and records for another connected-car product. For a screen, the [Smart Car Screen kit architecture guide](/blog/private-label-smart-car-screen-kit-architecture/) can help identify the assemblies and finish variants that need their own inspection scope.

## Give the reference a documented basis

A reference classification is the expected outcome for a specific sample under the approved rule. Establish it before the inspectors begin. Use the approved drawing or cosmetic specification, applicable defect descriptions, surface zones and buyer-approved limit samples. A limit sample shows the condition at or near the acceptance boundary. It carries more information when the record identifies the exact feature, finish and location to examine. Keep the reference decision, its rationale, the sample ID and the approval owner together.

When an engineering measurement legitimately resolves the category, record the method and the result behind the reference decision. Where the rule depends on appearance under defined lighting, agree the classification with the responsible quality and product owners under those conditions. Preserve the original rule and record any open dispute separately. A supplier and buyer who disagree about the reference need to settle the rule before they can interpret disagreements as inspection errors. A majority vote from the study results would make the same judgments both the evidence and the benchmark.

Build the set from representative parts, clearly acceptable and unacceptable examples, and marginal samples on both sides of the rule. Include relevant finishes and defect locations if they are within the intended release scope. Photograph or otherwise document sample condition, protect samples from damage, and replace any specimen whose condition changes. A study set deliberately enriched with difficult parts helps expose weak decisions. Its category mix reflects the study design, so the observed error fraction cannot be read as a field defect rate.

## Run separate rounds with representative inspectors

Include the people and shifts who will make the judgment in production or at receipt. If the same method is intended at two facilities, capture actual inspection conditions at each site. Write down the lamp or station setup, viewing distance and angle, whether rotation is permitted, display and protective-film state, and how long the work instruction allows inspectors to look. Study the normal method. If you want to compare a proposed station setup, assign it a separate condition so its results can be attributed to the change.

Give each inspector the same samples in separate rounds and change the presentation order for each round. Use neutral codes that do not reveal reference categories, prior ratings, lot disposition or another inspector's answers. Space rounds to reduce recall and withhold feedback until recording ends. Ensure each inspector sees each sample the same number of times. [Minitab's study design guidance](https://support.minitab.com/en-us/minitab/help-and-how-to/quality-and-process-improvement/measurement-system-analysis/how-to/attribute-agreement-analysis/attribute-agreement-analysis/before-you-start/data-considerations/) discusses representative inspectors, balanced designs and repeat ratings. Plan sample size and category coverage with the quality team according to the decision risk.

Use one worksheet row per sample, inspector and round. Capture the sample code, surface and defect type, station, instruction revision and exact rating. Keep the reference classification available to the analyst after the rounds. If production uses a hold category, define and study it explicitly. Track when a hold was appropriate and who would decide disposition. A hold silently recoded as accept can hide a failure in the release procedure.

## Read the errors before approving the method

Review the individual decisions behind each summary. A false accept is an unacceptable reference sample called acceptable. A false reject is an acceptable reference sample called unacceptable. Keep separate denominators for the two directions and document whether the analysis counts individual ratings or samples that match across every round. Those summaries answer different questions. Report the number of distinct samples and have the quality analyst account for repeated ratings when estimating uncertainty.

| Review item | Evidence to examine | Decision it supports |
| --- | --- | --- |
| Within-inspector repeatability | Changes in the same person's decision across rounds on the same part | Check viewing instructions, inspection time or how the defect is described |
| Between-inspector agreement | Samples classified differently across operators, shifts or sites | Compare station conditions and how the parties apply the rule |
| Agreement with the reference | Each inspector's ratings against the approved sample decisions | Decide whether the documented method supports the intended acceptance call |
| False accepts | Reject references marked acceptable, grouped by finish, zone and defect | Contain or escalate the affected inspection scope based on risk |
| False rejects | Acceptable references marked reject under the same breakdown | Review avoidable sorting, scrap and receiving disputes |
| Boundary and hold cases | Marginal samples, changes in classification and unresolved holds | Clarify the limit or route the decision to the designated reviewer |

Keep a sample-level record alongside percentages and any chance-adjusted agreement statistic. A high overall figure can coexist with disagreement on the handful of marginal parts that matter most to a shipment. Set decision criteria and escalation rules before viewing results. The buyer and supplier should agree what failure pattern requires a hold, retraining, a method revision or a new study. The [Minitab interpretation guide](https://support.minitab.com/en-us/minitab/help-and-how-to/quality-and-process-improvement/measurement-system-analysis/attribute-agreement-analysis/attribute-agreement-analysis/interpret-the-results/key-results/) shows how to read the different agreement summaries.

## How a screen importer could use the findings

Imagine an importer seeing more bezel rejects at receiving than the factory records at outgoing inspection. Both sites use the same words for a surface mark. During a joint study, each inspector repeats their own decisions on the coded parts. The disagreements concentrate on marks that appear at a shallow viewing angle on a satin bezel. The supplier station allows the operator to tilt the part and the receiving instruction leaves the angle open. The quality team reviews the documented conditions and the approved limit sample before assigning the cause. The difference could come from the angle, the lighting or how each team applies the wording.

The parties agree a viewing method, record it in the instruction and run new coded rounds with representative boundary samples. If the revised method meets the agreed criteria, quality can approve it for that finish and zone. If disagreements persist, quality can restrict who decides marginal cases and review affected lots under the agreed disposition process. The same evidence does not automatically cover a gloss finish, another bezel geometry, scratches on the active display area or a different incoming station.

## Define when the evidence expires

File the study protocol, raw ratings, approved references, decision criteria and release decision under the inspection instruction revision. Name who maintains the sample set and who reviews changes. A change in finish, supplier site, protective film, illumination or defect definition can justify a targeted review of the affected rule. Likewise, a rise in receiving disputes can trigger a comparison of current samples and station conditions with the approved study.

An attribute agreement study characterizes a particular classification system within its study scope. Use a suitable measurement system study for continuous measurements such as bezel gap width. Keep separate evidence for electrical performance, reliability, safety and lot sampling. A passing agreement study cannot demonstrate that any particular shipment met its requirements. The inspection records and release rules still apply to each lot.

## Frequently asked questions

### What is attribute agreement analysis for visual inspection?

It is a study of how consistently inspectors classify the same items. It compares repeated ratings by one inspector, ratings across inspectors, and ratings against an approved reference when one is available.

### Can inspectors agree and still release an unacceptable part?

Yes. If inspectors apply the same incorrect interpretation of a defect limit, they can agree with each other and still disagree with the approved reference. Review false accepts separately before approving the method.

### Can we use one golden sample for the study?

A golden sample can establish an appearance reference. Include additional samples with relevant defects and variation on both sides of the acceptance limit so the study can evaluate actual accept and reject decisions.

### Do the factory and importer need to inspect the same physical units?

Using the same stable units supports a direct comparison of their ratings. Record how the units travel, verify their condition at each site, and document any differences in the inspection setup.

### Can we use the study to set the incoming sampling plan?

Use the study to assess whether the classification method is suitable for the intended scope. Choose lot sampling separately according to the inspection plan and the buyer's release requirements.

## Request a visual inspection test matrix

Review the [product categories](/products/) and [technical downloads](/downloads/) when defining the configuration to inspect. Share your part revision, finish, inspection locations and disputed defect examples when you [Request a Test Matrix](https://trolink-tek.com/#quote).
