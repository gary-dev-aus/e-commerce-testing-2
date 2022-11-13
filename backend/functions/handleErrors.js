module.exports.handleErrors = (err) => {
  let errors = [];

  // Front facing duplicate error code
  if (err.code === 11000) {
    // Users
    if (err.keyValue.username) {
      errors.push({
        message: "That username is already registered",
        path: "username",
      });
    } else if (err.keyValue.email) {
      errors.push({
        message: "That email is already registered",
        path: "email",
      });
    }
    // Products
    else if (err.keyValue.title) {
      errors.push({
        message: "That product name is already registered",
        path: "product",
      });
    }
  }

  // Validation errors
  if (err.message.toLowerCase().includes("validation failed")) {
    // Niche
    if (err.errors.price?.name === "CastError") {
      const error = `${err.errors.price.value} is not a valid number`;
      errors.push(error);
    } else {
      // General
      Object.values(err.errors).forEach(({ properties }) => {
        const error = {
          message: properties.message,
          path: properties.path,
        };
        errors.push(error);
      });
    }
  }

  // Incorrect email/password
  if (err.message === "Incorrect email") {
    errors.push({
      message: "That email is not registered",
      path: "email",
    });
  } else if (err.message === "Incorrect password") {
    errors.push({
      message: "That password is incorrect",
      path: "password",
    });
  }

  // JWT errors
  const jwtErrors = ["jwt", "invalid"];
  if (jwtErrors.some((jwtError) => err.message.includes(jwtError))) {
    errors.push({
      message: err.message,
      name: err.name,
    });
  }

  errors.map((error) => {
    if (error.message && error.path) {
      console.log("\x1b[31m" + "Error:", error.message, "\nPath:", error.path);
    } else {
      console.log(error);
    }
  });

  return errors;
};
