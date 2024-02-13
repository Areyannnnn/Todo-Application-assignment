const z = require("zod");

const createdTodoSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1)
})

const completedTodoSchema = z.object({
    id: z.string()
})

module.exports = {
    createdTodoSchema,
    completedTodoSchema
}