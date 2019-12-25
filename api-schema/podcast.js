module.exports = {
    rules: {
        post_summary: {
            content: {
                required: true,
                message: 'content cannot be empty'
            },
            name: {
                required: true,
                message: 'podcast name cannot be empty'
            },
            writer: {
                required: true,
                message: 'podcast writer cannot be empty'
            }
        }
    }
};