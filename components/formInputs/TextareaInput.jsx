"use client"


const TextareaInput = ({ label, name, IsRequired = true, register, type = "text", className = "sm:col-span-2", errors }) => {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900 mb-2 "
      >
        {label}
      </label>



      <div className="mt-2">
        <textarea
          {...register(`${name}`, { required: IsRequired })}
          name={name}
          id={name}
          rows={3}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          defaultValue={""}
        />
        {errors[`${name}`] && (
          <span className="text-sm text-red-600 ">
            {label} is required
          </span>
        )}
      </div>


      {/* <div className="mt-2">
        <input
          type={type}
          name={name}
          id={name}
          autoComplete={name}
          className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          placeholder="Type the Category title"
        />
        {errors.title && (
          <span className="text-sm text-red-600 ">
            Category title is required
          </span>
        )}
      </div> */}

    </div>

  )
}

export default TextareaInput;