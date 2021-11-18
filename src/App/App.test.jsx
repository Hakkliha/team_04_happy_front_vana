import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

it('renders NAV', () => {
    render(<App />);
    expect(screen.getByText('Owners'));
});