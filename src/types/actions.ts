import rootReducer from '../redux/reducers';

export const SAVE_TEXT = 'SAVE_TEXT';
interface SaveTextAction {
  type: typeof SAVE_TEXT,
  payload: {
    id: string,
    text: string,
  }
};
export type EditorActionTypes = SaveTextAction;
export type RootState = ReturnType<typeof rootReducer>;