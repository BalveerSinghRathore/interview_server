import * as yup from "yup";

const index = yup.object({
    query: yup.object({
        id: yup.string().max(150).nullable(),
        page: yup.number().positive().integer().required(),
        limit: yup.number().positive().integer().required(),
        search: yup.string().nullable()
    })
});
const indexAll = yup.object({
    query: yup.object({
        order: yup.mixed().oneOf(["c_d", "n_a", "n_d", "c_a"]).required()
    })
});

const show = yup.object({
    params: yup.object({
        id: yup.string().max(150).nullable()
    })
});

const store = yup.object({
    body: yup.object({
        name: yup.string().max(355).required()
    })
});

export = { index, show, store, indexAll };
