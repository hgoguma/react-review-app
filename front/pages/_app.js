import React from 'react';
import AppLayout from '../component/AppLayout';
import Head from 'next/head';
import withRedux from 'next-redux-wrapper';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import PropTypes from 'prop-types';
import reducer from '../reducers';
import rootSaga from '../saga';

const MovieApp = ({ Component, store }) => {
    return (
        <Provider store={store}>
            <Head>
                <title>Movie App</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.0.2/antd.css" />
                <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/4.0.2/antd.js" />
            </Head>
            <AppLayout>
                <Component />
            </AppLayout>
        </Provider>
        )
}

MovieApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    store: PropTypes.object.isRequired,
}

MovieApp.getInitialProps = async (context) => {
    const { ctx } = context;
    let pageProps = {};
    if(context.Component.getInitialProps) {
        pageProps = await context.Component.getInitialProps(ctx);
    }
    return { pageProps };
};

const configureStore = (initialState, options) => {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    const enhancer = process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares))
      : compose(
        applyMiddleware(...middlewares),
        !options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
      );
    const store = createStore(reducer, initialState, enhancer);
    sagaMiddleware.run(rootSaga);
    return store;
};
  

export default withRedux(configureStore)(MovieApp); //컴포넌트를 감싸주면 고차 컴포넌트