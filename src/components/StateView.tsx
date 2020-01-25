import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../types/actions';

const mapState = (state: RootState) => ({
  editor: state.editor
});

const connector = connect(mapState);

type Prop = ConnectedProps<typeof connector>;

const StateView = ({ editor }: Prop) => {
  return (
    <>
      <pre>{JSON.stringify(editor, null, 2)}</pre>
    </>
  );
};

export default connector(StateView);
