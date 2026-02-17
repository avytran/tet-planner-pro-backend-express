const basedUserAjvSchema = {
    type: "object",
    properties: {
        id: { type: "string" },
        email: { type: "string" },
        passwordHash: { type: "string" },
        fullName: { type: "string" },
        totalBudget: { type: "number", minimum: 0 },
    }
}

export const updatingTotalBudgetAjvSchema = {
    ...basedUserAjvSchema,
    required: ["totalBudget"],
    additionalProperties: false,
}