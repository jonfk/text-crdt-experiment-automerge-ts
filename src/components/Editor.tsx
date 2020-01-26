import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../types/actions';
import { updateDraftText, saveTextBlock } from '../redux/actions';
import StateView from './StateView';

const mapStateEditor1 = (state: RootState) => ({
  editor: state.editor0
});

const mapStateEditor2 = (state: RootState) => ({
  editor: state.editor1
});

const mapDispatch = {
  updateDraftText,
  saveTextBlock
};

const connectorEditor1 = connect(mapStateEditor1, mapDispatch);
const connectorEditor2 = connect(mapStateEditor2, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connectorEditor1>;

interface Props extends PropsFromRedux {}

const Editor = (editorId: number) => ({
  editor,
  updateDraftText,
  saveTextBlock
}: Props) => {
  return (
    <>
      <textarea
        rows={10}
        cols={40}
        onChange={e => updateDraftText(editorId, e.target.value)}
      >
        {editor.text.text.toString()}
      </textarea>
      <button onClick={() => saveTextBlock(editorId, editor.draft)}>
        Save
      </button>
      <StateView id={editor.id} draft={editor.draft} text={editor.text} />
    </>
  );
};

export const Editor1 = connectorEditor1(Editor(0));
export const Editor2 = connectorEditor2(Editor(1));
