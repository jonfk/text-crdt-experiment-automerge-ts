import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState, EditorId } from '../types/actions';
import { updateDraftText, saveTextBlock, syncText } from '../redux/actions';
import StateView from './StateView';
import { hasUnsyncedChanges } from '../utils/automerge';

const mapStateEditor1 = (state: RootState) => ({
  editor: state.editors[0]
});

const mapStateEditor2 = (state: RootState) => ({
  editor: state.editors[1]
});

const mapDispatch = {
  updateDraftText,
  saveTextBlock,
  syncText
};

const connectorEditor1 = connect(mapStateEditor1, mapDispatch);
const connectorEditor2 = connect(mapStateEditor2, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connectorEditor1>;

interface Props extends PropsFromRedux {}

const Editor = (editorId: EditorId, otherEditorId: EditorId) => ({
  editor,
  updateDraftText,
  saveTextBlock,
  syncText
}: Props) => {
  const hasUnSyncedChanges: boolean = hasUnsyncedChanges(editor);
  return (
    <div>
      <h2>Editor {editorId}</h2>
      <textarea
        rows={10}
        cols={40}
        onChange={e => updateDraftText(editorId, e.target.value)}
        value={editor.draft}
      ></textarea>
      <br />
      <button onClick={() => saveTextBlock(editorId, editor.draft)}>
        Save
      </button>
      <button
        onClick={() => syncText(editorId, otherEditorId)}
        disabled={!hasUnSyncedChanges}
      >
        Sync to other editor
      </button>
      <StateView
        draft={editor.draft}
        doc={editor.doc}
        lastSyncedDoc={editor.lastSyncedDoc}
      />
    </div>
  );
};

export const Editor1 = connectorEditor1(Editor(0, 1));
export const Editor2 = connectorEditor2(Editor(1, 0));
