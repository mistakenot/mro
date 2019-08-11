create or replace function take_int_return_int(val int) returns int language plpgsql as $$ 
begin
    return val;
end; $$;

create or replace function add_two_ints(a int, b int) returns int language plpgsql as $$ 
begin
    return a + b;
end; $$;

create or replace function concat_two_text_strings(a text, b text) returns text language plpgsql as $$
begin
    return a || b;
end; $$;

create or replace function concat_two_varchar_strings(a varchar, b varchar) returns varchar language plpgsql as $$
begin
    return a || b;
end; $$;

create or replace function and_two_booleans(a boolean, b boolean) returns boolean language plpgsql as $$
begin
    return a and b;
end; $$;

create or replace function concat_two_int_arrays_returns_int_array(a int[], b int[]) returns int[] language plpgsql as $$
begin
    return a || b;
end; $$;

create or replace function concat_two_int_arrays_returns_int_set(a int[], b int[]) returns table(i int) language plpgsql as $$
begin
    return query (select * from unnest(a || b) i);
end; $$;

create or replace function create_and_return_employee(_id int, _firstName text, _secondName text, _dob timestamp) returns table(id int, firstname text, secondname text, fullname text, dob timestamp) language plpgsql as $$
begin
    return query (values (_id, _firstName, _secondName, _firstname || _secondname, _dob));
end; $$;