ALTER TABLE study_parties ADD COLUMN IF NOT EXISTS layout_key VARCHAR(24) NOT NULL DEFAULT 'legacy';
ALTER TABLE study_parties ADD COLUMN IF NOT EXISTS room_scope VARCHAR(16) NOT NULL DEFAULT 'cohort';
ALTER TABLE study_party_sessions ADD COLUMN IF NOT EXISTS table_id VARCHAR(32) NULL;
ALTER TABLE study_party_games ADD COLUMN IF NOT EXISTS table_id VARCHAR(32) NULL;
CREATE TABLE IF NOT EXISTS study_room_invitations (
  id VARCHAR(64) PRIMARY KEY,
  party_id VARCHAR(64) NOT NULL,
  sender_id VARCHAR(64) NOT NULL,
  recipient_id VARCHAR(64) NOT NULL,
  table_id VARCHAR(32) NULL,
  status VARCHAR(16) NOT NULL DEFAULT 'pending',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME NOT NULL,
  read_at DATETIME NULL,
  INDEX room_invites_recipient (recipient_id, status, expires_at),
  INDEX room_invites_rate (sender_id, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
