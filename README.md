# Arc Hero Landing Page

A modern, responsive file sharing landing page with authentication gating and Discord webhook integration.

## Features

- **Dynamic Hero Section**: Rotating backgrounds with 7 different images and corresponding headlines
- **File Preview Modal**: Preview available files before authentication
- **Authentication Gating**: Email/password form required before download or preview actions
- **Discord Webhook Integration**: Form submissions sent to Discord with user details
- **Email Prefill**: Pre-populate email field via URL parameter
- **Responsive Design**: Fully responsive across all device sizes
- **Smooth Animations**: CSS animations for engaging user experience

## Tech Stack

- **Vite** - Fast build tool and dev server
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - UI component library
- **React Router** - Client-side routing
- **Sonner** - Toast notifications

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or bun

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

## Environment Variables

Create environment variables for your deployment:

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_DISCORD_WEBHOOK_URL` | Discord webhook URL for form submissions | Yes |

## URL Parameters

### Email Prefill

Pre-populate the email field using the `pref` parameter:

```
https://yourdomain.com/?pref=user@example.com
```

## Deployment on Cloudflare Pages

### Method 1: Direct Upload

1. Build the project:
   ```bash
   npm run build
   ```
2. Go to [Cloudflare Pages Dashboard](https://dash.cloudflare.com/?to=/:account/pages)
3. Click "Create a project" → "Direct Upload"
4. Upload the `dist` folder
5. Add environment variables in Settings → Environment variables

### Method 2: Git Integration

1. Push your code to GitHub/GitLab
2. Go to [Cloudflare Pages Dashboard](https://dash.cloudflare.com/?to=/:account/pages)
3. Click "Create a project" → "Connect to Git"
4. Select your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (leave empty)
6. Add environment variables:
   - `VITE_DISCORD_WEBHOOK_URL` = your Discord webhook URL
7. Click "Save and Deploy"

### Build Settings for Cloudflare Pages

| Setting | Value |
|---------|-------|
| Framework preset | None (or Vite) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node.js version | 18 (or higher) |

### Environment Variables in Cloudflare

1. Go to your Pages project → Settings → Environment variables
2. Add `VITE_DISCORD_WEBHOOK_URL` with your Discord webhook URL
3. Redeploy for changes to take effect

## Discord Webhook Setup

1. Open Discord and go to your server
2. Edit the channel → Integrations → Webhooks
3. Create a new webhook and copy the URL
4. Add the URL as `VITE_DISCORD_WEBHOOK_URL` in your deployment

### Webhook Payload

The webhook sends the following data:

- **Email**: User's submitted email
- **Action**: "Download Files" or "Open Preview"
- **IP Address**: User's public IP
- **User Agent**: Browser/device information
- **Timestamp**: ISO 8601 formatted timestamp

## Project Structure

```
src/
├── assets/           # Background images and logo
├── components/
│   ├── ui/           # shadcn/ui components
│   ├── AuthDialog.tsx    # Authentication modal
│   ├── FileCard.tsx      # File list card
│   ├── HeroContent.tsx   # Hero text content
│   ├── HeroSection.tsx   # Hero with rotating backgrounds
│   ├── Navbar.tsx        # Navigation bar
│   ├── NavLink.tsx       # Navigation link component
│   └── PreviewModal.tsx  # File preview modal
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── pages/            # Page components
├── App.tsx           # Main app component
├── index.css         # Global styles and design tokens
└── main.tsx          # App entry point
```

## Customization

### Background Images

Replace images in `src/assets/` with your own:
- `hero-bg.jpg` through `hero-bg-7.jpg`

### Headlines

Edit the `heroContent` array in `src/components/HeroSection.tsx`:

```tsx
const heroContent = [
  { headline: "Your Headline", subtitle: "Your subtitle" },
  // ... more entries
];
```

### File List

Edit the `files` array in `src/components/FileCard.tsx`:

```tsx
const files = [
  { name: "Document.pdf", size: "1.5 MB" },
  // ... more files
];
```

### Colors and Theme

Edit CSS variables in `src/index.css` to customize the color scheme.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## License

MIT License
