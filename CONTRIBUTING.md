# Contributing to Kanon Academy

First off, thank you for considering contributing to Kanon Academy! It's people like you that make Kanon Academy such a great tool.

## Where do I go from here?

If you've noticed a bug or have a question, [search the issue tracker](https://github.com/zaplytic/kanon-academy/issues) to see if someone else has already created a ticket. If not, feel free to create a new one!

## Fork & create a branch

If you're ready to contribute, fork the repository. All development work is done in the `development` branch, so you should create your new branch from `development`. A good branch name would be something like `fix/login-bug` or `feature/new-dashboard-widget`.

## Get the code running

Follow the instructions in the [README.md](README.md) to get the project running on your local machine.

## Make your changes

Make your changes in your branch. Be sure to follow the existing code style and conventions. Add or update tests as appropriate.

## Commit your changes

Commit your changes with a clear and descriptive commit message. We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

### Commit Message Format

In addition to the Conventional Commits standard, we have a preferred format for the commit message body to enhance clarity and traceability.

**Format:**

```
<type>: <subject>

resolves #<issue_number>

- `<file_path>`: <description of change>
- `<file_path>`: <description of change>
```

**Example:**

```
feature: add user authentication endpoint

resolves #42

- `apps/api/src/controllers/auth.controller.ts`: Add login endpoint and request validation.
- `apps/api/src/services/auth.service.ts`: Implement password hashing and JWT generation.
```

## Create a pull request

When you're ready, create a pull request from your fork to the `development` branch of the `zaplytic/kanon-academy` repository. Provide a clear description of the changes you've made.

Once you've submitted your pull request, a team member will review it. We may ask for changes or clarification. Once your pull request is approved, it will be merged into the `development` branch.

Thank you for your contribution!
