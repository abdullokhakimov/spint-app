import { z } from 'zod';
import { FieldError, UseFormRegister } from "react-hook-form";
import i18n from '../../i18n';

const passwordSchema = z.string()
	.refine(password => password.length >= 8, {
		message: i18n.t("zod_validation.password__length"),
	})
	.refine(password => /[a-z]/.test(password), {
		message: i18n.t("zod_validation.password__letter"),
	})
	.refine(password => /[A-Z]/.test(password), {
		message: i18n.t("zod_validation.password__capital__letter"),
	})
	.refine(password => /[0-9]/.test(password), {
		message: i18n.t("zod_validation.password__number"),
	});

export const SignupValidation = z
	.object({
		username: z.string(),
		email: z.string().email(i18n.t("zod_validation.password__email")),
		password: passwordSchema,
		re_password: z.string(),
	})
	.refine((data) => data.password === data.re_password, {
		message: i18n.t("zod_validation.password__match"),
		path: ["re_password"],
	});

export const LoginValidation = z
	.object({
		username: z.string(),
		password: z.string(),
	})

export type SignupFormData = {
  username: string;
  email: string; // Required for signup
  password: string;
  re_password: string; // Required for signup
};

export type LoginFormData = {
  username: string;
  password: string;
};

export type FormFieldProps<T extends SignupFormData | LoginFormData> = {
  type: string;
  label: string;
  name: ValidFieldNames;
  register: UseFormRegister<T>;
  error: FieldError | undefined;
};
  

export type ValidFieldNames =
| "username"
| "email"
| "password"
| "re_password";