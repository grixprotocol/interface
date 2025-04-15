# Technical Context

## Technologies Used
[Awaiting confirmation of tech stack]

## Development Setup
[Awaiting confirmation of development environment]

## Technical Constraints
- Must maintain all existing V2 data presentation capabilities
- Must preserve V2's component structure while updating design

### Browser Support
- Production:
  - >0.2% market share
  - Not dead browsers
  - No Opera Mini

### Development:
- Latest Chrome
- Latest Firefox
- Latest Safari

### Performance Requirements
- Fast initial load time
- Responsive UI
- Efficient blockchain interactions

### Security Considerations
- Secure wallet connections
- Protected API endpoints
- Environment variable management
- No exposed API keys

### Dependencies
- All dependencies managed through pnpm
- Specific built dependencies handled through pnpm configuration
- Regular security updates required 

## Trade Agents Implementation
- Location: src/pages/CalypsoHub/components/agentsSection/tradeAgentsV2/utils.ts
- Key Functions:
  - transformBackendResponse: Converts backend agents to frontend format
  - transformSignal: Converts individual signals to frontend format
- Data Structure:
  - Backend: Nested structure with agents containing signal requests
  - Frontend: Flat structure where each signal request becomes an agent 