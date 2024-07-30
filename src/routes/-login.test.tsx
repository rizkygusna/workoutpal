import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@/tests/test-utils';
import AuthenticationPage from './login';

describe('AuthentificationPage Component', () => {
  render(<AuthenticationPage />);

  it('should render `Login` text', () => {
    const heading1 = screen.getByRole('heading', { level: 1 });
    expect(heading1).toHaveTextContent('Login');
  });
});
