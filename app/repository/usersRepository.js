const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'testdb',
    password: '123',
    port: 5432,
})

module.exports = {
    findUserByEmailPassword: function (email,password,callback) {

        pool.query('SELECT * FROM public.users where email =$1 and password=$2', [email, password], (error, results) => {
            if (error) {
                callback(error,null)
            } else {
                callback(null, results.rows.length)
            }
        });
    }
}