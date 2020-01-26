import rootReducer from '../redux/reducers';

export const SAVE_TEXT = 'SAVE_TEXT';
export const UPDATE_DRAFT_TEXT = 'UPDATE_DRAFT_TEXT';

interface SaveTextAction {
  type: typeof SAVE_TEXT;
  editorId: number;
  payload: {
    text: string;
  };
}

interface UpdateDraftTextAction {
  type: typeof UPDATE_DRAFT_TEXT;
  editorId: number;
  payload: {
    text: string;
  };
}

export type EditorActionTypes = SaveTextAction | UpdateDraftTextAction;
export type RootState = ReturnType<typeof rootReducer>;
