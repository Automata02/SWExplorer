/**
 * @format
 */
import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

// Mock the navigation since we don't want to test react-navigation's internals
jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: () => ({
    Navigator: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    Screen: () => null,
  }),
}));

describe('App', () => {
  it('renders without crashing', () => {
    const renderResult = render(<App />);
    expect(renderResult).toBeTruthy();
  });
});
