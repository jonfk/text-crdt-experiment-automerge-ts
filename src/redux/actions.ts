import cuid from 'cuid';

import { SAVE_TEXT, EditorActionTypes } from '../types/actions';

export function saveTextBlock(id: string, text: string): EditorActionTypes {
  return {
    type: SAVE_TEXT,
    payload: {
      id: id,
      text: text,
    }
  }
};