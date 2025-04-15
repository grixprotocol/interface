# System Patterns

## Architecture Patterns

1. Component-Based Architecture
   - React components for modular UI development
   - Separation of concerns between components
   - Reusable design system components

2. State Management
   - React Query for server state management
   - React hooks for local state management
   - Wagmi hooks for blockchain state

3. Routing
   - React Router for client-side routing
   - Nested routes for complex views
   - Protected routes for authenticated sections

## Key Technical Decisions

1. Framework Selection
   - React as the primary framework
   - TypeScript for type safety
   - Vite for build tooling

2. UI Framework
   - Chakra UI for component library
   - Emotion for styling
   - Framer Motion for animations

3. Web3 Integration
   - Wagmi for Ethereum interactions
   - Web3Modal for wallet connections
   - Viem for blockchain operations

4. Testing Strategy
   - Jest for unit testing
   - Playwright for E2E testing
   - React Testing Library for component testing

5. Code Quality
   - ESLint for code linting
   - Prettier for code formatting
   - Husky for git hooks

## Design Patterns

1. Component Patterns
   - Container/Presenter pattern
   - Higher-Order Components
   - Custom hooks for logic reuse

2. Data Flow
   - Unidirectional data flow
   - Props drilling minimization
   - Context for global state

3. Error Handling
   - Error boundaries for React errors
   - Try-catch patterns
   - Global error provider

4. Performance Optimization
   - Code splitting
   - Lazy loading
   - Memoization where appropriate

## Trade Agents Transformation Pattern
- Backend agents can have multiple signal requests
- Each signal request generates a separate frontend agent
- Parent agent properties are shared across child agents
- Signal requests with progress !== 'completed' have empty signals array
- Empty signal requests generate single agent with default values

## Data Flow
Backend Agent → Multiple Signal Requests → Multiple Frontend Agents

## Design Patterns
- Tab-based navigation for context switching
- Card-based content presentation
- Progressive disclosure for complex actions
- Focused data visualization approach

## Key Technical Decisions
- Maintain V2's component structure
- Incorporate V1's design system elements
- Hybrid navigation implementation

## Sidebar Design System
### Container Specifications
- Width: 320px
- Position: Sticky with top offset of 20px
- Height: calc(100vh - 100px)
- Background: whiteAlpha.50
- Border: 1px with whiteAlpha.200
- Border Radius: xl

### Scrollbar Styling
- Width: 4px
- Track: transparent
- Thumb: rgba(255, 255, 255, 0.2)
- Border Radius: 2px

### Card Specifications
- Padding: p={4}
- Background: whiteAlpha.50
- Border: 1px with conditional color (selected: blue.400, default: whiteAlpha.200)
- Hover: 
  - bg: whiteAlpha.100
  - transform: translateY(-2px)
  - boxShadow: lg
- Spacing between cards: gap={2}
- Container padding: p={2}

### Typography
- Header: 
  - fontSize: sm
  - color: white
  - fontWeight: semibold
- Card Title:
  - color: white
  - fontWeight: bold
- Secondary Text:
  - color: gray.400
  - fontSize: sm
- Metadata:
  - color: gray.500
  - fontSize: xs

## Layout Structure
- Sidebar fixed width with flexShrink={0}
- Scrollable content area with custom scrollbar
- Sticky positioning for persistent visibility 