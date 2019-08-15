const ITERATION_DURATION = 0.1 * 1e9, MINIMAL_TEST_DURATION = 10 * 1e9;

function performance( functions, callback )
{
    let pending_functions = Object.keys( functions ).filter( name =>
    {
        let func = functions[name];

        return func.elapsed < MINIMAL_TEST_DURATION * ( name === '__empty' ? 0.25 : 1 );
    });

    if( pending_functions.length )
    {
        let func = functions[pending_functions[Math.floor(Math.random() * pending_functions.length)]],
            exec = func.exec, iterations = func.elapsed ? Math.ceil( ITERATION_DURATION * func.iterations / func.elapsed ) : 10,
            start = process.hrtime();

        for( let i = 0; i < iterations; ++i )
        {
            exec( i );
        }

        let end = process.hrtime( start ), elapsed = end[0] * 1e9 + end[1];

        func.performance.push({ iterations, elapsed });
        func.iterations += iterations;
        func.elapsed += elapsed;

        setImmediate(() => performance( functions, callback ));
    }
    else
    {
        let empty_performance = functions.__empty.iterations / functions.__empty.elapsed;
        delete functions.__empty;

        function op_per_s( func )
        {
            return Math.round( 1e9 * func.iterations / ( func.elapsed - func.iterations / empty_performance ));
        }

        let sorted_functions = Object.keys( functions ).sort(( a, b ) => functions[b].iterations / functions[b].elapsed - functions[a].iterations / functions[a].elapsed );
        let best_function = functions[sorted_functions[0]];

        for( let name of sorted_functions )
        {
            let func = functions[name];

            console.log( name + ' ' + op_per_s( func ).toLocaleString() + ' op/s' + ( func !== best_function ? ' (' + (( 1 - op_per_s( func ) / op_per_s( best_function )) * 100 ).toFixed(2) + '% slower)': '' ));
            //console.log( test.func.toString().trim().split(/\n/).slice(1) );
        }
    }
}

module.exports = function( functions, callback )
{
    let stats = {};

    stats.__empty = { exec: () => undefined, iterations: 0, elapsed: 0, performance: [] };

    for( let name in functions )
    {
        stats[name] = { exec: functions[name], iterations: 0, elapsed: 0, performance: [] };
    }

    setImmediate(() => performance( stats, callback ));
}
