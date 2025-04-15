# Style Guide

## Signal Card Component Structure

### Header Section (p={4})
- Layout: HStack with justify="space-between"
- Left: 
  - Instrument name (fontSize="sm", fontWeight="semibold", color="white")
  - Date (fontSize="xs", color="gray.400")
- Center:
  - Position Tag (size="sm", colorScheme based on position type)
- Right:
  - Action buttons (ChatbotButton, Notification)
  - Consistent size="sm"
  - Ghost variant for subtle appearance

### Analysis Section (Primary Focus)
- Position: Directly below header
- Styling:
  - bg="whiteAlpha.100"
  - borderLeft="4px" borderLeftColor="blue.400"
  - borderRadius="lg"
  - p={4}
- Components:
  - Title with icon (FaChartLine)
  - Analysis text
  - Metrics Grid:
    - Confidence (green.300)
    - Time Frame (white)
    - Risk Level (conditional: red.300/yellow.300)

### Data Visualization
- PNL Section
- Option Price Graph (when applicable)
  - Height: 120px
  - bg="whiteAlpha.50"
  - borderRadius="lg" 