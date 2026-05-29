# Codex Project Notes

## Before Working

- Read this file before making changes in this repository.
- Check nearby source files before editing and follow the existing structure.
- Treat user changes as intentional. Do not revert unrelated edits.
- Keep edits scoped to the requested task.

## Project Context

- This is a Vite React app.
- `npm run dev` starts the development server.
- `npm run build` verifies the production build.
- Preserve `package-lock.json` unless dependency changes are intentional.

## UI And Design

- Prefer practical app screens over marketing-style landing pages unless requested.
- Use existing components, styling conventions, and installed UI libraries first.
- Use `lucide-react` or existing icon libraries for recognizable UI actions.
- Verify responsive behavior after meaningful visual changes.
- Avoid decorative-only redesigns that reduce usability or clarity.

## Component Reuse

- Manage all UI, windows, dialogs, panels, and repeated screen sections as reusable components where practical.
- Before creating new UI, search for existing components or patterns that can be extended.
- Extract repeated markup, layout logic, controls, and window structures into shared components.
- Keep reusable components focused, prop-driven, and independent from one-off page state.
- Prefer composition over copying similar UI into multiple files.
- Do not introduce broad abstractions for a single isolated use case unless it is likely to repeat.
- Keep `src/app/componentRegistry.tsx` updated when UI components are added, renamed, removed, regrouped, or given local previews.
- Use `/components` as the local source of truth for reusable UI inventory and preview status.

## Workflow

- For UI changes, inspect the running app in a browser when feasible.
- Run `npm run build` after code changes unless the task is documentation-only.
- Mention any verification that could not be completed.
