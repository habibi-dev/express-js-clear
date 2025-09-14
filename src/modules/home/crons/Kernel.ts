import InterfaceCronDefinition from "../../../contracts/InterfaceCronDefinition";
import ClearingTmp from "./jobs/ClearingTmp";

const kernel: InterfaceCronDefinition[] = [
    {
        schedule: "* * * * *",
        job: new ClearingTmp()
    }
];

export default kernel;
