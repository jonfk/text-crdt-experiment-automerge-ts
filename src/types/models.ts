import Automerge from 'automerge';

export type TextDoc = {
  text: Automerge.Text;
};

export type Editor = {
  doc: Automerge.Doc<TextDoc>;
  draft: string;
  lastSyncedDoc: Automerge.Doc<TextDoc>;
};
