import { getConnection } from '../../infrastructure/UserRepository/MySQLClient.js';

export async function calculateTotalByAccount(type, cc_num) {
    let connection;
    try {
        connection = await getConnection();
        const expenseIncomeFlag = type === 'expenses' ? 1 : 0;
        const query = `
            SELECT SUM(amount) AS total
            FROM transactions
            WHERE cc_num = ? AND expense_income = ?;
        `;
        const [results] = await connection.query(query, [cc_num, expenseIncomeFlag]);
        return results[0].total || 0;
    } catch (error) {
        console.error('Error calculating total:', error);
        throw error;
    } finally {
        if (connection) {
            connection.release();
        }
    }
}