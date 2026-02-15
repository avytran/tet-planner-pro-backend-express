const basedTaskCategoryAjvSchema = {
    type: "object",
    properties: {
        userId: { type: "string" },
        name: { type: "string" },
    }
}

export const CreatingTaskCategoryAjvSchema = {
    ...basedTaskCategoryAjvSchema,
    required: ["name"],
    additionalProperties: false,
}

export const UpdatingTaskCategoryAjvSchema = {
    ...basedTaskCategoryAjvSchema,
    required: ["name"],
    additionalProperties: false,
}