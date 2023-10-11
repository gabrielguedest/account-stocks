export class Transaction {
  commit: () => Promise<void>;
  rollback: () => Promise<void>;
  raw: any;

  constructor(
    commit: () => Promise<void>,
    rollback: () => Promise<void>,
    transaction: any,
  ) {
    this.commit = commit;
    this.rollback = rollback;
    this.raw = transaction;
  }
}
