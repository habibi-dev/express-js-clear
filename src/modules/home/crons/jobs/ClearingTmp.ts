import InterfaceCronJob from "../../../../contracts/InterfaceCronJob";

export default class ClearingTmp implements InterfaceCronJob {
    public async execute(): Promise<void> {
        try {
            // Implement temp directory cleanup logic here
            console.log("Clearing tmp directory...");
        } catch (error) {
            console.error(error);
        }
    }
}
