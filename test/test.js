const PERF = require('../lib/performance.js');

PERF(
{
    'prvy': () =>
    {
        return Math.random();
    },
    'druhy': () =>
    {
        return Math.random() * Math.random();
    },
    'treti': () =>
    {
        return Math.random(), Math.random();
    }
});
