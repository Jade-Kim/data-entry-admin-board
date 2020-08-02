import './index-6b8c719e.js';
import { A as ActiveRouter } from './active-router-0c1a0411.js';
import './match-path-760e1797.js';
import './location-utils-fea12957.js';

function injectHistory(Component) {
    ActiveRouter.injectProps(Component, ['history', 'location']);
}
