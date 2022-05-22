import * as yup from "yup";

const store = yup.object({
    body: yup.object({
        name: yup.string().max(355).required(),
        email: yup.string().email().max(545).required(),
        phone: yup.string().max(22).required(),
        phone_code: yup.string().max(4).required(),
        about: yup.string().max(1500).required(),
        education: yup.string().max(150).required(),
        dl: yup.string().max(150).required(),
        gender: yup.mixed().oneOf(["m", "f"]).required(),
        dob: yup
            .string()
            .matches(
                /(\d{4})-(\d{2})-(\d{2})/,
                "invalid date formate, yyyy-mm-dd"
            )
            .required(),
    })
});

const index = yup.object({
    query: yup.object({
        id: yup.string().max(150).nullable(),
        page: yup.number().positive().integer().required(),
        limit: yup.number().positive().integer().required(),
        search: yup.string().nullable()
    })
});

const show = yup.object({
    params: yup.object({
        id: yup.string().max(150).nullable()
    })
});

const status = yup.object({
    params: yup.object({
        id: yup.string().max(150).nullable()
    })
});

const update = yup.object({
    params: yup.object({
        id: yup.string().max(150).nullable()
    }),
    body: yup.object({
        name: yup.string().max(355).required(),
        email: yup.string().email().max(545).required(),
        phone: yup.string().max(22).required(),
        phone_code: yup.string().max(4).required(),
        about: yup.string().max(1500).required(),
        education: yup.string().max(150).required(),
        dl: yup.string().max(150).required(),
        gender: yup.mixed().oneOf(["m", "f"]).required(),
        dob: yup
            .string()
            .matches(
                /(\d{4})-(\d{2})-(\d{2})/,
                "invalid date formate, yyyy-mm-dd"
            )
            .required(),
    })
});

export = { store, index, show, update, status };
