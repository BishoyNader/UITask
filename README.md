# UI Automation Project with Playwright

This project focuses on automating a web application using Playwright and TypeScript. The primary goal is to interact with elements on the page, such as adding, editing, and deleting items, and verifying that actions have resulted in expected changes.

## Table of Contents

- [Installation](#installation)
- [Running the Tests](#running-the-tests)
- [Project Structure](#project-structure)
- [Test Cases](#test-cases)
- [Helpers](#helpers)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ui-automation-project.git

2. **Navigate to the project directory**
   ```bash

    cd ui-automation-project
3. **Install dependencies**
   ```bash

    npm install
4. **Running the Tests**
    Execute the following command to run the tests:

   ```bash
    npx playwright test
5. **Project Structure**

    .
    ├── pages
    │   ├── AddItemPage.ts
    │   ├── MainPage.ts
    ├── tests
    │   ├── addItem.spec.ts
    ├── playwright.config.ts
    └── README.md
    pages/AddItemPage.ts: Contains helper functions for interacting with the add item elements.

    pages/MainPage.ts: Contains helper functions for interacting with the main page elements.

    tests/addItem.spec.ts: Contains test cases to interact with adding, editing, and deleting items.

    playwright.config.ts: Playwright configuration file.

    README.md: Project documentation.
6. **Test Cases**
    Add, Edit, Delete Item
    addItem.spec.ts:

    Interacts with elements to add, edit, and delete items, verifying the expected outcomes.
7. **Helpers**
    Helper functions are defined in AddItemPage.ts and MainPage.ts:

    AddItemPage: Contains locators and actions for adding items.

    MainPage: Contains locators and actions for the main page interactions.

8. **Contributing**
    Contributions are welcome! Please follow these steps:

        Fork the repository.

        Create a new branch (git checkout -b feature-branch).

        Make your changes.

        Commit your changes (git commit -m 'Add new feature').

        Push to the branch (git push origin feature-branch).

        Open a pull request.

9. **License**
    This project is licensed under the MIT License.