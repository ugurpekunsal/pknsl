# Ian Pekünsal - Portfolio Website

A modern, responsive portfolio website built with Next.js, React, and Tailwind CSS.

## Features

- Responsive design for all device sizes
- Dark/light mode toggle
- Interactive UI with animations using Framer Motion
- Portfolio showcase
- Working contact form
- Resume/skills section
- Fast performance with Next.js

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/your-username/pknsl.git
cd pknsl
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Run the development server

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the site.

## Setting Up the Contact Form

The contact form uses [Resend](https://resend.com) to send emails. To set it up:

1. Sign up for a free Resend account at [resend.com](https://resend.com)
2. Create an API key in the Resend dashboard
3. Add your API key to the environment variables:

Create a `.env.local` file in the root of your project with the following variables:

```
RESEND_API_KEY=re_xxxxxxxxxxxx
EMAIL_FROM=your-verified-domain@example.com
EMAIL_TO=your-email@example.com
```

Notes:

- For `EMAIL_FROM`, you need to use a domain you've verified with Resend, or use the default `onboarding@resend.dev` for testing
- `EMAIL_TO` is where you'll receive contact form submissions

### Deploying to Vercel

When deploying to Vercel, add the environment variables in the Vercel dashboard:

1. Go to your project in the Vercel dashboard
2. Navigate to Settings > Environment Variables
3. Add the same variables as above:
   - `RESEND_API_KEY`
   - `EMAIL_FROM`
   - `EMAIL_TO`

## Customizing Your Portfolio

Most of the portfolio content can be modified in the `src/data/resumeData.json` file. Update this file with your own information to personalize the site.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Theme design inspiration from various portfolio templates
- Icons from [FontAwesome](https://fontawesome.com)
- Background patterns and UI components custom designed
