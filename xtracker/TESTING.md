# Testing Guide

## Overview

XTracker includes comprehensive test suites for both backend and frontend with a target coverage of 70%+.

## Backend Testing

### Test Framework

- **Jest** - Testing framework
- **Supertest** - HTTP assertion library
- **MongoDB Memory Server** (optional) - In-memory MongoDB for testing

### Running Tests

```bash
cd backend
npm test
```

### Running Tests with Coverage

```bash
cd backend
npm run test:coverage
```

### Test Structure

Tests are located in `backend/__tests__/`:

- `auth.test.js` - Authentication tests
- `expenses.test.js` - Expense CRUD tests

### Writing Tests

Example test structure:

```javascript
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';

describe('Feature Name', () => {
  beforeAll(async () => {
    // Setup before all tests
  });

  afterAll(async () => {
    // Cleanup after all tests
  });

  it('should do something', async () => {
    // Test implementation
    expect(result).toBe(expected);
  });
});
```

### Test Coverage

Target coverage:
- Branches: 70%
- Functions: 70%
- Lines: 70%
- Statements: 70%

## Frontend Testing

### Test Framework

- **Vitest** - Testing framework
- **React Testing Library** - Component testing
- **@testing-library/jest-dom** - DOM matchers

### Running Tests

```bash
cd frontend
npm test
```

### Running Tests in Watch Mode

```bash
cd frontend
npm run test:watch
```

### Running Tests with Coverage

```bash
cd frontend
npm run test:coverage
```

### Test Structure

Tests are located in `frontend/src/__tests__/`:

- `App.test.jsx` - Main app component tests
- `setup.js` - Test setup configuration

### Writing Tests

Example test structure:

```javascript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Component from '../Component';

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

## CI/CD Testing

Tests run automatically on:

- Push to main/develop branches
- Pull requests
- Before deployment

## Best Practices

1. **Write Tests First**: Consider TDD approach
2. **Test Edge Cases**: Include error scenarios
3. **Mock External Dependencies**: Mock API calls and external services
4. **Keep Tests Fast**: Avoid slow operations
5. **Maintain Coverage**: Aim for 70%+ coverage
6. **Test User Interactions**: Test what users actually do
7. **Clean Up**: Reset state between tests

## Common Test Scenarios

### Backend

- Authentication (signup, login)
- CRUD operations
- Authorization (user isolation)
- Input validation
- Error handling

### Frontend

- Component rendering
- User interactions
- Form submissions
- API integration
- Error states
- Loading states

## Troubleshooting

### Tests Failing Locally

1. Ensure MongoDB is running (for backend tests)
2. Check environment variables
3. Clear node_modules and reinstall
4. Check test database connection

### Coverage Issues

1. Review coverage report
2. Add tests for uncovered code
3. Exclude unnecessary files in coverage config

