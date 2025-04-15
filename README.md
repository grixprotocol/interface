# Interface

## Overview

This directory contains the interface for the Grix protocol. The Grix Interface is a web application that provides a user-friendly interface for interacting with the Grix protocol. It includes various pages and components to facilitate user interactions with the protocol.

## Main Components

### App.tsx

The `App.tsx` file serves as the main entry point for the Grix Interface React application. It configures the chains and connectors for Wagmi, initializes Google Analytics, and wraps the application in several providers, including `ErrorBoundary`, `GlobalErrorProvider`, `OptionTypeDesignProvider`, and `WagmiConfig`. It also sets up routing using React Router.

### AppContent.tsx

The `AppContent.tsx` file defines the main layout and routing of the application. It includes a `Header` at the top and a `Footer` at the bottom, with the main content in between. It defines routes for various pages, such as Trade, Points, Bridge, and Status.

### Header.tsx

The `Header.tsx` file defines the header component for the Grix Interface. It includes the Grix logo, navigation links to different pages, and a button for connecting the user's wallet. It uses Chakra UI for responsive design and Wagmi for Web3 integration.

### Footer.tsx

The `Footer.tsx` file defines the footer component for the Grix Interface. It includes the `FooterLinks` component, which likely contains links to various sections or external resources. It applies styles from `componentStyleVariants` to the `Box` component that wraps the footer content.

### TradePage/index.tsx

The `TradePage/index.tsx` file defines the Trade Page component for the Grix Interface. It uses Chakra UI for layout and Wagmi for Web3 integration. It includes the `TradeForm` component and a `ConnectButton` for connecting the user's wallet.

### TradeForm.tsx

The `TradeForm.tsx` file defines the trade form component for the Grix Interface. It manages the state of the trade form using the `useTradeForm` hook and prefetches data using the `usePrefetchTradeForm` hook. It includes various form components, such as `OptionButtonTab`, `CurrencyDropdown`, `ExpirationDatePicker`, `StrikePricePicker`, and `QuotePriceList`. It also includes a submit button to execute the trade.

## High-Level Functionality

The Grix Interface provides the following high-level functionalities:

- **User Authentication:** Allows users to authenticate and authorize their accounts.
- **Dashboard:** Displays an overview of the user's account and activities.
- **Trading:** Provides interfaces for trading options and interacting with various protocols.
- **Portfolio Management:** Allows users to manage their portfolios and view their holdings.
- **Settings:** Provides options for users to configure their preferences and settings.

For detailed information about each submodule, please refer to the respective README files within each directory.

## Main User Stories

1. **User Authentication and Wallet Connection**

   - As a user, I want to connect my cryptocurrency wallet to the Grix Interface so that I can interact with the Grix protocol.
   - The app provides a "Connect Wallet" button in the header, allowing users to connect their wallets using WalletConnect or Injected Connectors.

2. **Trading Options**
   - As a user, I want to trade options on various assets, such as Ethereum and Bitcoin.
   - The app provides a Trade Page where users can select the asset, option type (call or put), trade type (vanilla or 24 hrs), expiration date, and strike price. Users can view quote prices and execute trades.

## Reference to Design System

The Grix Interface follows a design system to ensure a consistent and cohesive user experience. The design system includes various components and styles that are used throughout the application.

- **Design System Components**: The `ds` directory contains design system components, such as `Card`, `CurrencyDropdown`, `InputContainer`, `OptionButtonTab`, and `SliderPicker`.
- **Theme Configuration**: The `ds/theme` directory contains theme configurations, including styles for badges, buttons, number inputs, and colors.
- **Global Styles**: The `components/commons/chakra/GlobalStyles.tsx` file defines global styles applied across the application.

## High-Level Technical Overview

1. **Framework**

   - **React**: The Grix Interface is built using React.

2. **Major Libraries and Tools**
   - **Chakra UI**: A component library that provides a set of accessible, reusable, and composable React components. It is used for building the user interface with a consistent design system.
   - **Wagmi**: A collection of React hooks for Ethereum, used for managing blockchain interactions, such as connecting wallets and fetching account data.
   - **Web3Modal**: A library that provides a modal for connecting to various cryptocurrency wallets, including WalletConnect and Injected Connectors.
   - **React Router**: A library for handling routing in React applications. It is used to define the navigation structure of the Grix Interface.
   - **React Query**: A library for fetching, caching, and updating asynchronous data in React applications. It is used for managing API requests and data fetching.
   - **Google Analytics (React GA4)**: A library for integrating Google Analytics with React applications. It is used for tracking user interactions and page views.
   - **TypeScript**: A statically typed superset of JavaScript that adds type safety to the codebase. It is used throughout the project to improve code quality and maintainability.
   - **Vite**: A build tool that provides fast development and optimized production builds. It is used for bundling and serving the application.
