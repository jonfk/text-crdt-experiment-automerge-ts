import React from 'react';
import Automerge from 'automerge';
import prettyBytes from 'pretty-bytes';

import { Editor } from '../types/models';
import { hasUnsyncedChanges } from '../utils/automerge';

type Prop = Editor;

export default ({ draft, doc, lastSyncedDoc }: Prop) => {
  return (
    <>
      <div>
        Current Draft: <pre>{draft}</pre>
      </div>
      <div>
        Saved Text: <pre>{doc.text.toString()}</pre>
      </div>
      <div>
        Text Size: { prettyBytes(new Blob([doc.text.toString()]).size) }
      </div>
      <div>
        CRDT Size: { prettyBytes(new Blob([Automerge.save(doc)]).size) }
      </div>
      <div>
        UnSynced Changes?: { hasUnsyncedChanges({draft, doc, lastSyncedDoc}).toString() }
      </div>
      {/* <pre>{Automerge.save(text)}</pre> */}
    </>
  );
};
