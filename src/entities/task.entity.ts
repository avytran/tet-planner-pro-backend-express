const TIMELINE_ENUM = ["Pre_Tet", "During_Tet", "After_Tet"];
const STATUS_ENUM = ["Todo", "In_Progress", "Done"];
const PRIORITY_ENUM = ["Low", "Medium", "High"];

const basedTaskAjvSchema = {
    type: "object",
    properties: {
        categoryId: { type: "string" },
        title: { type: "string" },
        duedTime: { type: "string", format: "date-time" },
        timeline: {
            type: "string",
            enum: TIMELINE_ENUM as any,
        },
        priority: {
            type: "string",
            enum: PRIORITY_ENUM as any,
        },
        status: {
            type: "string",
            enum: STATUS_ENUM as any,
        }
    }
}

export const creatingTaskAjvSchema = {
    ...basedTaskAjvSchema,
    required: ["categoryId", "title", "duedTime", "priority", "timeline", "status"],
    additionalProperties: false,
}

export const gettingTaskAjvSchema = {
    ...basedTaskAjvSchema,
    required: [],
    additionalProperties: false,
}

export const updatingTaskAjvSchema = {
    ...basedTaskAjvSchema,
    required: ["categoryId", "title", "duedTime", "priority", "timeline", "status"],
    additionalProperties: false,
}


export const patchingTaskAjvSchema = {
    ...basedTaskAjvSchema,
    required: [],
    additionalProperties: false,
}