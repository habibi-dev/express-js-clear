import serverConfig from './serverConfig';
import dotenv from "dotenv";
import pkg from "lodash";

dotenv.config()

const {server, app} = serverConfig();

const port = pkg.get(process, "env.PORT", 3000) as number
const domain = pkg.get(process, "env.DOMAIN", "localhost")

if (domain !== 'localhost') {
    server.listen(port, domain, () => {
        console.log('Is Running! 🙂😍😋');
    });
} else {
    app.listen(port, () => {
        console.log('Is Running Developer Mod! 🙂');
    });
}