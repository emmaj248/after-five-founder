-- Release 2: optional editorial fields for blog posts.
-- kind:        article classification key (tested, researched, first-look, practice, journal, comparison, building) or NULL
-- verified_at: YYYY-MM-DD when prices/facts in the post were last checked, or NULL
-- Additive only: existing posts keep working and stay unclassified until edited.
-- Apply with:  npx wrangler d1 migrations apply afterfive-journal --remote
ALTER TABLE articles ADD COLUMN kind TEXT;
ALTER TABLE articles ADD COLUMN verified_at TEXT;
