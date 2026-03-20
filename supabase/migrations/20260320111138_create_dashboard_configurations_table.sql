/*
  # Create Dashboard Configurations Table

  ## Overview
  This migration creates the dashboard_configurations table to store user dashboard
  layouts, widgets, and settings.

  ## New Tables
  - `dashboard_configurations`
    - `id` (uuid, primary key) - Unique configuration identifier
    - `user_id` (text) - User identifier (for multi-user support)
    - `name` (text) - Dashboard name
    - `widgets` (jsonb) - Array of widget configurations
    - `layouts` (jsonb) - Responsive grid layouts (lg, md, sm)
    - `date_filter` (text) - Active date filter setting
    - `is_active` (boolean) - Whether this is the active dashboard
    - `created_at` (timestamptz) - Creation timestamp
    - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Enable RLS on `dashboard_configurations` table
  - Add policies for public access (can be restricted per user later)

  ## Notes
  - JSONB format allows flexible widget and layout storage
  - Supports multiple dashboard configurations per user
  - One dashboard can be marked as active at a time
*/

-- Create dashboard_configurations table
CREATE TABLE IF NOT EXISTS dashboard_configurations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL DEFAULT 'default',
  name text NOT NULL DEFAULT 'My Dashboard',
  widgets jsonb NOT NULL DEFAULT '[]'::jsonb,
  layouts jsonb NOT NULL DEFAULT '{"lg": [], "md": [], "sm": []}'::jsonb,
  date_filter text NOT NULL DEFAULT 'all',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_dashboard_configurations_user_id ON dashboard_configurations(user_id);
CREATE INDEX IF NOT EXISTS idx_dashboard_configurations_is_active ON dashboard_configurations(is_active);

-- Enable Row Level Security
ALTER TABLE dashboard_configurations ENABLE ROW LEVEL SECURITY;

-- Create policies for dashboard_configurations table
CREATE POLICY "Allow public read access to dashboard configurations"
  ON dashboard_configurations
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert access to dashboard configurations"
  ON dashboard_configurations
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update access to dashboard configurations"
  ON dashboard_configurations
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete access to dashboard configurations"
  ON dashboard_configurations
  FOR DELETE
  TO public
  USING (true);

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_dashboard_configurations_updated_at
  BEFORE UPDATE ON dashboard_configurations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
