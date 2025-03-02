-- Enable necessary extensions (Supabase already has these, but including for completeness)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create user_profiles table to extend auth.users
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id)
);

-- Create spaces table
CREATE TABLE IF NOT EXISTS spaces (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  name TEXT NOT NULL,
  subject TEXT,
  slug TEXT NOT NULL UNIQUE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  is_active BOOLEAN NOT NULL DEFAULT false,
  activated_at TIMESTAMP WITH TIME ZONE
);

-- Create space_sessions table to track active sessions
CREATE TABLE IF NOT EXISTS space_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  space_id UUID NOT NULL REFERENCES spaces(id) ON DELETE CASCADE,
  activated_by UUID NOT NULL REFERENCES auth.users(id),
  activated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  deactivated_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create queue table for managing users in a queue
CREATE TABLE IF NOT EXISTS queue (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  space_id UUID NOT NULL REFERENCES spaces(id) ON DELETE CASCADE,
  message TEXT,
  position INTEGER NOT NULL,
  is_paused BOOLEAN NOT NULL DEFAULT false,
  is_current_speaker BOOLEAN NOT NULL DEFAULT false,
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  started_speaking_at TIMESTAMP WITH TIME ZONE,
  total_speaking_time INTEGER NOT NULL DEFAULT 0,
  UNIQUE(user_id, space_id)
);

-- Create indexes for improved query performance
CREATE INDEX idx_spaces_user_id ON spaces(user_id);
CREATE INDEX idx_spaces_slug ON spaces(slug);
CREATE INDEX idx_queue_space_id ON queue(space_id);
CREATE INDEX idx_queue_position ON queue(space_id, position);
CREATE INDEX idx_space_sessions_space_id ON space_sessions(space_id);

-- Create RLS policies (Row Level Security)
ALTER TABLE spaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE space_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for spaces
CREATE POLICY "Users can view all spaces" ON spaces
  FOR SELECT USING (true);

CREATE POLICY "Users can create their own spaces" ON spaces
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own spaces" ON spaces
  FOR UPDATE USING (auth.uid() = user_id);

-- Create policies for queue
CREATE POLICY "Users can view all queue entries" ON queue
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own queue entries" ON queue
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own queue entries" ON queue
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own queue entries" ON queue
  FOR DELETE USING (auth.uid() = user_id);

-- Create policies for profiles
CREATE POLICY "Users can view all profiles" ON user_profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Create policies for space_sessions
CREATE POLICY "Users can view all space sessions" ON space_sessions
  FOR SELECT USING (true);

-- Create triggers for timestamp management
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_profiles_updated_at
BEFORE UPDATE ON user_profiles
FOR EACH ROW EXECUTE PROCEDURE update_updated_at();
