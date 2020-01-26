import React from 'react';
//import Automerge from 'automerge';

import { TextBlock } from '../types/models';

type Prop = TextBlock;

export default ({ draft, text }: Prop) => {
  return (
    <>
      <div>
        Current Draft: <pre>{draft}</pre>
      </div>
      <div>
        Saved Text: <pre>{text.text.toString()}</pre>
      </div>
      {/* <pre>{Automerge.save(text)}</pre> */}
    </>
  );
};
