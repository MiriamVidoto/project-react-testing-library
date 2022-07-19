import { render } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import React from 'react';

function renderWithRouter(component) {
  const history = createMemoryHistory();
  const returnFromRender = render(
    <Router history={ history }>{ component }</Router>,
  );

  return { history, ...returnFromRender };
}

export default renderWithRouter;
