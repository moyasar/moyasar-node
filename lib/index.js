import Moyasar from './moyasar';
import repl from 'babel-repl';

if (process.argv.length > 2 && process.argv[2] == "shell"){
    repl.start({
        prompt: "Moyasar>> ",
        useColor: true,
        terminal: true,
        useGlobal: true
    }).context.Moyasar = Moyasar;
}
