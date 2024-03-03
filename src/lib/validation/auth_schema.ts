import { z } from "zod";

export const emailSchema = z.object({
    email: z.string().email(),
});

export const codeSchema = z.object({
    code: z.string().length(8, "Your code should be 8 characters long"),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1).max(50),
});

export const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1).max(50),
    confirm_password: z.string().min(1).max(50),
}).superRefine(({ password, confirm_password }, ctx) => validatePassword(password, confirm_password, ctx));

const validatePassword = (password: string, confirmPassword: string, ctx: z.RefinementCtx) => {

    const passLen = password.length;

    if (6 > passLen || passLen > 50) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Your password must be 6-50 characters long",
            path: ["password"]
        });
    } else if (password.includes(" ")) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "No spaces allowed",
            path: ["password"]
        });
    } else {

        const rules = new Map<boolean, string>([
                [/[A-Z]/.test(password), "Missing uppercase character"],
                [/[a-z]/.test(password), "Missing lowercase character"],
                [/[0-9]/.test(password), "Missing number"],
                [/[`!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?~ ]/.test(password), "Missing special character"]
        ]);

        for (const entry of rules.entries()) {
            if (!entry[0]) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: entry[1],
                    path: ["password"]
                });
            }
        }

    }

    if (password !== confirmPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Your passwords do not match",
            path: ["confirm_password"]
        });
    }

}

export type EmailSchema = typeof emailSchema;
export type LoginSchema = typeof loginSchema;
export type SignupSchema = typeof signupSchema;
export type CodeSchema = typeof codeSchema;