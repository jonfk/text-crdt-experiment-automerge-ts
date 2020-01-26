import {
  UPDATE_DRAFT_TEXT,
  SAVE_TEXT,
  EditorActionTypes
} from '../types/actions';

export function saveTextBlock(
  editorId: number,
  text: string
): EditorActionTypes {
  return {
    type: SAVE_TEXT,
    editorId: editorId,
    payload: {
      text: text
    }
  };
}

export function updateDraftText(
  editorId: number,
  text: string
): EditorActionTypes {
  return {
    type: UPDATE_DRAFT_TEXT,
    editorId: editorId,
    payload: {
      text: text
    }
  };
}
