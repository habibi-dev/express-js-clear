import InterfaceCronJob from "./InterfaceCronJob";

export default interface InterfaceCronDefinition {
    schedule: string;
    job: InterfaceCronJob;
}
