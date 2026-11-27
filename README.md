# Sandbox AI

Sandbox AI is a full stack Solana wallet application with a React interface, an Express API, MongoDB persistence, and a Gemini powered chat agent. It combines wallet based sign-in with wallet data, saved contacts, chat history, token discovery, swap quotes, and wallet approved transactions.

This repository contains two independently installed Node.js applications: `frontend/` and `backend/`.

## What the application does

- Connects to Solana wallets through Solana Wallet Adapter and signs a one time nonce to authenticate.
- Stores the authenticated session in an HTTP-only cookie; the API checks that cookie on protected routes.
- Shows the connected wallet's SOL balance and lets a user save wallet contacts.
- Provides an AI chat assistant powered by Gemini and LangChain. The agent can look up contacts, check SOL balance, find tokens, request a Jupiter quote, and prepare an unsigned SOL transfer.
- Keeps chat channels and messages in MongoDB and stores LangGraph agent checkpoints in MongoDB.
- Includes a Jupiter Ultra swap screen that requests an order, asks the connected wallet to sign, and submits the signed order to Jupiter.
- Includes direct wallet based SOL send and a Token-2022 creation experiment.

The transaction boundary is important: the chat agent builds and stores an unsigned SOL transaction; the connected wallet signs and submits it. The AI server does not have the user's wallet signing key. The dashboard also contains display placeholders and buttons for features that are not implemented yet. The separate `Agent.jsx` screen is experimental and is not registered as an application route.

## Technology

| Area | Main tools |
| --- | --- |
| Frontend | React 19, Vite, React Router, Tailwind CSS, TanStack Query, Framer Motion |
| Wallet and chain | Solana Wallet Adapter, `@solana/web3.js`, SPL Token |
| Backend | Node.js (ES modules), Express 5, Mongoose |
| Data | MongoDB, Mongoose models, LangGraph MongoDB checkpoint saver |
| AI | LangChain/LangGraph with Google Gemini (`gemini-2.5-flash`) |
| Token data and swaps | Jupiter token endpoints and Ultra order/execute API |

## How the main flows fit together

### Wallet sign-in

1. The frontend requests a nonce from `POST /api/login` for the connected wallet.
2. The wallet signs that nonce locally; the frontend sends the signature to `POST /api/verify`.
3. The backend verifies the detached Ed25519 signature against the wallet public key, clears the nonce, creates the user/agent records when needed, and sets a JWT cookie.
4. The frontend checks `GET /api/me` when it loads. Protected routes use the authenticated user state and the backend middleware verifies the cookie.

### AI chat and prepared SOL transfer

1. The frontend posts a message to `POST /api/chat/message` with the user's agent ID and optional channel ID.
2. The backend saves the message and invokes the LangGraph agent. MongoDB checkpoints preserve the agent thread using the channel ID.
3. The agent can call typed tools for contacts, balance, token lookup, Jupiter quote, and SOL transfer preparation.
4. For a transfer, the backend validates the destination and amount, checks the sender balance, builds an unsigned transaction, and records a pending transaction. The chat response includes the unsigned transaction data.
5. The chat UI asks the connected wallet to approve and submit that transaction. This active UI flow does not call the API's transaction verification endpoint afterward.

The standalone `/api/web3/sendRequest` handler is currently a stub that only returns `{ success: true }`; it does not create the unsigned transaction. `POST /api/web3/verifyTransaction` checks a signature status and updates the matching pending record.

### Jupiter swap screen

The swap screen loads/searches tokens from Jupiter, fetches an Ultra order using the selected token mints and amount, signs the returned versioned transaction with the connected wallet, and sends the signed transaction plus request ID to Jupiter's execute endpoint. It is a separate client flow from the chat agent.

## Repository map

