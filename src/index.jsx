import React from 'react';
import { render } from 'react-dom';
import { Router } from "react-router";
import {BaseProvider, LightTheme} from 'baseui';
import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import { createBrowserHistory } from "history";

import App from './App';

const engine = new Styletron();
const history = createBrowserHistory();

render(
	<Router history={history}>
        <StyletronProvider value={engine}>
            <BaseProvider theme={LightTheme}>
                <App />
            </BaseProvider>
        </StyletronProvider>
    </Router>, 
	document.getElementById('root'));
