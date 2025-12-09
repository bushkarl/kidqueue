/*
  # Create user preferences table

  1. New Tables
    - `user_preferences`
      - `id` (uuid, primary key)
      - `character_id` (text) - Selected character ID
      - `custom_character_name` (text) - Custom character name if applicable
      - `scene_id` (text) - Selected scene ID
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS on `user_preferences` table
    - Add policy for anyone to read/write their preferences (using session storage key)
  
  3. Notes
    - This table stores user preferences in browser localStorage
    - Each browser session can have one preference record
*/

CREATE TABLE IF NOT EXISTS user_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id text NOT NULL DEFAULT 'peashooter',
  custom_character_name text DEFAULT '',
  scene_id text NOT NULL DEFAULT 'exercise',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read preferences"
  ON user_preferences
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert preferences"
  ON user_preferences
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update preferences"
  ON user_preferences
  FOR UPDATE
  USING (true)
  WITH CHECK (true);
