import rootReducer from '../redux/reducers';

export const SAVE_TEXT = 'SAVE_TEXT';
export const UPDATE_DRAFT_TEXT = 'UPDATE_DRAFT_TEXT';

export type EditorId = 0 | 1;

interface SaveTextAction {
  type: typeof SAVE_TEXT;
  editorId: EditorId;
  payload: {
    text: string;
  };
}

interface UpdateDraftTextAction {
  type: typeof UPDATE_DRAFT_TEXT;
  editorId: EditorId;
  payload: {
    text: string;
  };
}

export type EditorActionTypes = SaveTextAction | UpdateDraftTextAction;
export type RootState = ReturnType<typeof rootReducer>;
