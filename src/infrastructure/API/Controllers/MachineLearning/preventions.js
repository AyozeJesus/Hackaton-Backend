export async function createPreventions(req, res) {
    const { user_id, cc_num } = req.body
    try {
        const account = await accountService.createAccount(user_id, cc_num)
        res.status(200).json({ message: [] })
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
}