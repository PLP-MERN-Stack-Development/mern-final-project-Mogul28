import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

// Mock the API module
vi.mock('../utils/api', () => ({
  authAPI: {
    isAuthenticated: () => false,
    getCurrentUser: () => null
  }
}));

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen).toBeDefined();
  });
});

