# Visual acceptance gate

Capture baseline, reference and candidate at 1440x900, 1920x1080, 1024x768, 768x1024 and 390x844. Use identical browser zoom, device scale, font load completion and reduced motion. Capture viewport and full page; wait for images and fonts. Store screenshots in `design/after-five-target/qa/`. Inspect screenshots side by side. Do not publish or deploy.

## Critical (all must pass)
- Actual original logo unchanged; original font assets loaded. No generated portrait, third-party brand marks or fake articles.
- Desktop header about 80px; hero about 530px (excluding header), with two balanced columns. At 1440x900 the first editorial section heading and start of stories are visible. No giant blank hero or 100vh lock.
- Hero predominantly bright paper; bronze accent on final tagline; recognizable original playful technology illustration composed on right. No generic stock-photo replacement. Foreground panels legible and not excessively faded.
- Main content maximum 1240px, consistent gutters, sectional spacing 48–88px. Reference positions within roughly 24px at desktop after allowing for actual font and content differences; avoid clipping rather than forcing exact alignment.
- Editorial hierarchy: featured article + smaller stories, not uniform generic cards; truthful empty state if no content. Founder directly after editorial area. Toolkit clearly visible with real interactive calculator.
- Mobile: no horizontal overflow at 390px or 375px, readable headline, simplified hero illustration, accessible navigation, usable tools. No offscreen or overlapping controls. Touch targets around 44px where practical.
- Preserve all existing routes, forms, calculators, exports, article visibility rules, shop availability and newsletter functionality. No production data changes or paid requests.
- Contrast, keyboard navigation, visible focus and reduced-motion verified. Actual font and brand colors may require accessible adjustments.

## Evidence and iteration
Record PASS/FAIL/BLOCKED and screenshot or test evidence for every item. Fix highest impact failures first. For each visual mismatch state cause, targeted change and new screenshot. Compare composition rather than pixel matching fictional content. Optional image diffs may help locate regressions, but do not optimize against generated imagery. If browser tooling unavailable, mark visual QA BLOCKED; build success is not visual approval. Run existing build/tests and report actual output. Final approval remains with the site owner.
