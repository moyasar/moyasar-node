import Moyasar from './moyasar';
import repl from 'babel-repl';

repl.start({
    prompt: "Moyasar>> ",
    useColor: true,
    terminal: true,
    useGlobal: true
}).context.Moyasar = Moyasar;
