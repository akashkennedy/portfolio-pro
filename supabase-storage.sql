-- Supabase Storage Setup for Portfolio CMS
-- Run this in your Supabase SQL Editor

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('project-images', 'project-images', true, 5242880, ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']),
  ('testimonial-images', 'testimonial-images', true, 5242880, ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to project-images
CREATE POLICY "Allow public read access to project-images"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'project-images');

-- Policy: Allow authenticated users to upload to project-images
CREATE POLICY "Allow authenticated upload to project-images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'project-images');

-- Policy: Allow authenticated users to update project-images
CREATE POLICY "Allow authenticated update to project-images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'project-images');

-- Policy: Allow authenticated users to delete project-images
CREATE POLICY "Allow authenticated delete to project-images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'project-images');

-- Policy: Allow public read access to testimonial-images
CREATE POLICY "Allow public read access to testimonial-images"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'testimonial-images');

-- Policy: Allow authenticated users to upload to testimonial-images
CREATE POLICY "Allow authenticated upload to testimonial-images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'testimonial-images');

-- Policy: Allow authenticated users to update testimonial-images
CREATE POLICY "Allow authenticated update to testimonial-images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'testimonial-images');

-- Policy: Allow authenticated users to delete testimonial-images
CREATE POLICY "Allow authenticated delete to testimonial-images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'testimonial-images');
