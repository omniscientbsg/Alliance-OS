# ALLIANCE OS: CODEBASE CONSTITUTION
**For all AI Coding Agents (Claude, Cursor, Codex, OpenClaw)**

You are working on **Alliance OS**, a mission-critical enterprise insurance platform replacing a legacy Oracle Forms (PREMIA) system. Do not write generic Next.js code. Follow these architectural laws strictly.

## 1. TECH STACK & BOUNDARIES
*   **Framework:** Next.js 16 (App Router only). No `pages/` directory.
*   **UI/Styling:** Tailwind CSS v4 + Radix UI + shadcn/ui.
*   **State Management:** Zustand (for global UI state like sidebar, active tabs, theme). *Do not use Zustand for server data.*
*   **Data Fetching:** TanStack Query (React Query). All API calls must be wrapped in `useQuery` or `useMutation`.
*   **Forms & Validation:** React Hook Form + Zod. **No custom form state.** Every form must have a strict Zod schema defined in `src/types/schemas.ts`.
*   **Data Grids:** TanStack Table (used for claims queues, policy lists, reconciliation views).
*   **Real-time:** `socket.io-client` connecting to the central Event Bus.

## 2. FOLDER STRUCTURE
Strict separation of concerns. Do not dump files in the root `src/` or `app/`.
*   `src/app/`: Next.js App Router definitions. Keep these thin.
*   `src/app/_views/`: Heavy page-level layout components (keeps `page.tsx` clean).
*   `src/components/ui/`: Dumb, reusable shadcn/Tailwind components (Buttons, Inputs, Drawers).
*   `src/components/domain/`: Smart, insurance-specific components (e.g., `ClaimTimeline`, `PolicyHeader`, `RiskGraph`).
*   `src/lib/api/`: Axios/Fetch clients and React Query hooks (`useClaims.ts`, `usePolicy.ts`).
*   `src/lib/store/`: Zustand stores (`useUIStore.ts`, `useOmnibarStore.ts`).
*   `src/types/`: TypeScript interfaces and Zod schemas (`index.ts`, `schemas.ts`).

## 3. ORACLE ACL VS. LOCAL STATE
We are using the **Strangler Fig** pattern. The Oracle database is the system of record.
*   The frontend **never** writes directly to a database.
*   All mutations go to our Node.js API Gateway, which translates modern JSON payloads into Oracle PL/SQL calls.
*   When mocking data for prototypes, keep the mock objects strictly typed against our Zod schemas so swapping to the real API requires zero UI changes.

## 4. THE EVENT BUS CONTRACT
Alliance OS is event-driven. Modules react to events; they do not call each other directly.
*   **Standard Payload:** `{ eventId, type: "CLAIM_APPROVED", timestamp, data: { claimId, amount } }`
*   Frontend listens via websockets. When an event fires, invalidate the relevant TanStack Query cache instead of manually mutating state:
    `queryClient.invalidateQueries(['claims', claimId])`

## 5. UI PATTERNS & NAMING CONVENTIONS
*   **Tabs are dead:** Never build tabbed forms. Use the **Canvas Workspace** pattern (Left context rail, Center timeline/action, Right AI rail).
*   **Components:** PascalCase (`ClaimDetailDrawer.tsx`).
*   **Hooks:** camelCase (`useClaimTriage.ts`).
*   **AI Elements:** Any AI-generated data must clearly display a confidence score and require human verification. Highlight low confidence (<80%) in yellow.

## 6. MOCKING VS REALITY
Currently, the UI is heavily mocked (Phase 1 prototype). When writing new features:
1.  Define the Interface in `src/types/`.
2.  Define the Zod Schema.
3.  Write the `useQuery` hook with a hardcoded `delay` resolving the mock data.
4.  Build the UI.
*This ensures the component is ready for the real API without refactoring.*