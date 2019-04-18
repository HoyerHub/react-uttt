/* eslint-disable */
import UCT from './UCT';
import State from '../State';

if (typeof importScripts !== 'undefined'){
    addEventListener('message', event => {//eslint-disable-line
        let uct = new UCT();
        let state = new State(JSON.parse(event.data));
        let result = uct.run(state);
        postMessage(result);
    });
}
