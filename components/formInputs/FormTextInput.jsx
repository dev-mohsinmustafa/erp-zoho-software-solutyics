"use client"

const FormTextInput = ({
    label,
    name,
    IsRequired = true,
    register,
    type = "text",
    className = "sm:col-span-2",
    errors,
    noLabel = false,
    placeholder = "",
    onChange,
    value,
    ...rest
}) => {
    return (
        <div className={className}>
            {!noLabel && (
                <label
                    htmlFor={name}
                    className="block text-sm font-medium leading-6 text-gray-900 mb-2"
                >
                    {label}
                </label>
            )}
            <div className={noLabel ? "" : "mt-2"}>
                <input
                    {...register(`${name}`, { required: IsRequired })}
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    {...rest}
                    id={name}
                    autoComplete={name}
                    className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    placeholder={placeholder || (label ? `Type the ${label}` : "")}
                />
                {errors && errors[name] && (
                    <span className="text-sm text-red-600">
                        {label || name} is required
                    </span>
                )}
            </div>
        </div>
    )
}

export default FormTextInput;