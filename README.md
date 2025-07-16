
## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

3. **Run tests:**
   ```bash
   npm test
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Deploy to GitHub Pages:**
   ```bash
   npm run deploy
   ```
   Your live demo will be available at:  
   [https://prernaa7.github.io/ticktock-app](https://prernaa7.github.io/ticktock-app)

---

## Frameworks & Libraries Used

- [React](https://reactjs.org/) (with [Create React App](https://create-react-app.dev/))
- [TypeScript](https://www.typescriptlang.org/)
- [React Router](https://reactrouter.com/) (using `HashRouter` for GitHub Pages compatibility)
- [Tailwind CSS](https://tailwindcss.com/) (for styling)
- [MSW (Mock Service Worker)](https://mswjs.io/) (for API mocking in both development and production demo)

---

## Assumptions & Notes

- **No backend:** All API calls are mocked using MSW. No real data is stored or sent.
- **Demo credentials:**  
  - Email: `john@example.com`  
  - Password: `123456`
- **GitHub Pages:** The app is configured to work from the `/ticktock-app/` subdirectory using `HashRouter` and a custom service worker path.
- **For demo only:** MSW is enabled in production for the live demo. This is not recommended for real production apps.

---

## Time Spent

- **Initial setup & development:** ~3-4 hours
- **Deployment & troubleshooting (GitHub Pages, MSW, routing):** ~1 hour
- **Documentation & polish:** ~30 minutes

