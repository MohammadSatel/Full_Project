import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';


// Unit test for the App component
test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

// Assert that the text matching the regex /learn/i is present in the document
  expect(getByText(/learn/i)).toBeInTheDocument();
});
