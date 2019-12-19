module.exports = {
    rules: {
        login: {
            email_id: {
                required: true,
                message: 'user_id cannot be empty'
            },
            password: {
                required: true,
                message: 'password cannot be empty'
            }
        },
        logout: {
            user_id: {
                required: true,
                message: 'user_id cannot be empty'
            }
        },
        register_user: {
            user_name: {
                required: true,
                message: 'user_name cannot be empty'
            },
            password: {
                required: true,
                message: 'password cannot be empty'
            },
            gmail_id: {
                required: true,
                message: 'gmail_id cannot be empty'
            }
        }
    }
};