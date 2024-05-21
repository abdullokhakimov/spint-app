import { FormFieldProps } from "../../services/validation";

const FormField: React.FC<FormFieldProps> = ({
  type,
  label,
  name,
  register,
  error,
}) => (
  	<div className="authentication__form__field">
		<input 
			type={type} 
			className="authentication__form__field__input" 
			autoComplete="off"
			required
			{...register(name)}
		/>
		<label htmlFor="" className="authentication__form__field__label">
			{ label }
		</label>

		{error && <p className="authentication__form__field__error-message">{error.message}</p>}
	</div>
);
export default FormField;