"use client"


const TextInput = ({ label, name, IsRequired = true, register, type = "text", className = "sm:col-span-2", errors }) => {
    return (
        <div className={className}>
            <label
                //   htmlFor="title"
                htmlFor={name}
                className="block text-sm font-medium leading-6 text-gray-900 mb-2 "
            >
                {label}
            </label>
            <div className="mt-2">
                <input
                    {...register(`${name}`, { required: IsRequired })}
                    type={type}
                    name={name}
                    id={name}
                    autoComplete={name}
                    // autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    // placeholder="Type the Category title"
                    placeholder={`Type the ${label}`}
                />
                {errors[`${name}`] && (
                    <span className="text-sm text-red-600 ">
                        {label} is required
                    </span>
                )}
            </div>
        </div>

    )
}

export default TextInput;