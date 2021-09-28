import { render } from '@testing-library/react';
import { ApolloProvider } from '@apollo/client';
import client from 'apollo/client';

const renderWithContext = (ui, options) =>
	render(ui, { wrapper: <ApolloProvider client={client} />, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { renderWithContext as render };
