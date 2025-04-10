# Crypto Market Dashboard

I used Vite template for the project. ($npm create vite@latest).
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Project Overview

This is a cryptocurrency market tracker application built with React and Vite. The application provides a comprehensive and user-friendly interface for tracking cryptocurrency prices, market trends, and detailed asset information.

## Features

- **Markets Page**: Displays a grid view of cryptocurrencies with real-time price data, percentage changes, and market information

  - Filter coins by Featured, Gainers, and Losers
  - Infinite scrolling pagination for loading more coins
  - Responsive grid and list views

- **Asset Info Page**: Provides detailed information about a specific cryptocurrency
  - Interactive price chart using lightweight-charts
  - Time period selector (1D, 7D, 1M, 3M, 1Y)
  - Asset selection via dropdown
  - Current price and price change percentage

## Technical Implementation

- **API Integration**: Uses Axios to fetch data from the Coin Gecko API via a proxy endpoint (https://coingeko.burjx.com)
- **State Management**: Implemented with Redux Toolkit for efficient global state management
- **Routing**: React Router v7 for seamless navigation between pages
- **Responsive Design**: CSS modules for component-specific styling with responsive layouts
- **TypeScript**: Strong typing throughout the application for better code quality and developer experience

## Data Visualization

- Interactive OHLC (Open, High, Low, Close) charts
- Price change visualization with color-coded indicators
- Time-based data filtering

## Project Structure

- Modern component-based architecture
- Custom hooks for reusable logic
- Dedicated API services layer
- Type definitions for better code quality

## How to Run

Ensure you are using node version 18 or higher (e.g. v18.13.0)

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build
npm run build
```

## Technologies Used

- React 19
- TypeScript
- Redux Toolkit
- React Router
- Axios
- Lightweight Charts
- CSS Modules
- Vite
