import { createRoot } from 'react-dom/client';
import { App } from 'src/components/App';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Not found root id');
}

const root = createRoot(container);
root.render(<App />);
