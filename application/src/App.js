import React, { Component }         from 'react';
import { Provider }                 from 'react-redux';
import AppRouter                    from './router/appRouter';
import store                        from './redux/store';
import                              './App.css';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <AppRouter />
            </Provider>
        )
    }
}

export default App;
