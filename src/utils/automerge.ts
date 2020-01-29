// Adapted from https://lorefnon.tech/2018/09/23/using-google-diff-match-patch-with-automerge-text/

import DiffMatchPatch from 'diff-match-patch';
import Automerge from 'automerge';

import { TextDoc, Editor } from '../types/models';

export const changeTextDoc = (
  doc: Automerge.Doc<TextDoc>,
  updatedText: string
): Automerge.Doc<TextDoc> => {
  const dmp = new DiffMatchPatch.diff_match_patch();

  // Compute the diff:
  const diff = dmp.diff_main(doc.text.toString(), updatedText);
  // diff is simply an array of binary tuples representing the change
  // [[-1,"The ang"],[1,"Lucif"],[0,"e"],[-1,"l"],[1,"r"],[0," shall "],[-1,"fall"],[1,"rise"]]

  // This cleans up the diff so that the diff is more human friendly.
  dmp.diff_cleanupSemantic(diff);
  // [[-1,"The angel"],[1,"Lucifer"],[0," shall "],[-1,"fall"],[1,"rise"]]

  const patches = dmp.patch_make(doc.text.toString(), diff);
  //console.log(patches);

  // A patch object wraps the diffs along with some change metadata:
  //
  // [{
  //   "diffs":[[-1,"The angel"],[1,"Lucifer"],[0," shall "],[-1,"fall"], [1,"rise"]],
  //   "start1":0,
  //   "start2":0,
  //   "length1":20,
  //   "length2":18
  // }]

  // We can use the patch to derive the changedText from the sourceText
  //console.log(dmp.patch_apply(patches, doc.text.toString())[0]); // "Lucifer shall rise"

  // Now we translate these patches to operations against Automerge.Text instance:
  let newDoc = Automerge.change(doc, doc1 => {
    patches.forEach(patch => {
      let idx = patch.start1;
      if (idx !== null) {
        patch.diffs.forEach(([operation, changeText]) => {
          switch (operation) {
            case 1: // Insertion
              doc1.text.insertAt?.bind(doc1.text)!(
                idx!,
                ...changeText.split('')
              );
              idx! += changeText.length;
              break;
            case 0: // No Change
              idx! += changeText.length;
              break;
            case -1: // Deletion
              for (let i = 0; i < changeText.length; i++) {
                doc1.text.deleteAt!(idx!);
              }
              break;
          }
        });
      }
    });
  });
  return newDoc;
};

export function initDocWithText(
  actorId: string,
  text: string
): Automerge.Doc<TextDoc> {
  return Automerge.change(Automerge.init<TextDoc>(actorId), doc => {
    doc.text = new Automerge.Text(text);
    return doc.text.insertAt?.bind(doc.text)!(0, ...text.split(''));
  });
}

export function copyDoc<T>(doc: Automerge.Doc<T>): Automerge.Doc<T> {
  return Automerge.load(Automerge.save(doc));
}

export function getChanges(textBlock: Editor): Automerge.Change[] {
  return Automerge.getChanges(textBlock.lastSyncedDoc, textBlock.doc);
}

export function applyChanges(
  textBlock: Editor,
  changes: Automerge.Change[]
): Editor {
  const newDoc = Automerge.applyChanges(textBlock.doc, changes);
  return {
    ...textBlock,
    doc: newDoc,
    draft: newDoc.text.toString()
  };
}

export function hasUnsyncedChanges<T>(
  lastSyncedDoc: Automerge.Doc<T>,
  currentDoc: Automerge.Doc<T>
): boolean {
  return Automerge.getChanges(lastSyncedDoc, currentDoc).length > 0;
}

export function getConflicts(doc: Automerge.Doc<TextDoc>): any {
  return Automerge.getConflicts(doc, 'text');
}

export function merge(
  doc1: Automerge.Doc<TextDoc>,
  doc2: Automerge.Doc<TextDoc>
): Automerge.Doc<TextDoc> {
  return Automerge.merge(doc1, doc2);
}
