---
automation_run: "2026-11-28-14"
title: "Defect Pareto Analysis for Automotive Electronics: Count Units, Events or Symptoms?"
meta_title: "Defect Pareto Analysis for Automotive Electronics | TrolinkTek"
meta_description: "Define units, events and symptoms before ranking automotive electronics defects. Use a supplier-review worksheet to separate frequency, exposure and risk."
canonical: "https://trolink-tek.com/blog/defect-pareto-analysis-automotive-electronics/"
slug: "defect-pareto-analysis-automotive-electronics"
category: "Quality control"
author: "TrolinkTek Editorial Team"
published: "2026-11-28T14:06:28+08:00"
updated: "2026-11-28T14:06:28+08:00"
primary_keyword: "defect Pareto analysis automotive electronics"
secondary_keywords: ["unique affected units","failure event counting","symptom coding dictionary","supplier quality prioritization","defect category share"]
funnel: "MOFU"
target_buyer: "Importer quality leads, supplier-quality engineers and private-label product managers prioritizing automotive electronics investigations"
image: "/assets/blog/defect-pareto-analysis-automotive-electronics.png"
image_alt: "Five transparent trays with descending groups of black connector housings beside an unpowered automotive display and a gloved hand on a navy quality desk"
---

# Defect Pareto Analysis for Automotive Electronics: Count Units, Events or Symptoms?

A defect Pareto analysis ranks categories of observed problems using one declared measure, such as affected units, failure events or verified recovery cost. For automotive electronics buyers, the first decision is what each bar counts. A single CarPlay AI Box that reconnects repeatedly can create several station events while remaining one affected unit; one Smart Car Screen can have several distinct symptoms. Mixing these records produces a misleading priority list. Define the product cohort, observation window, category rules and counting basis before ranking problems. Then review severity separately and assign investigation owners. A large bar identifies where a chosen burden concentrates; it does not prove root cause, authorize shipment or establish that a less frequent issue is acceptable.

## What a defect Pareto can answer

