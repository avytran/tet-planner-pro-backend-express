const TIMELINE_ENUM = ["Before Tet", "30 Tet", "Mung 1-3"];
const STATUS_ENUM = ["Planning", "Completed"];

export const CreatingShoppingItemAjvSchema = {
  type: "object",
  properties: {
    budget_id: { type: "string" },
    task_id: { type: "string" },
    name: { type: "string", minLength: 1 },
    quantity: { type: "number", minimum: 1 },
    price: { type: "number", minimum: 0 },
    dued_time: { type: "string", format: "date-time" },

    timeline: {
      type: "string",
      enum: TIMELINE_ENUM as any,
    },

    status: {
      type: "string",
      enum: STATUS_ENUM as any,
      nullable: true,
    },
  },
  required: ["budget_id", "task_id", "name", "quantity", "price", "dued_time", "timeline"],
  additionalProperties: false,
};
