import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/auth.reducers';
import uiReducer from './reducers/ui.reducers';
import postReducer from './reducers/post.reducers';
import {loadState, saveState} from '../services/localStorage.service'
const middleware = [thunk];

declare global {
    interface Window {
        REDUX_DEVTOOLS_EXTENSION_COMPOSE?: typeof compose;
    }
}

const reducer = combineReducers({
    auth: authReducer,
    UI: uiReducer,
    post: postReducer
});

const persistedState = loadState();

const store = createStore(
    reducer,
    persistedState,
    compose(applyMiddleware(...middleware),
    (window.REDUX_DEVTOOLS_EXTENSION_COMPOSE  || compose) as any
    ),
);

store.subscribe(() => {
    saveState({
        post: {
            posts: store.getState().post.posts,
            selectedPosts: store.getState().post.selectedPosts,
        }
    });
});


export default store;