```text
.
├── README.md
├── backend/
│   ├── src/
│   │   ├── index.js                 # Express application, middleware, route mounting
│   │   ├── config/                  # Environment, MongoDB, Solana RPC, Jupiter clients
│   │   ├── routes/                  # HTTP route definitions
│   │   ├── controller/              # Auth, chat, contacts, transaction controllers
│   │   ├── middleware/              # JWT cookie authentication
│   │   ├── schema/                  # Mongoose user, agent, channel, message, contact, tx models
│   │   ├── service.js/              # JWT token helpers
│   │   ├── repository/               # Auth data access (currently minimal)
│   │   ├── helper/                  # Signature helper and token signing/verification
│   │   ├── agents/                  # Gemini/LangGraph agent and tools
│   │   ├── web3/                    # Solana RPC helpers
│   │   └── web3Controller/          # Balance and transaction history handlers
│   └── package.json
└── frontend/
    ├── src/
    │   ├── App.jsx, AppRoutes.jsx   # App providers and route table
    │   ├── pages/                   # Home, dashboard, chat, swap, token modal
    │   ├── components/              # Shared page sections, controls, modals, route guard
    │   ├── context/                 # User, wallet, modal, and chat state
    │   ├── hooks/                   # Auth, wallet, contact, and chat helpers
    │   ├── api/                     # Backend, RPC, and Jupiter request functions
    │   ├── config/                  # Axios and Solana/Jupiter clients
    │   └── web3/                    # Wallet adapter and transaction UI flows
    └── package.json
```

### Backend modules

- **`config/`**: Loads environment values and creates the Mongoose, Solana RPC, and Jupiter clients.
- **`routes/` + `controller/`**: Expose authentication/profile, contacts, chat, balance/history, and transaction endpoints. Routes apply `isAuthenticated` to user-specific actions.
- **`schema/`**: Defines `User`, `Agent`, `Channel`, `Message`, `Contact`, and `PendingTx`. Contacts have a unique owner-wallet/address pair; channels and messages hold conversation history.
- **`agents/agents.js`**: Builds the Gemini LangGraph ReAct agent and attaches the MongoDB checkpoint saver.
- **`agents/tools/contactTools.js`**: Defines validated agent tools. `send_sol_prepare` builds an unsigned transaction and persists its pending request; it does not sign it.
- **`web3/` and `web3Controller/`**: Read SOL balances and recent signatures/transaction details from the configured Solana RPC.

### Frontend modules

- **`AppRoutes.jsx`**: Public home route plus protected `/dashboard`, `/chat`, `/chat/:sessionId`, and `/dashboard/swap` routes.
- **`context/`**: `UserContext` restores login/profile state; `WalletContext` loads balance and contacts and exposes wallet actions; `ModelContext` manages modal content; `ChatContextProvider` holds chat state for consumers.
- **`pages/Chat.jsx`**: Coordinates chat session selection, message history, and message submission. `ChatLanding`, `ChatSession`, and `ChatSidebar` render the conversation experience.
- **`pages/Swap.jsx` and `api/jupyter/`**: Token search, order retrieval, wallet signing, and Jupiter execution.
- **`web3/SendSolFlow.jsx`**: Renders the wallet approval and submit step for an unsigned transaction returned by the chat agent.
- **`web3/CreateToken2022.jsx`**: Token-2022 mint experiment; not currently part of the home page route flow.
- **`components/`**: Shared landing sections, private-route guard, settings and quick-action buttons/modals.

## Run locally

Use Node.js and npm. Install and run the two applications in separate terminals.

### 1. Configure environment files

