import { Editor, TextDoc } from '../../types/models';
import {
  EditorActionTypes,
  SAVE_TEXT,
  UPDATE_DRAFT_TEXT,
  EditorId,
  SYNC_TEXT
} from '../../types/actions';
import {
  changeTextDoc,
  initDocWithText,
  getChanges,
  applyChanges,
  copyDoc,
  hasUnsyncedChanges
} from '../../utils/automerge';

export type EditorsState = Record<EditorId, Editor>;

const initDoc = initDocWithText('editor-0', '');
const initDoc2 = copyDoc(initDoc);
const initialState: EditorsState = {
  0: {
    doc: initDoc,
    draft: initDoc.text.toString(),
    lastSyncedDoc: initDoc,
    saveTimingMs: 0,
    syncTimingMs: 0
  },
  1: {
    doc: initDoc2,
    draft: initDoc2.text.toString(),
    lastSyncedDoc: initDoc2,
    saveTimingMs: 0,
    syncTimingMs: 0
  }
};

export const editorsReducer = (
  state: EditorsState = initialState,
  action: EditorActionTypes
) => {
  switch (action.type) {
    case SAVE_TEXT:
      const startSave = performance.now();
      const editorState = state[action.editorId];
      const newTextDoc = changeTextDoc(editorState.doc, action.payload.text);
      const endSave = performance.now();
      const newEditorState = {
        ...editorState,
        doc: newTextDoc,
        saveTimingMs: endSave - startSave
      };
      return {
        ...state,
        [action.editorId]: newEditorState
      };
    case UPDATE_DRAFT_TEXT:
      return {
        ...state,
        [action.editorId]: {
          ...state[action.editorId],
          draft: action.payload.text
        }
      };
    case SYNC_TEXT:
      //console.log('syncing');
      const startSync = performance.now();
      const editorFrom = state[action.from];
      const editorTo = state[action.to];
      const changes = getChanges(editorFrom);
      const editorToWithChanges = applyChanges(editorTo, changes);
      const endSync = performance.now();
      const syncTiming = endSync - startSync;

      if (!hasUnsyncedChanges(editorTo.lastSyncedDoc, editorTo.doc)) {
        editorToWithChanges.lastSyncedDoc = editorToWithChanges.doc;
      }

      const newEditorTo = {
        ...editorToWithChanges,
        syncTimingMs: syncTiming
      };
      const newEditorFrom = {
        ...editorFrom,
        lastSyncedDoc: editorFrom.doc,
        syncTimingMs: syncTiming
      };
      return {
        ...state,
        [action.to]: newEditorTo,
        [action.from]: newEditorFrom
      };
    default:
      return state;
  }
};
