const PERF = require('../../lib/performance.js');

const ARRAY = [];

for( let i = 0; i < 100; ++i )
{
    ARRAY.push( i );
}

PERF(
{
    'for ++i': () =>
    {
        for( let item, i = 0; i < ARRAY.length; ++i )
        {
            item = ARRAY[i];
        }
    },
    'for i++': () =>
    {
        for( let item, i = 0; i < ARRAY.length; i++ )
        {
            item = ARRAY[i];
        }
    },
    'for of': () =>
    {
        for( let item of ARRAY );
    }
});
