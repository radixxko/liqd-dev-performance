const PERF = require('../lib/performance.js');

PERF(
{
    'RAND': () =>
    {
        return Math.random();
    },
    'RAND * RAND': () =>
    {
        return Math.random() * Math.random();
    },
    'RAND, RAND': () =>
    {
        return Math.random(), Math.random();
    }
});
