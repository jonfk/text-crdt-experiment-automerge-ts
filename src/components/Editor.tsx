import React from 'react';
import { connect } from 'react-redux';

import SaveButton from './SaveButton';

import { RootState } from '../types/actions';

const mapState = (state: RootState) => ({
  editor: state.editor,
});

type Prop = ReturnType<typeof mapState>;

const Editor = ({ editor }: Prop) => {
  return (
    <>
      <textarea rows={10} cols={40}>
        { editor.text }
      </textarea>
      <SaveButton />
    </>
  );
};

export default connect(mapState)(Editor);
