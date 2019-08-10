const { Pool, Client } = require('pg')
// pools will use environment variables
// for connection information
const query = `
select 
    pp.proname,
    pl.lanname,
    pn.nspname,
    pg_get_functiondef(pp.oid)
from pg_proc pp
inner join pg_namespace pn on (pp.pronamespace = pn.oid)
inner join pg_language pl on (pp.prolang = pl.oid)
where pl.lanname NOT IN ('c','internal') 
  and pn.nspname NOT LIKE 'pg_%'
  and pn.nspname <> 'information_schema';`

const pool = new Pool()
pool.query(query, (err, res) => {
  console.log(err, res)
  pool.end()
})
