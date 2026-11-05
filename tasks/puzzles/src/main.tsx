import { createRoot } from 'react-dom/client';
import { installConsoleCapture } from './playground/console-store';
import { Playground } from './playground/playground';
import './styles.css';

installConsoleCapture();

createRoot(document.getElementById('root')!).render(<Playground />);
