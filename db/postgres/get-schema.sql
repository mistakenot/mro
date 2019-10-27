select 
    pn.nspname as schema,
    pp.proname as name,
    pp.prorettype as returnType,
    pp.proallargtypes as allReturnTypes,
    pp.proretset as returnsSet,
    pp.pronargs as numberOfArgs,
    pp.proargtypes as argTypes,
    pp.proargnames as argNames
from pg_proc pp
inner join pg_namespace pn on (pp.pronamespace = pn.oid)
inner join pg_language pl on (pp.prolang = pl.oid)
where pl.lanname NOT IN ('c','internal') 
  and pn.nspname NOT LIKE 'pg_%'
  and pn.nspname <> 'information_schema';