export default function validators(input) {
  let errors = {};

  if (input.name.length > 15) {
    errors.name = "Name to Long (max 15 characters)";
  } else if (/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>\d/?~]/.test(input.name)) {
    errors.name = "Invalid Characters (only Letters)";
  } else if (!input.name || input.name.length < 3) {
    errors.name = "Name Required (min 3 characters)";
  }

  if (input.height > 1000) {
    errors.height = "max heigth 1000 Kg";
  } else if (!input.height) {
    errors.height = "Height is necessary";
  }

  if (input.weight > 100000) {
    errors.weight = "max weigth 100000 cm";
  } else if (!input.weight) {
    errors.weight = "Weight is necessary";
  }

  if(input.types.length <1) {
    errors.types = "Select at least one type";
  }

  return errors;
}