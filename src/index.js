import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider, createClient, subscriptionExchange, defaultExchanges } from 'urql';
import { SubscriptionClient } from 'subscriptions-transport-ws';

import 'bootstrap/dist/css/bootstrap.min.css';

const subscriptionClient = new SubscriptionClient('wss://react.eogresources.com/graphql', { reconnect: true });

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: operation => subscriptionClient.request(operation),
    }),
  ],
});   

ReactDOM.render(
  <Provider value={client}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
