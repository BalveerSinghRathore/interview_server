import * as yup from "yup";

const login = yup.object({
    body: yup.object({
        email: yup.string().email().required(),
        password: yup.string().required().min(6).max(16)
    })
});

export = { login };
