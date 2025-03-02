-- Queue table to track users waiting in line for a space
CREATE TABLE queue (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  space_id UUID REFERENCES spaces(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  message TEXT,
  position INTEGER,
  is_paused BOOLEAN DEFAULT FALSE,
  is_current_speaker BOOLEAN DEFAULT FALSE,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  started_speaking_at TIMESTAMP WITH TIME ZONE,
  total_speaking_time INTEGER DEFAULT 0,
  UNIQUE (space_id, user_id)
);

-- Session history table to track space sessions
CREATE TABLE space_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  space_id UUID REFERENCES spaces(id) ON DELETE CASCADE,
  activated_by UUID REFERENCES auth.users(id),
  activated_at TIMESTAMP WITH TIME ZONE NOT NULL,
  deactivated_at TIMESTAMP WITH TIME ZONE,
  total_users_served INTEGER DEFAULT 0
);

-- Add view to get user profiles with their emails
CREATE VIEW user_profiles AS
SELECT 
  u.id,
  u.email,
  up.full_name
FROM auth.users u
LEFT JOIN user_profiles up ON u.id = up.user_id;
