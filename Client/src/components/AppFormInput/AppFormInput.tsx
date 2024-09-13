import { ChangeEvent } from "react";

interface IAppFormInput {
  labelContent: string;
  inputId: string;
  inputName?: string;
  inputType: string;
  inputHtmlFor: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  className?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function AppFormInput(props: IAppFormInput) {
  return (
    <div className="form-group">
      <label className="formLabel" htmlFor={props.inputHtmlFor}>
        {props.labelContent}
      </label>
      <input
        className={`${props.className}`}
        type={props.inputType}
        id={props.inputId}
        placeholder={props.placeholder}
        name={props.inputName}
        required={props.required}
        value={props.value}
        onChange={props.onChange}
        dir="rtl"
      />
    </div>
  );
}
