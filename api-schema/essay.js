module.exports = {
    rules: {
        post_essay: {
            content: {
                required: true,
                message: 'content cannot be empty'
            },
            name: {
                required: true,
                message: 'essay name cannot be empty'
            }
        }
    }
};