Create `backend/.env`:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/sandbox
JWT_SECRET=replace_with_a_long_random_secret
GOOGLE_API_KEY=your_google_generative_ai_key
SOL_URL=https://api.devnet.solana.com
JUP_URL=https://api.jup.ag
JUP_API_KEY=your_jupiter_api_key
```

The agent connects to the MongoDB database named `sandbox` for checkpoints. If your MongoDB URI points to another database, update the `databaseName` in `backend/src/agents/agents.js` to match.

Create `frontend/.env`:

```env
VITE_BACKEND_API_URL=http://localhost:3000/api
VITE_ALCHEMY_URL=your_solana_rpc_url
VITE_SOL_URL=your_solana_rpc_url
VITE_JUP_URL=https://api.jup.ag
VITE_JUP_API_KEY=your_jupiter_api_key
```

`VITE_BACKEND_API_URL` includes `/api` because frontend API functions use paths such as `/login` and `/chat/message`. `VITE_ALCHEMY_URL` is used by Wallet Adapter; `VITE_SOL_URL` is used by transaction helpers. Keep frontend and backend RPC endpoints on the same Solana cluster for expected behavior. Vite environment variables are bundled into browser code, so only put public client configuration there; never put secrets or private keys in `frontend/.env`.

The Express CORS configuration currently allows `http://localhost:5173` with credentials. Change that origin in `backend/src/index.js` if the frontend runs elsewhere.

> `backend/src/helper/signatureCreation.js` exposes `POST /api/create` and signs arbitrary request nonces with `PRIVATE_KEY`. The normal login flow does not use this route. Treat it as a development-only helper; do not configure a valuable wallet key or expose this endpoint in a public deployment.

### 2. Install dependencies

```bash
cd backend
npm install
```

In another terminal:

```bash
cd frontend
npm install
```

### 3. Start the development servers

Backend:

```bash
cd backend
npm run dev
```

Frontend:

```bash
cd frontend
npm run dev
```

Open the Vite URL printed in the frontend terminal (normally `http://localhost:5173`). The backend health endpoint is `http://localhost:3000/health` when `PORT=3000`.

## HTTP API overview

All API routes are mounted below `/api`.

| Method | Path | Purpose | Auth |
| --- | --- | --- | --- |
| `POST` | `/login` | Create or refresh a wallet nonce | No |
| `POST` | `/verify` | Verify wallet signature and set session cookie | No |
| `POST` | `/create` | Development signature helper using server private key | No |
| `GET` | `/me` | Read wallet identity from cookie | Cookie required |
| `POST` | `/logout` | Clear session cookie | Yes |
| `GET` | `/profile` | Read profile | Yes |
| `PATCH` | `/update` | Update profile | Yes |
| `POST` | `/contact/add`, `GET` | `/contact/get` | Add/list contacts for wallet | Yes |
| `POST` | `/chat/message` | Send a message to the AI agent | Yes |
| `GET` | `/chat/channel` | List the user's chat channels | Yes |
| `GET` | `/chat/channel/:userId` | Get most recent channel for user ID | Yes |
| `GET` | `/chat/messages/:channelId` | Read channel messages | Yes |
| `GET` | `/web3/getSolBalance/:walletAddress` | Read SOL balance | Yes |
| `GET` | `/web3/getTransaction/:walletAddress` | Intended recent transaction lookup | Yes |
| `POST` | `/web3/sendRequest` | Current placeholder send request | Yes |
| `POST` | `/web3/verifyTransaction` | Update a pending transaction using signature status | Yes |

`GET /health` is mounted outside `/api`. The current recent-transactions controller returns transaction data but its route does not send that returned value in an HTTP response, so treat that endpoint as unfinished.

## Current scope and limitations

- The app is a prototype. Dashboard cards and several listed actions (staking, bridging, NFT creation, token price, TPS, etc.) are presentation placeholders.
- The Gemini agent exposes a Jupiter quote tool, but the tool list does not implement an `execute_swap` tool; actual swaps are handled by the separate Swap screen.
- The chat transaction UI submits the unsigned transfer through the wallet, but its current `SendSolFlow` does not send the resulting signature to `/web3/verifyTransaction`; pending records may remain pending.
- The `/web3/sendRequest` endpoint is not the transfer-preparation path used by the chat agent.
- The Token-2022 component and standalone agent page are experiments, not registered routes in `AppRoutes.jsx`.
- The frontend and backend packages do not define an automated test suite. Available frontend scripts include `npm run lint` and `npm run build`.

