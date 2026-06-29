# QuantumNexa

QuantumNexa is a modern PC configuration experience built with **React 19**, **TypeScript**, **Context API**, **Ant Design**, **Tailwind CSS v4**, and **Motion**.

The idea behind the project was simple: create a builder that helps users assemble a compatible PC while staying within a fixed budget, all wrapped in a clean and polished interface.

---

# Getting Started

## Install dependencies

```bash
pnpm install
```

## Start the development server

```bash
pnpm dev
```

## Build the project

```bash
pnpm build
```

---

# Inspiration

Before writing any code, I spent some time exploring existing PC builders and product configurators to understand what makes them enjoyable to use.

Instead of copying one product, I mixed ideas from a few different places:

- **PCPartPicker** → Compatibility checks, validation, and build flow.
- **Apple** → Motion, spacing, typography, and the premium feel.
- **NZXT BLD** → Sticky build summary, product cards, and responsive layout.

The goal wasn't to recreate any of them, but to combine the ideas I liked into something that feels like **QuantumNexa**.

---

# Motion & User Experience

Animations are used to improve the experience, not distract from it.

You'll notice motion in a few places:

- Intro screen before entering the application.
- Smooth transition into the main builder.
- Components animate when they are added or removed from the Build Summary.
- The summary panel smoothly grows and shrinks as the build changes.
- Small hover and selection animations throughout the application.

---

# Features

- One component per category
- Real-time budget calculation
- Budget progress visualization
- Hardware compatibility validation
- Live build summary
- Undo / Redo
- Export build to PDF
- Light / Dark mode
- Responsive design
- Keyboard accessibility

---

# Undo / Redo

Undo and Redo are implemented by keeping a history of the user's selections.

Every change saves the current build into that history.

Undo simply moves one step back, while Redo moves one step forward.

If the user goes back and then makes a new selection, the old future history is removed, just like in most editors.

I chose this approach because it's simple, predictable, and easy to maintain.

---

# Notes

- I used the **Context API** because the application only has one shared state, so introducing another state management library felt unnecessary.

- Since this project uses **React 19**, I avoided unnecessary `useMemo` and `useCallback` to keep the code cleaner and follow the latest React recommendations.

- Business logic is separated from the UI whenever possible to keep components focused on rendering.

- I tried to keep components small, reusable, and easy to understand.

---

## Thanks!

Thank you for taking the time to review **QuantumNexa**.

I genuinely enjoyed building this project, and I hope you enjoy exploring it as much as I enjoyed creating it.

---

> **Fun fact:** I tried connecting an Intel CPU to an AMD motherboard... Quantum Nexa politely reminded me that's not how computers work. 😄
