# Theme Implementation Guide 🎨

## Overview

The Urdu Literary Companion now features a sophisticated theme switching system that supports **Light**, **Dark**, and **System** themes with persistent storage and smooth transitions.

## Features 🌟

- **Three Theme Options**:

  - 🌞 **Light Mode**: Bright, readable interface
  - 🌙 **Dark Mode**: Easy on the eyes for night browsing
  - 💻 **System Mode**: Respects user's OS preferences

- **Persistent Storage**: Theme choice is saved in localStorage and restored on refresh
- **Smooth Transitions**: CSS transitions for seamless theme switching
- **Automatic System Detection**: Listens to OS theme preference changes
- **No Flash**: Prevents light/dark flash on page load using inline script

## File Structure 📁

```
src/
├── context/
│   └── ThemeContext.tsx       # Theme provider and useTheme hook
├── components/
│   └── ThemeToggle.tsx        # Theme toggle button component
├── app/
│   ├── page.tsx               # Main page with theme integration
│   ├── layout.tsx             # Root layout with ThemeProvider
│   └── globals.css            # Global styles with theme support
```

## Implementation Details 🔧

### 1. Theme Context (`src/context/ThemeContext.tsx`)

Manages the theme state globally using React Context:

```typescript
type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme; // Current theme setting
  effectiveTheme: "light" | "dark"; // Actual applied theme
  setTheme: (theme: Theme) => void; // Update theme
}
```

**Key Features**:

- Detects system preference on mount
- Listens to OS theme changes
- Persists choice in localStorage
- Applies theme by adding/removing 'dark' class on HTML element

### 2. Theme Toggle Component (`src/components/ThemeToggle.tsx`)

Beautiful toggle button with three states:

```tsx
<ThemeToggle />
```

**Visual States**:

- Light button: Yellow highlight when active
- System button: Blue highlight when active
- Dark button: Indigo highlight when active

### 3. Layout Integration (`src/app/layout.tsx`)

Wrapped the entire app with ThemeProvider:

```tsx
<html lang="en" suppressHydrationWarning>
  <body>
    <ThemeProvider>{children}</ThemeProvider>
  </body>
</html>
```

**Important**: `suppressHydrationWarning` prevents hydration mismatches with the inline theme script.

### 4. Global Styles (`src/app/globals.css`)

Enhanced with theme-aware colors and transitions:

```css
transition-colors duration-300;  /* Smooth color transitions */
dark:from-gray-950               /* Dark mode specific colors */
dark:text-white                  /* Dark mode text colors */
```

## Usage in Components 🎯

### Using the useTheme Hook

```tsx
"use client";

import { useTheme } from "@/context/ThemeContext";

export default function MyComponent() {
  const { theme, effectiveTheme, setTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <p>Applied theme: {effectiveTheme}</p>

      <button onClick={() => setTheme("dark")}>Switch to Dark</button>
    </div>
  );
}
```

### Conditional Styling

```tsx
// Using Tailwind dark: prefix
<div className="bg-white dark:bg-gray-900">
  Content that changes based on theme
</div>;

// Or programmatic approach
const bgColor = effectiveTheme === "dark" ? "#111" : "#fff";
```

## How It Works 🔄

### 1. **Initialization**

- On page load, inline script checks localStorage for saved theme
- If 'dark' theme is detected, adds 'dark' class to HTML
- This prevents flash before React hydrates

### 2. **Context Setup**

- ThemeProvider reads localStorage and system preference
- Determines effective theme (actual applied theme)
- Applies appropriate classes to DOM

### 3. **System Detection**

- Listens to `(prefers-color-scheme: dark)` media query
- Automatically updates when OS theme changes
- Only active when theme is set to 'system'

### 4. **Persistence**

- Every theme change is saved to localStorage
- Key: `'theme'`
- Values: `'light'`, `'dark'`, or `'system'`

### 5. **Transitions**

- CSS transitions make color changes smooth
- Duration: 300ms cubic-bezier(0.4, 0, 0.2, 1)

## Dark Mode Colors 🎨

All components have been updated with dark mode variants:

| Component  | Light    | Dark        |
| ---------- | -------- | ----------- |
| Background | white    | gray-950    |
| Cards      | white    | gray-900    |
| Text       | gray-900 | white       |
| Borders    | gray-200 | gray-800    |
| Accents    | colored  | colored-900 |

## Browser Support ✅

- All modern browsers (Chrome, Firefox, Safari, Edge)
- localStorage support required for persistence
- CSS custom properties (CSS variables) required
- `prefers-color-scheme` media query support

## Troubleshooting 🔧

### Theme doesn't persist

- Check if localStorage is enabled
- Check browser console for errors
- Verify .env.local doesn't contain conflicting settings

### Flash on page load

- Ensure `suppressHydrationWarning` is on HTML element
- Verify inline script in layout.tsx is present

### System theme not updating

- Check if OS theme change event is firing
- Verify `(prefers-color-scheme: dark)` media query support
- Check browser console for JavaScript errors

## Future Enhancements 🚀

- [ ] Add custom color themes
- [ ] Add transition animations for theme switching
- [ ] Add keyboard shortcut for theme toggle (Cmd+Shift+T)
- [ ] Add theme preview before switching
- [ ] Add theme scheduling (auto-dark after sunset)
- [ ] Integration with OS theme scheduling

## Performance Notes ⚡

- Theme context is lightweight and memoized
- No re-renders on theme changes except affected components
- localStorage operations are minimal
- CSS transitions are GPU-accelerated

## Accessibility ♿

- Theme toggle has proper ARIA labels
- Theme colors meet WCAG contrast requirements
- Respects user's `prefers-reduced-motion` setting
- Supports keyboard navigation

---

**Enjoy your theme switching experience!** 🌓
