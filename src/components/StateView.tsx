import React from 'react';
import Automerge from 'automerge';
import prettyBytes from 'pretty-bytes';

import { Editor } from '../types/models';
import { hasUnsyncedChanges, getConflicts } from '../utils/automerge';

type Prop = Editor;

export default ({ draft, doc, lastSyncedDoc }: Prop) => {
  return (
    <div>
      {/* <span>
        Current Draft: <pre>{draft}</pre>
      </span>
      <br/>
      <span>
        Saved Text: <pre>{doc.text.toString()}</pre>
      </span> */}
      <br />
      <span>
        Text Size: {prettyBytes(new Blob([doc.text.toString()]).size)}
      </span>
      <br />
      <span>
        CRDT Size: {prettyBytes(new Blob([Automerge.save(doc)]).size)}
      </span>
      <br />
      <span>
        UnSynced Changes?:{' '}
        {hasUnsyncedChanges({ draft, doc, lastSyncedDoc }).toString()}
      </span>
      <br />
      <span>
        Conflicts: {JSON.stringify(getConflicts({ draft, doc, lastSyncedDoc }))}
      </span>
      {/* <pre>{Automerge.save(text)}</pre> */}
    </div>
  );
};
