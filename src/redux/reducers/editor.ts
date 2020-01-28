import { Editor } from '../../types/models';
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
  merge
} from '../../utils/automerge';

export type EditorsState = Record<EditorId, Editor>;

const initDoc = initDocWithText('editor-0', '');
const initDoc2 = initDocWithText('editor-1', '');
const initialState: EditorsState = {
  0: {
    doc: initDoc,
    draft: initDoc.text.toString(),
    lastSyncedDoc: initDoc,
  },
  1: {
    doc: initDoc2,
    draft: initDoc2.text.toString(),
    lastSyncedDoc: initDoc2,
  }
};

export const editorsReducer = (
  state: EditorsState = initialState,
  action: EditorActionTypes
) => {
  switch (action.type) {
    case SAVE_TEXT:
      const editorState = state[action.editorId];
      const newTextDoc = changeTextDoc(editorState.doc, action.payload.text);
      const newEditorState = {
        ...editorState,
        doc: newTextDoc
      };
      return {
        ...state,
        [action.editorId]: newEditorState
      };
    case UPDATE_DRAFT_TEXT:
      console.log(action.payload.text);
      return {
        ...state,
        [action.editorId]: {
          ...state[action.editorId],
          draft: action.payload.text
        }
      };
    case SYNC_TEXT:
      const editorFrom = state[action.from];
      const editorTo = state[action.to];
      console.log('syncing');
      console.log(editorFrom);
      console.log(editorTo);
      // const changes = getChanges(editorFrom);
      // console.log(changes);
      // const newEditorTo = applyChanges(editorTo, changes);
      const newDoc = merge(editorFrom.doc, editorTo.doc);
      const newEditorTo = {
        ...editorTo,
        doc: newDoc,
        draft: newDoc.text.toString(),
      };
      console.log(newEditorTo);
      const newEditorFrom = {
        ...editorFrom,
        lastSyncedDoc: editorFrom.doc
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
