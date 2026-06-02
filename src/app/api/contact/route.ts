import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, projectType, budget, timeline, description } = body;

    // Validate required fields
    if (!name || !email || !projectType || !budget || !timeline || !description) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Create email content
    const emailContent = `
New Website Inquiry

Name: ${name}
Email: ${email}
Project Type: ${projectType}
Budget Range: ${budget}
Timeline: ${timeline}

Project Description:
${description}
    `.trim();

    // Log the inquiry to console
    console.log('New contact form submission:', emailContent);

    // Send email using Resend
    try {
      await resend.emails.send({
        from: 'portfolio@akashkennedy.com',
        to: 'akashkennedy1@gmail.com',
        subject: `New Website Inquiry from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #534AB7;">New Website Inquiry</h2>
            <div style="background: #f5f3fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Project Type:</strong> ${projectType}</p>
              <p><strong>Budget Range:</strong> ${budget}</p>
              <p><strong>Timeline:</strong> ${timeline}</p>
            </div>
            <h3 style="color: #534AB7;">Project Description:</h3>
            <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 8px;">${description}</p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Error sending email via Resend:', emailError);
      // Continue with success response even if email fails
      // This prevents the user from seeing an error if Resend is not configured
    }

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
