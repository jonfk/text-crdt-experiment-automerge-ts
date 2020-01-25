import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../types/actions';
import { updateDraftText, saveTextBlock } from '../redux/actions';

const mapState = (state: RootState) => ({
  editor: state.editor
});

const mapDispatch = {
  updateDraftText,
  saveTextBlock
};

const connector = connect(mapState, mapDispatch);

type Prop = ConnectedProps<typeof connector>;

const Editor = ({ editor, updateDraftText, saveTextBlock }: Prop) => {
  return (
    <>
      <textarea
        rows={10}
        cols={40}
        onChange={e => updateDraftText(e.target.value)}
      >
        {editor.text}
      </textarea>
      <button onClick={() => saveTextBlock(editor.id, editor.draft)}>
        Save
      </button>
    </>
  );
};

export default connector(Editor);
