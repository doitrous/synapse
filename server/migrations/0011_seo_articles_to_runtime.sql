-- Backfill: copy existing seo_articles rows into the runtime's own table (seo_runtime_articles,
-- from 0010_seo_runtime.sql) so @omary98/seo-runtime-express serves them without a re-ingest from
-- the hub. references_json/og_title/og_description (0007_seo_article_references_og.sql) map onto
-- refs/og, not blanked to '[]'/'{}' — that would silently erase the references block and OG copy
-- the article pages render (see seo.js's toLegacyRow).
--
-- INSERT IGNORE: re-running this file after 0010 already has rows is a no-op on the
-- (external_id, lang) primary key, never a duplicate or an overwrite.
--
-- The old seo_articles table is left in place for one release and removed in a follow-up, so a
-- rollback needs no data recovery.
INSERT IGNORE INTO seo_runtime_articles
  (external_id, lang, slug, title, meta_title, meta_description, body_md, body_html, faq, schema_jsonld,
   image_url, image_alt, author_name, author_credentials, refs, og, extra, published_at, updated_at)
SELECT external_id, lang, slug, title, COALESCE(meta_title, ''), COALESCE(meta_description, ''),
       body_md, body_html,
       COALESCE(faq, '[]'), COALESCE(schema_jsonld, '[]'), image_url, image_alt,
       author_name, author_credentials,
       -- spec-1 columns, carried across rather than blanked
       COALESCE(references_json, '[]'),
       JSON_OBJECT('title', COALESCE(og_title, ''), 'description', COALESCE(og_description, ''), 'image', COALESCE(image_url, '')),
       '{}',
       DATE_FORMAT(published_at, '%Y-%m-%dT%H:%i:%s.000Z'),
       DATE_FORMAT(updated_at, '%Y-%m-%dT%H:%i:%s.000Z')
FROM seo_articles;
