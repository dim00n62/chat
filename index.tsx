import { createRoot } from 'react-dom/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import App from './src/components/App';

import classes from './styles.module.css';

// Clear the existing HTML content
document.body.innerHTML = `<div id="app" class=${classes.root}></div>`;

// Render your React component instead
const root = createRoot(document.getElementById('app'));
root.render(<App/>);