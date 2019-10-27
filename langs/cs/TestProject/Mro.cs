namespace Mro
{
    // Install dapper using:
    //  dotnet add package dapper
    using System;
    using System.Data;
    using System.Threading.Tasks;
    using Dapper;

    // Class Definitions
    public class CreateAndReturnEmployeeResult {
        public int Id { get; set; }
    }

    public static class MroDbConnectionExtensions
    {
        public static Task<int> TakeIntReturnInt(this IDbConnection db, int val)
            => db.ExecuteScalarAsync<int>("select public.take_int_return_int(@val)", new { val });

        public static Task<int> AddTwoInts(this IDbConnection db, int a, int b)
            => db.ExecuteScalarAsync<int>("select public.add_two_ints(@a, @b)", new { a, b });

        public static Task<string> ConcatTwoTextStrings(this IDbConnection db, string a, string b)
            => db.ExecuteScalarAsync<string>("select public.concat_two_text_strings(@a, @b)", new { a, b });

        public static Task<string> ConcatTwoVarcharStrings(this IDbConnection db, string a, string b)
            => db.ExecuteScalarAsync<string>("select public.concat_two_varchar_strings(@a, @b)", new { a, b });

        public static Task<bool> AndTwoBooleans(this IDbConnection db, bool a, bool b)
            => db.ExecuteScalarAsync<bool>("select public.and_two_booleans(@a, @b)", new { a, b });

        public static Task<int[]> ConcatTwoIntArraysReturnsIntArray(this IDbConnection db, int[] a, int[] b)
            => db.ExecuteScalarAsync<int[]>("select public.concat_two_int_arrays_returns_int_array(@a, @b)", new { a, b });

        public static Task<int> ConcatTwoIntArraysReturnsIntSet(this IDbConnection db, int[] a, int[] b)
            => db.ExecuteScalarAsync<int>("select public.concat_two_int_arrays_returns_int_set(@a, @b)", new { a, b });

        public static Task<CreateAndReturnEmployeeResult> CreateAndReturnEmployee(this IDbConnection db, int _id, string _firstname, string _secondname, undefined _dob)
            => db.ExecuteScalarAsync<CreateAndReturnEmployeeResult>("select public.create_and_return_employee(@_id, @_firstname, @_secondname, @_dob)", new { _id, _firstname, _secondname, _dob });

    }
}
