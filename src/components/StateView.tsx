import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Automerge from 'automerge';

import { RootState } from '../types/actions';

const mapState = (state: RootState) => ({
  editor: state.editor
});

const connector = connect(mapState);

type Prop = ConnectedProps<typeof connector>;

const StateView = ({ editor }: Prop) => {
    console.log(editor);
  return (
    <>
      <pre>{JSON.stringify(editor.draft, null, 2)}</pre>
      <pre>{editor.text.text.toString()}</pre>
      <pre>{Automerge.save(editor.text)}</pre>
    </>
  );
};

export default connector(StateView);
