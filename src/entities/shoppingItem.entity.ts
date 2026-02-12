const TIMELINE_ENUM = ["Before Tet", "30 Tet", "Mung 1-3"];
const STATUS_ENUM = ["Planning", "Completed"];

const basedShoppingItemAjvSchema = {
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
    },
  }
};

export const CreatingShoppingItemAjvSchema = {
  ...basedShoppingItemAjvSchema,
  required: ["budget_id", "task_id", "name", "quantity", "price", "dued_time", "timeline", "status"],
  additionalProperties: false,
};

export const UpdatingAllFieldShoppingItemAjvSchema = {
  ...basedShoppingItemAjvSchema,
  required: ["budget_id", "task_id", "name", "quantity", "price", "dued_time", "timeline", "status"],
  additionalProperties: false,
};

export const GettingShoppingItemAjvSchema = {
  type: "object",
  properties: {
    ...basedShoppingItemAjvSchema.properties,

    keyword: { type: "string" },

    sort_by: {
      type: "string",
      enum: ["price", "quantity", "dued_time", "created_at"]
    },
    sort_order: {
      type: "string",
      enum: ["asc", "desc"]
    },

    page: { type: "integer", minimum: 1 },
    page_size: { type: "integer", minimum: 1, maximum: 100 }
  },
  additionalProperties: false
}