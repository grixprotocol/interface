# Contributing to Grix Interface

First off, thank you for considering contributing to the Grix Interface! Your help is appreciated.

## Ways to Contribute

There are many ways to contribute, including:

*   Reporting bugs
*   Suggesting enhancements or new features
*   Writing or improving documentation
*   Adding or improving tests (Unit, Integration, E2E)
*   Writing code for bug fixes or new features

## Getting Started

### Setting Up Your Development Environment

1.  **Fork the repository:** Click the "Fork" button on the top right of the [repository page](https://github.com/yan-gurevich-mc14/grixprotocol).
2.  **Clone your fork:**
    ```bash
    git clone https://github.com/YOUR_USERNAME/grixprotocol.git
    cd grixprotocol/interface
    ```
3.  **Install dependencies:** This project uses `pnpm` for package management.
    ```bash
    pnpm install
    ```
4.  **Run the development server:**
    ```bash
    pnpm dev
    ```
    This will start the Vite development server, available at `http://localhost:5173`.

### Contribution Workflow

1.  **Find an Issue:** propose your own idea by creating a new issue. Discuss your plan with the maintainers before starting significant work.
2.  **Create a Branch:** Create a descriptive branch from `main`.
    ```bash
    git checkout -b feature/your-feature-name # or fix/your-bug-fix-name
    ```
3.  **Make Changes:** Write your code, documentation, or tests.
4.  **Ensure Code Quality:**
    *   **Linting & Formatting:** Run the linters and formatters to ensure your code adheres to the project's style guide.
        ```bash
        pnpm lint:fix
        pnpm prettier:fix
        ```
    *   **Testing:** Add relevant tests for your changes and ensure all tests pass.
        ```bash
        pnpm test       # Run unit tests (Jest)
        pnpm playwright # Run E2E tests (Playwright) - see package.json for more options
        ```
5.  **Commit Changes:** Use clear and descriptive commit messages. Consider following the [Conventional Commits](https://www.conventionalcommits.org/) specification.
    ```bash
    git add .
    git commit -m "feat: Add awesome new feature"
    ```
6.  **Push Changes:** Push your branch to your fork.
    ```bash
    git push origin feature/your-feature-name
    ```
7.  **Open a Pull Request (PR):** Go to the original repository on GitHub and open a Pull Request from your branch to the `main` branch.
    *   Provide a clear title and description for your PR.
    *   Link any relevant issues (e.g., `Closes #123`).
    *   Ensure all checks (like CI tests) pass.

## Coding Standards

*   **Style:** We use Prettier for code formatting and ESLint for linting. Please run `pnpm format` before committing your changes.
*   **Types:** This project uses TypeScript. Leverage static typing to improve code quality and maintainability.

## Testing

*   **Unit Tests:** Jest is used for unit testing components and utility functions. Place test files (`*.test.ts` or `*.test.tsx`) alongside the code they test or in relevant `__tests__` directories.
*   **End-to-End (E2E) Tests:** Playwright is used for E2E testing user flows. E2E tests are located in the `tests/` directory.

## Pull Request Process

1.  Ensure your code builds (`pnpm build`).
2.  Ensure all linters and formatters pass (`pnpm format`).
3.  Ensure all tests pass (`pnpm test` and `pnpm playwright`).
4.  Update the `README.md` or other documentation if your changes affect usage or setup.
5.  Be responsive to feedback and code reviews.

## License

By contributing, you agree that your contributions will be licensed under the [GNU General Public License v3.0](./LICENSE) that covers the project. 