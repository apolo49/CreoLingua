export interface Word {
  autoDeclOverride: string;
  conWord: string;
  definition: string;
  localWord: string;
  pronunciation: string;
  wordClassCollection: {
    wordClassification: string;
  };
  wordClassTextValueCollection: object;
  wordEtymologyNotes: object;
  wordId: number;
  wordProcOverride: string;
  wordRuleOverride: string;
  wordTypeId: number;
}
