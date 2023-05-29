import './styles.css';

import ReactDOM from 'react-dom/client';

import { App } from './App';

const div = document.createElement('div');

document.body.append(div);

const root = ReactDOM.createRoot(div);

root.render(<App />);
