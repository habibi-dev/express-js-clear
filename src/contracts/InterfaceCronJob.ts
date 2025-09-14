export default interface InterfaceCronJob {
    execute(): Promise<void> | void;
}
