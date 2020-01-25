import { createStore } from 'redux';
import rootReducer from './reducers';

export type RootState = ReturnType<typeof rootReducer>;
export default createStore(rootReducer);
