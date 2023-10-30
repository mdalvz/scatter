import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './component/App';

(function main() {
  // Create a container alongside other content
  const rootElement = createRootElement();
  // Add it to the body
  document.body.appendChild(rootElement);
  // Make it a React container
  const root = createRoot(rootElement);
  // Start the app
  root.render(<App/>);
})();

function createRootElement() {
  const rootElement = document.createElement('div');
  rootElement.style.display = 'flex';
  rootElement.style.flexDirection = 'column';
  rootElement.style.width = '100vw';
  rootElement.style.height = '100vh';
  rootElement.style.left = '0';
  rootElement.style.top = '0';
  rootElement.style.position = 'fixed';
  rootElement.style.zIndex = '9999';
  rootElement.style.pointerEvents = 'none';
  rootElement.style.backgroundColor = 'transparent';
  return rootElement;
}
