interface DialogueProp {
  styles: {
    readonly [key: string]: string;
  };
  hideDialogue: () => void;
  logState: {
    isVisible: boolean;
    logMessage: string;
  };
}
export default function Dialogue({
  styles,
  hideDialogue,
  logState,
}: DialogueProp) {
  return (
    <div
      className={styles.dialogueWrapper}
      id={logState.isVisible ? styles.active : ""}
    >
      <div className={styles.dialogue}>
        <div className={styles.dialogueHeader}>
          <h3>Unauthroized Access</h3>
        </div>
        <div className={styles.dialogueCenter}>
          <p>{logState.logMessage}</p>
        </div>
        <div className={styles.dialogueButtons}>
          <button id={styles.cancel} onClick={hideDialogue}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
