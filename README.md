
# ZKCreate

**ZKCreate** is a decentralized platform for creators to register, share, and monetize their exclusive content using blockchain technology and Zero-Knowledge Proofs (ZKP). The project leverages a range of smart contracts to enable secure content sharing, subscription management, and content creation for a decentralized creator economy.

## Features

- **User Registration**: Secure creator registration using blockchain-based smart contracts.
- **Content Creation**: Create, upload, and share both free and exclusive content.
- **Subscription System**: Monetize content by offering subscription-based access to exclusive materials.
- **Voting & Proposals**: DAO (Decentralized Autonomous Organization) integration for voting and proposal submission.
- **User Dashboards**: Personalized dashboards for creators to manage their content, subscribers, and revenue.
- **Analytics**: Insights into content performance and user interaction metrics.

## Tech Stack

- **Frontend**: React.js, TypeScript, TailwindCSS, Vite
- **Backend**: Ethereum Smart Contracts (Solidity), IPFS (for content storage)
- **Blockchain**: Zero-Knowledge Proofs, Ethereum, and smart contract integrations
- **Tools**: IPFS, Web3.js, Ethers.js, Ethereum-based wallets (Kepler, MetaMask)

## Installation

To set up this project locally, follow the steps below:

1. Clone the repository:
   ```bash
   git clone https://github.com/sugashsm/ZKCreate.git
2. Navigate to the project folder
   ```bash
   cd ZKCreate
3. Install dependencies:
   ```bash
   npm install
4. Set up environment variables (if necessary) in  tsconfig.json.
5. Start the development server:
```bash
    npm run dev
```
6. Open the application in your browser:
   ```bash
   http://localhost:3000

 Directory Structure
 ```bash
└── sugashsm-ZKCreate/
    ├── README.md               # Project documentation
    ├── index.html               # Main HTML template
    ├── package.json             # Project dependencies and scripts
    ├── tsconfig.json            # TypeScript configuration
    ├── tsconfig.node.json       # TypeScript node configuration
    ├── vite.config.ts           # Vite configuration
    ├── .eslintrc.cjs            # ESLint configuration
    ├── public/                  # Public assets
    │   ├── assets/
    │   └── images/
    └── src/                     # Source code
        ├── App.css              # Global styles
        ├── App.tsx              # Main React component
        ├── components/          # UI components
        ├── connection/          # Blockchain connections
        ├── constants/           # Smart contract ABI and constants
        ├── hooks/               # Custom React hooks
        ├── layout/              # Layout components
        ├── pages/               # React pages
        └── utils/               # Utility functions
```
