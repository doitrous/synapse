-- Blocking one student from another.
--
-- `friendships` stores a symmetric ordered pair and cannot express "A blocked
-- B" as distinct from "B blocked A", so a block gets its own table rather
-- than an overloaded status on that one. `blocker_id` is the one who acted;
-- `blocked_id` is who they blocked. The primary key makes "did A block B" one
-- lookup, and the index on `blocked_id` is what a directory query needs to
-- check the other direction — "has anyone I might be shown blocked me".
CREATE TABLE IF NOT EXISTS blocks (
  blocker_id VARCHAR(64) NOT NULL,
  blocked_id VARCHAR(64) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (blocker_id, blocked_id),
  INDEX idx_blocks_blocked (blocked_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
