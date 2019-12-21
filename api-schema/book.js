module.exports = {
    rules: {
        post_summary: {
            content: {
                required: true,
                message: 'content cannot be empty'
            },
            name: {
                required: true,
                message: 'book name cannot be empty'
            },
            writer: {
                required: true,
                message: 'book writer cannot be empty'
            }
        }
    }
};