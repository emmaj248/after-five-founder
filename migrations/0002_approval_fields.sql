-- Release 4: record the human approval step for publishing.
-- approved_by:    who approved the post going live ('editor' = signed in to /admin)
-- approved_at:    when it was last approved and made live (UTC)
-- unpublished_at: when it was last taken off the blog (UTC), or NULL
-- Additive only. Posts already live stay live; their approval fields stay empty until they are next published.
-- Run once against the live database:
--   npx wrangler d1 execute afterfive-journal --remote --file=migrations/0002_approval_fields.sql
ALTER TABLE articles ADD COLUMN approved_by TEXT;
ALTER TABLE articles ADD COLUMN approved_at TEXT;
ALTER TABLE articles ADD COLUMN unpublished_at TEXT;
