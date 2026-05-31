-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Projects table
CREATE TABLE projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  client_name TEXT,
  category TEXT NOT NULL CHECK (category IN ('Landing page', 'Business website', 'Redesign')),
  short_description TEXT NOT NULL,
  full_description TEXT,
  technologies TEXT[] DEFAULT '{}',
  project_url TEXT,
  github_url TEXT,
  thumbnail_image TEXT,
  gallery_images TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for projects
CREATE INDEX idx_projects_published ON projects(published);
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_projects_display_order ON projects(display_order);
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_slug ON projects(slug);

-- Testimonials table
CREATE TABLE testimonials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_company TEXT,
  client_position TEXT,
  client_photo TEXT,
  testimonial_text TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) DEFAULT 5,
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for testimonials
CREATE INDEX idx_testimonials_published ON testimonials(published);
CREATE INDEX idx_testimonials_featured ON testimonials(featured);
CREATE INDEX idx_testimonials_rating ON testimonials(rating);

-- Settings table
CREATE TABLE settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings
INSERT INTO settings (key, value) VALUES
  ('business_name', '"Portfolio"'),
  ('email', '"contact@example.com"'),
  ('phone', '"+1234567890"'),
  ('location', '"City, Country"'),
  ('social_links', '{"linkedin": "", "instagram": "", "github": ""}'),
  ('seo', '{"title": "Portfolio", "description": "Web Developer Portfolio"}');

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for projects (public read, admin write)
CREATE POLICY "Projects are viewable by everyone"
  ON projects FOR SELECT
  USING (published = true);

CREATE POLICY "Admins can insert projects"
  ON projects FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can update projects"
  ON projects FOR UPDATE
  USING (true);

CREATE POLICY "Admins can delete projects"
  ON projects FOR DELETE
  USING (true);

-- RLS Policies for testimonials (public read, admin write)
CREATE POLICY "Testimonials are viewable by everyone"
  ON testimonials FOR SELECT
  USING (published = true);

CREATE POLICY "Admins can insert testimonials"
  ON testimonials FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can update testimonials"
  ON testimonials FOR UPDATE
  USING (true);

CREATE POLICY "Admins can delete testimonials"
  ON testimonials FOR DELETE
  USING (true);

-- RLS Policies for settings (public read, admin write)
CREATE POLICY "Settings are viewable by everyone"
  ON settings FOR SELECT
  USING (true);

CREATE POLICY "Admins can update settings"
  ON settings FOR UPDATE
  USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON testimonials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at
  BEFORE UPDATE ON settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
