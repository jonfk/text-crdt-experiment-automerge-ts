import {
  UPDATE_DRAFT_TEXT,
  SAVE_TEXT,
  EditorActionTypes,
  EditorId,
  SYNC_TEXT
} from '../types/actions';

export function saveTextBlock(
  editorId: EditorId,
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
  editorId: EditorId,
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

export function syncText(from: EditorId, to: EditorId) : EditorActionTypes {
  return {
    type: SYNC_TEXT,
    from: from,
    to: to,
  }
}