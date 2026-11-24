-- Release 2: optional editorial fields for blog posts.
-- kind:        article classification key (tested, researched, first-look, practice, journal, comparison, building) or NULL
-- verified_at: YYYY-MM-DD when prices/facts in the post were last checked, or NULL
-- Additive only: existing posts keep working and stay unclassified until edited.
-- ALREADY APPLIED to the live database on 24 Nov 2026 (with `wrangler d1 execute`), so do not run it again:
-- running it a second time fails with "duplicate column name". Kept here as a record of the schema.
ALTER TABLE articles ADD COLUMN kind TEXT;
ALTER TABLE articles ADD COLUMN verified_at TEXT;