A **defect Pareto** orders problem categories from the greatest to the smallest contribution to a stated total. The contribution might be the number of affected units, recorded incidents, repair hours or documented cost. The [ASQ explanation of Pareto charts](https://asq.org/quality-resources/pareto) describes ranking by frequency or cost and choosing the categories, measure and period before collecting and totaling the data. The workflow below applies that basic tool to supplier reviews for connected-car accessories.

Ask a specific business question. A supplier-quality engineer may ask which recurring symptom deserves the next investigation. A support manager may ask which incidents consume handling time. A sourcing manager may need to understand which unresolved issue threatens a planned product release. These questions can require different views of the same records. Label each view so its apparent priorities cannot be mistaken for a universal ranking of product quality.

Avoid treating an assumed eighty-twenty split as a target or a fact about your supplier. Read the observed distribution. If problems are spread across many categories, report that result instead of combining categories until the chart resembles a familiar pattern.

## Choose the counting unit before sorting

A **unit** is an identified product within the defined cohort. An **event** is a recorded occurrence under a defined rule. A **symptom** describes what was observed, such as a missing accessory or a reconnect failure. A **cause** explains why it occurred and requires evidence beyond the symptom label. Keep these concepts in separate fields.

| Counting basis | Useful decision | Rule needed | Main limitation |
| --- | --- | --- | --- |
| Unique affected units | How widely a symptom appears in the cohort | Count each identified unit once per category | One unit can appear in multiple categories |
| Qualified failure events | Which observations create repeated production or support work | Define a new event and preserve its unit link | Repeated attempts can dominate the ranking |
| Verified handling time | Where measured investigation or recovery effort accumulates | Record actual scoped time without double counting | Recording practices can differ between teams |
| Documented attributable cost | Which categories carry the recorded financial burden | Agree included cost elements and allocation | Unknown or estimated costs need separate treatment |

If the goal is reducing affected products, start with unique units per symptom category. If the goal is understanding station workload, an event view may be more useful. Keep both if necessary, but do not add unit counts to event counts. A weighted risk score is another constructed measure and needs its own rationale; it should not silently replace the frequency view.

The distinction complements [first-pass yield versus final yield](https://trolink-tek.com/blog/first-pass-yield-vs-final-yield-automotive-electronics/). Yield follows product passage through a defined process. A symptom Pareto separates the problems observed within a defined scope. Neither substitutes for the other, and their totals need not match without an explicit reconciliation rule.

## Build one coherent cohort

Define the population before extracting records: product model, relevant hardware and firmware, process stage, dates and reporting cutoff. A production Pareto for one AI Box revision should not silently include distributor returns from an older revision. Those returns can inform a separate field view, with their own observation and exposure limits.

Keep the number of eligible or inspected units alongside the ranking. A category contributing a large share of recorded defects is not necessarily common among all shipped products. Its share uses the chart total as the denominator; its observed unit rate uses the eligible inspected population under a stated rule. Name both denominators whenever both figures appear.

Comparing factories requires extra care. A supplier with more production or more complete reporting may have a larger count without a worse observed rate. Check comparable exposure, inspection coverage, definitions and open records. Even comparable rates can conceal differences in product mix or test sensitivity. A ranking is a starting point for questions rather than a supplier league table.

## Code observations without inventing causes

Use short, observable categories. “Projection session lost after restart” is more defensible at intake than “defective Wi-Fi chip” when no component investigation exists. Keep the original observation and a separate investigation status. When a cause is confirmed, link it to the incident rather than overwriting the original symptom.

Agree the category dictionary with production, supplier quality and after-sales teams. Define what belongs in each category and provide a boundary example. Decide whether an observation can receive more than one symptom code. If a unit has a loose connector and a scratched bezel, retaining both can be useful, provided the chart clearly says it counts category assignments rather than mutually exclusive products.

An “unclassified” group is preferable to an unsupported diagnosis. Assign an owner to reduce it, and explain whether its records could change the apparent ranking. Keep “other” traceable to detailed codes. A convenient small bar should not hide an unresolved safety-related observation or a new failure mode that deserves separate escalation.

## Reconcile duplicates, retests and reopened cases

Preserve identifiers that connect the unit, event, inspection attempt and support case. A repeat station execution is not automatically a new defective unit. Conversely, a second independent symptom should not vanish just because the device already has an open record.

State how reopened support cases are handled. One customer contacting three channels may create three tickets about one incident; an independently recurring problem after a documented recovery may qualify as another event under the agreed rule. Without those definitions, the chart can reward a team for merging tickets or punish another for recording detailed follow-up.

Do not remove earlier valid failures because later verification passed. Separate occurrence history from current disposition. Where records need amendment, follow the evidence-preserving approach in [quality record corrections](https://trolink-tek.com/blog/quality-record-corrections-automotive-electronics/). Retain the reason for recoding or merging and keep a reproducible report version.

## A hypothetical AI Box review

Consider an illustrative importer reviewing a pilot cohort of CarPlay AI Boxes. One identified unit has four recorded reconnect events. Three other units each have one confirmed missing-cable observation. There are no other recorded symptoms in this deliberately simplified example; these are invented teaching numbers, not TrolinkTek test results.

The event view ranks reconnect first: four of seven events, ahead of three missing-cable events. The unique-unit view ranks missing cables first: three of four affected units, ahead of one reconnect-affected unit. Neither calculation contradicts the other. They answer different questions, and the example provides no inspected-cohort denominator from which to calculate an overall defect rate.

For production workload, repeated reconnect investigation may deserve attention. For the breadth of a pack-out issue, missing cables affect more identified units. The team can assign different owners while asking whether the reconnect condition carries a more serious consequence. The chart alone cannot determine that consequence or identify a verified root cause.

For a Smart Car Screen program, the same logic applies to repeated touch observations, accessory omissions and cosmetic findings. Keep product families separate until their categories and exposure genuinely support comparison. Do not transfer an AI Box ranking to screens merely because both appear in the same purchase order.

## Use a supplier-review worksheet

Complete the following record before accepting a ranked report. The fields make the analysis repeatable and give buyers something more useful than a slide showing declining bars.

| Review field | Entry to request | Decision supported |
| --- | --- | --- |
| Scope and cutoff | Product revisions, process stage, dates and open-case treatment | Defines which records belong |
| Counting contract | Units, qualified events, hours or cost; duplicate and multi-code rules | Makes category totals interpretable |
| Category dictionary | Observable definitions, unknowns and recoding history | Prevents incompatible labels being combined |
| Reconciliation | Source record total, exclusions, missing identifiers and final counted total | Reveals dropped or repeated records |
| Exposure context | Eligible population and coverage, where available | Separates category share from observed rate |
| Risk and next action | Severity review, evidence gap, named owner and next review date | Turns the ranking into bounded investigation work |

For an ordinary nonnegative-count Pareto, sort category totals in descending order. Divide each subtotal by the sum of category subtotals to calculate its share, then accumulate those shares in that order. If there are no observations, say so; a percentage of a zero total is undefined. When units can appear in multiple categories, cumulative share describes counted assignments, not the proportion of distinct products reached.

Keep missing values visible. Unknown costs should not become zero-cost defects. If time entries cover only one service center, label that boundary. Store the extract rules and dictionary revision so the next review can reproduce the figures and identify whether a changed ranking reflects new evidence or changed coding.

## Prioritize action without confusing frequency and risk

Review potentially serious issues through the agreed escalation route regardless of their rank. A low count is not a waiver for an unresolved safety, installation or compliance concern. This guide provides no regulatory classification or permission to release such products; the appropriate qualified owners need to assess those questions separately.

For the remaining improvement work, choose a category with a meaningful burden and an investigation that can produce a decision. Name the evidence needed to distinguish plausible explanations. A dominant reconnect category may need to be split by configuration or failure stage before a useful investigation can begin. Avoid subdividing a tiny dataset until random observations look like a reliable pattern.

After an action, compare equivalent cohorts, counting rules and exposure. A smaller bar may reflect lower production, incomplete tickets or a revised label. Review both the intended outcome and the implementation evidence. The guide to [corrective action effectiveness](https://trolink-tek.com/blog/corrective-action-effectiveness-verification-automotive-electronics/) explains the separate question of whether a verified action remains effective.

## FAQ

### Should every defect Pareto count unique units?

No. Choose the measure for the decision. Unique units show affected-product breadth; qualified events, recorded time or documented cost can show other burdens. Label the measure and keep the views separate.

### Can one unit belong to more than one category?

Yes, if the declared coding rule permits distinct symptoms. The summed category totals then count assignments and can exceed the number of affected units. Do not present the cumulative share as distinct-product coverage.

### Does the largest category prove the main root cause?

No. A symptom category identifies observed burden under the chosen rule. Confirm causes through investigation and preserve the link between the original observation, evidence and conclusion.

### Should the least frequent issue wait until the largest is fixed?

Not automatically. Review severity and escalation obligations separately. An unresolved serious concern can require action even when its bar is small.

### What should a buyer request with a supplier Pareto report?

Request the cohort definition, measure, coding dictionary, duplicate rules, source reconciliation, exposure context and named next actions. Ask for a traceable example rather than accepting the chart image alone.

## Request a Test Matrix

Explore the [Product Center](https://trolink-tek.com/products/) for AI Box and Smart Car Screen categories, and review [OEM/ODM cooperation](https://trolink-tek.com/oem-odm/) when planning controlled product and reporting requirements. To [Request a Test Matrix](https://trolink-tek.com/#quote), share the proposed product, observed symptom groups, intended operating scope and available record structure. A defined matrix helps connect what is observed to the checks and evidence needed for the next product decision.
