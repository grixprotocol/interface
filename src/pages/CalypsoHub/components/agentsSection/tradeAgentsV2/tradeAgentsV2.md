# Trade Agents V2 Directory

## Purpose
This directory contains the implementation of the trade agents section in CalypsoHub, providing a comprehensive interface for managing and monitoring AI-powered trading strategies.

## Key Components

### TradeAgentsV2
- Main component managing the view switching between personal and public strategies
- Handles agent selection and signal display
- Integrates with wallet connection for user authentication

### AgentsList
- Displays available trading agents in a scrollable list
- Supports both personal and public agent views
- Implements agent selection functionality

### SignalsList
- Shows trading signals for the selected agent
- Features collapsible signal cards for better information density
- Displays real-time PnL calculations and performance metrics

### CreateAgentForm
- Modal form for creating new trading strategies
- Supports configuration of:
  - Strategy name and budget
  - Trading assets and protocols
  - Data sources and analysis parameters
  - Custom strategy description

## Data Flow
1. Backend Response → transformBackendResponse → Multiple Frontend Agents
2. Agent Selection → Signal Display → PnL Calculations
3. User Input → Agent Creation → Signal Request Generation

## Types
- `Agent`: Frontend agent representation
- `Signal`: Trading signal with performance metrics
- `CreateAgentFormData`: Configuration for new agents
- `PnlResult`: Performance calculation results

## Key Features
- Real-time PnL tracking
- Collapsible signal cards for better UX
- Integrated chatbot support
- Signal sharing capabilities
- Comprehensive performance metrics

## Implementation Details
- Uses Chakra UI for consistent styling
- Implements responsive design patterns
- Integrates with Web3 wallet connections
- Supports multiple data sources for signal generation

## Configuration
- Asset configuration for supported trading pairs
- Input type configuration for data sources
- Progress tracking for signal generation
- Status management for agent states

## Key Files
- `utils.ts`: Contains transformation utilities for converting backend data to frontend format
  - `transformBackendResponse`: Converts backend agents to frontend format, creating multiple frontend agents from a single backend agent based on signal requests

## Hooks
- `useAgentsV2`: Manages agent data fetching and transformation
- `useCreateAgentWithSignal`: Handles agent creation workflow
- `usePnlCalculation`: Calculates real-time performance metrics 

Recent Changes:
- Removed the transformSignal function. The API response is now used directly.
- Updated the Signal type in types.ts to exactly match the API response. The type now uses:
    - A nested 'signal' object with keys: size, reason, instrument, action_type, position_type, instrument_type, target_position_id, expected_total_price_usd, and expected_instrument_price_usd.
    - Outer properties created_at and updated_at remain unchanged.
- Adjusted UI components (SignalsList, SignalCard, etc.) to handle the updated Signal type and display signals correctly.
- Verified that the folder structure and file organization remain consistent with the overall project design.

Next Steps:
- Validate integration with end-to-end tests.
- Confirm UI behavior after the changes. 