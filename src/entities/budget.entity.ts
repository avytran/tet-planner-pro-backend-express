const basedBudgetAjvSchema = {
    type: "object",
    properties: {
        userId: { type: "string" },
        name: { type: "string" },
        allocatedAmount: { type: "number", minimum: 0 },
    }
}

export const CreatingBudgetAjvSchema = {
    ...basedBudgetAjvSchema,
    required: ["name", "allocatedAmount"],
    additionalProperties: false,
}

export const UpdatingBudgetAjvSchema = {
    ...basedBudgetAjvSchema,
    required: ["name", "allocatedAmount"],
    additionalProperties: false,
}