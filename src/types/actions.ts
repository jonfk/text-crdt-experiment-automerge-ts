import rootReducer from '../redux/reducers';

export const SAVE_TEXT = 'SAVE_TEXT';
export const UPDATE_DRAFT_TEXT = 'UPDATE_DRAFT_TEXT';
export const SYNC_TEXT = 'SYNC_TEXT';

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

interface SyncTextAction {
  type: typeof SYNC_TEXT;
  from: EditorId;
  to: EditorId;
}

export type EditorActionTypes = SaveTextAction | UpdateDraftTextAction | SyncTextAction;
export type RootState = ReturnType<typeof rootReducer>;
