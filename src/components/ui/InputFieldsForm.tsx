import { Controller, RegisterOptions } from "react-hook-form";
import InputField from "./InputFields";

type Props = {
  control: any;
  name: string;
  rules?: RegisterOptions;
  label: string;
  placeholder: string;
  [key: string]: any; // biar fleksibel (keyboardType, dll)
};

export default function FormInput({
  control,
  name,
  rules,
  label,
  placeholder,
  ...rest
}: Props) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <InputField
          label={label}
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          error={error?.message}
          {...rest}
        />
      )}
    />
  );
}