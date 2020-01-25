import Automerge from 'automerge';

export type TextDoc = {
  text: Automerge.Text;
};

export function initTextDoc(): Automerge.Doc<TextDoc> {
  return Automerge.change(
    Automerge.init<TextDoc>(),
    doc => (doc.text = new Automerge.Text())
  );
}

export type TextBlock = {
  id: string;
  text: Automerge.Doc<TextDoc>;
  draft: string;
};
