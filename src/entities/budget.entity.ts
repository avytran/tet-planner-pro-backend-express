const basedBudgetAjvSchema = {
    type: "object",
    properties: {
        user_id: { type: "string" },
        name: { type: "string" },
        allocated_amount: { type: "number", minimum: 0 },
    }
}

export const CreatingBudgetAjvSchema = {
    ...basedBudgetAjvSchema,
    required: ["name", "allocated_amount"],
    additionalProperties: false,
}

export const UpdatingBudgetAjvSchema = {
    ...basedBudgetAjvSchema,
    required: ["name", "allocated_amount"],
    additionalProperties: false,
}