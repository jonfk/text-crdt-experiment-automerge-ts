import Automerge from 'automerge';

export type TextDoc = {
  text: Automerge.Text;
};

export type TextBlock = {
  id: string;
  text: Automerge.Doc<TextDoc>;
  draft: string;
};
