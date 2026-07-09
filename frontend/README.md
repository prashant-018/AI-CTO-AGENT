# AI CTO Agent - Frontend

A pixel-perfect recreation of a modern AI chat interface built with Next.js 15, TypeScript, and Tailwind CSS.

## 🎨 Design Features

- **Dark Theme** with glassmorphism effects
- **Animated AI Orb** with gradient and glow effects
- **Responsive Layout** with fixed sidebar
- **Smooth Animations** using Framer Motion
- **Glass-effect Components** with backdrop blur
- **Feature Cards** with hover interactions
- **Dynamic Greeting** based on time of day

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **State Management:** Zustand (ready to use)

## 📁 Project Structure

```
frontend/
├── app/
│   ├── layout.tsx          # Root layout with Inter font
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles & glass effects
│   ├── dashboard/          # Dashboard page
│   ├── history/            # Chat history page
│   ├── projects/           # Projects page
│   ├── templates/          # Templates page
│   └── settings/           # Settings page
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx     # Left sidebar with navigation
│   │   ├── Header.tsx      # Top header with AI selector
│   │   └── Search.tsx      # Search component
│   ├── hero/
│   │   ├── Hero.tsx        # Main hero section
│   │   ├── AIOrb.tsx       # Animated gradient orb
│   │   └── Greeting.tsx    # Dynamic greeting
│   ├── prompt/
│   │   ├── PromptBox.tsx   # Main input with glass effect
│   │   ├── AttachButton.tsx
│   │   ├── VoiceButton.tsx
│   │   └── SendButton.tsx
│   ├── cards/
│   │   ├── FeatureCard.tsx # Individual feature card
│   │   └── FeatureGrid.tsx # Grid of feature cards
│   ├── chat/
│   │   ├── ChatContainer.tsx
│   │   ├── ChatMessage.tsx
│   │   ├── UserBubble.tsx
│   │   ├── AssistantBubble.tsx
│   │   ├── TypingIndicator.tsx
│   │   └── MarkdownRenderer.tsx
│   └── common/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Badge.tsx
│       ├── Loader.tsx
│       └── Modal.tsx
├── services/
│   ├── api.ts              # API client with types
│   └── chat.ts             # Chat service
├── hooks/
│   ├── useChat.ts          # Chat management hook
│   ├── useTheme.ts         # Theme management
│   └── useAutoScroll.ts    # Auto-scroll hook
├── store/
│   ├── chatStore.ts        # Chat state (Zustand)
│   └── projectStore.ts     # Project state (Zustand)
├── types/
│   ├── chat.ts             # Chat types
│   └── project.ts          # Project types
└── utils/
    ├── constants.ts        # App constants
    └── helpers.ts          # Helper functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Start development server
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

## 🎯 Key Components

### Sidebar (`components/layout/Sidebar.tsx`)
- Fixed width (280px)
- Glass effect with backdrop blur
- Navigation items with hover animations
- Recent chats section
- Search with keyboard shortcut (⌘K)

### AI Orb (`components/hero/AIOrb.tsx`)
- Gradient sphere (blue → purple → pink)
- Floating animation (4s loop)
- Pulsing glow effect
- Glass overlay for depth

### Prompt Box (`components/prompt/PromptBox.tsx`)
- Large rounded glass container
- Auto-expanding textarea
- Action buttons (attach, voice, send)
- Quick action buttons below
- Keyboard shortcuts (Enter to send)

### Feature Cards (`components/cards/FeatureCard.tsx`)
- Glass effect background
- Hover lift animation
- Icon container with hover effect
- Responsive grid layout

## 🎨 Design System

### Colors
- **Background:** `#0A0E1A` (dark blue-black)
- **Glass:** `rgba(255, 255, 255, 0.02-0.04)` with blur
- **Text Primary:** White
- **Text Secondary:** Gray-400
- **Accent:** Gradient (blue → purple → pink)

### Glass Effects
```css
.glass {
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.glass-strong {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

## 🔌 API Integration

The frontend connects to the FastAPI backend at `http://localhost:8000`

### Environment Variables
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### API Service (`services/api.ts`)
```typescript
import { api } from '@/services/api';

// Send message
const response = await api.sendMessage({
  message: 'Create a backend API',
  conversation_id: 'optional-id'
});

// Stream response
const stream = await api.streamMessage({
  message: 'Design a database',
});
```

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🎭 Animations

All animations use Framer Motion:

- **Fade In:** Hero section (0.2s delay)
- **Floating:** AI Orb (4s infinite loop)
- **Glow Pulse:** Orb glow (3s infinite)
- **Hover Lift:** Cards (-4px translate)
- **Scale:** Buttons (1.05 on hover)

## 🔧 Customization

### Changing Branding
Replace "AI CTO Agent" in:
- `components/layout/Sidebar.tsx` (logo)
- `app/layout.tsx` (metadata)
- `utils/constants.ts` (APP_NAME)

### Adjusting Colors
Edit color variables in:
- `app/globals.css` (CSS variables)
- `tailwind.config.ts` (Tailwind theme)

### Adding Features
Feature cards are defined in:
- `components/cards/FeatureGrid.tsx`

## 📦 Dependencies

### Core
- `next`: ^15.0.0
- `react`: ^18.3.1
- `typescript`: ^5

### UI & Styling
- `tailwindcss`: ^3.4.1
- `framer-motion`: ^11.0.0
- `lucide-react`: ^0.344.0

### Utilities
- `zustand`: ^4.5.0 (state management)
- `clsx` + `tailwind-merge`: Utility classes

## 🐛 Troubleshooting

### Hydration Errors
Fixed by using `suppressHydrationWarning` and `useEffect` for dynamic content

### Missing Dependencies
```bash
npm install to-regex-range fill-range is-number
```

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000
```

## 📄 License

MIT

## 🤝 Contributing

Contributions welcome! Please follow the existing code style and component structure.

---

Built with ❤️ using Next.js 15 and Tailwind CSS
