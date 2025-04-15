export function generateInitials(fullName) {

    // split the fullName into an array
    const words = fullName.split(/\s+/);

    // Get the first letter of each word and join them
    const initials = words.map((word) => word.charAt(0)).join("");


    // Ensure the initials are in uppercase 
    return initials.toUpperCase();
};

// Example Usage
// const fullName = "Mohsin Mustafa";
// const initials = generateInitials(fullName);
// console.log(initials); // Output MM
