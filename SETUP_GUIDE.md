# Admin CMS Setup Guide

This guide will help you set up the Supabase backend for your portfolio admin CMS.

## Prerequisites
- A Supabase account (free tier is sufficient)
- Your portfolio project code

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/log in
2. Click "New Project"
3. Choose your organization (or create one)
4. Fill in project details:
   - Name: `portfolio-cms` (or your preferred name)
   - Database Password: Generate a strong password and save it
   - Region: Choose the region closest to your users
5. Click "Create new project"
6. Wait for the project to be provisioned (2-3 minutes)

## Step 2: Get Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to **Settings → API**
3. Copy the following values:
   - **Project URL** (e.g., `https://xxxxxxxx.supabase.co`)
   - **anon public key** (long string starting with `eyJ...`)

## Step 3: Update Environment Variables

Open `.env.local` in your project root and update the following:

```env
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password_here
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
ADMIN_PASSWORD=your_secure_password_here
```

**Important:** Replace the placeholder values with your actual Supabase credentials.

## Step 4: Run Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the contents of `supabase-schema.sql` from your project
4. Paste it into the SQL Editor
5. Click "Run" to execute the schema

This will create:
- `projects` table
- `testimonials` table
- `settings` table
- Row Level Security (RLS) policies
- Indexes for performance

## Step 5: Set Up Storage Buckets

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the contents of `supabase-storage.sql` from your project
4. Paste it into the SQL Editor
5. Click "Run" to execute

This will create:
- `project-images` bucket (for project thumbnails)
- `testimonial-images` bucket (for testimonial photos)
- Storage RLS policies

## Step 6: Restart Development Server

After updating your environment variables:

```bash
# Stop the current server (Ctrl+C)
# Then restart
npm run dev
```

## Step 7: Access the Admin Panel

1. Navigate to `http://localhost:3000/admin/login`
2. Enter your admin password (from `ADMIN_PASSWORD` in `.env.local`)
3. You'll be redirected to the admin dashboard

## Step 8: Add Your First Content

### Adding a Project
1. Go to `/admin/projects`
2. Click "Add Project"
3. Fill in the project details:
   - Title and slug (auto-generated)
   - Category (Landing page, Business website, Redesign)
   - Short description (shown on card)
   - Full description (shown on detail page)
   - Technologies (comma-separated)
   - Project URL and GitHub URL
   - Thumbnail image URL (or leave blank for placeholder)
   - Featured status (shows on homepage)
   - Published status (visible on public site)
4. Click "Save Project"

### Adding a Testimonial
1. Go to `/admin/testimonials`
2. Click "Add Testimonial"
3. Fill in the testimonial details:
   - Client name
   - Company and position (optional)
   - Photo URL (optional)
   - Testimonial text
   - Rating (1-5 stars)
   - Featured status
   - Published status
4. Click "Save Testimonial"

### Updating Settings
1. Go to `/admin/settings`
2. Update your business information:
   - Business name
   - Email
   - Phone (optional)
   - Location (optional)
3. Update social links:
   - LinkedIn
   - Instagram
   - GitHub
4. Update SEO settings:
   - Page title
   - Meta description
5. Click "Save Settings"

## Step 9: Verify Public Site

1. Navigate to `http://localhost:3000`
2. Check that your projects appear in the "Recent Work" section
3. Check that testimonials appear in the "What Clients Say" section
4. Verify the contact information is correct

## Deployment to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Add Supabase admin CMS"
git push
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and log in
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure environment variables in Vercel:
   - `NEXT_PUBLIC_ADMIN_PASSWORD`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `ADMIN_PASSWORD`
5. Click "Deploy"

### 3. Verify Deployment

1. Wait for deployment to complete
2. Visit your Vercel URL
3. Test the admin panel at `/admin/login`

## Troubleshooting

### "Invalid supabaseUrl" Error
- Ensure `NEXT_PUBLIC_SUPABASE_URL` starts with `https://`
- Check that the URL is copied correctly from Supabase dashboard
- Restart the dev server after updating `.env.local`

### "Missing Supabase environment variables" Warning
- Make sure both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
- Check that `.env.local` is in the project root
- Restart the dev server

### Projects/Testimonials Not Showing
- Check that the items are marked as "Published" in the admin panel
- Verify the database tables have data in Supabase dashboard
- Check browser console for errors

### Admin Panel Not Loading
- Clear your browser cookies
- Verify the admin password matches `ADMIN_PASSWORD` in `.env.local`
- Check the browser console for errors

## Security Notes

- Never commit `.env.local` to version control
- Use strong, unique passwords for both admin and Supabase
- The admin panel is protected by a single password - consider adding 2FA for production
- Supabase RLS policies are configured to allow public read access but require authentication for writes
- For production, consider using Supabase Auth with proper user authentication instead of single-password

## Next Steps

- Add image upload functionality to the admin panel (currently using URL input)
- Implement email notifications for new leads
- Add analytics tracking
- Set up automated backups
- Consider adding a blog section using the same CMS pattern

## Support

If you encounter issues:
1. Check the Supabase dashboard logs
2. Review browser console errors
3. Verify all environment variables are set correctly
4. Ensure the SQL schema was executed successfully
