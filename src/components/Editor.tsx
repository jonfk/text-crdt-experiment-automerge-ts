import React from 'react';
import SaveButton from './SaveButton';

const Editor: React.FC = () => {
  return (
    <>
      <textarea rows={10} cols={40}></textarea>
      <SaveButton />
    </>
  );
};

export default Editor;
