const dogYearOfBirth = 2020;
const dogYearFuture = 2045;

const dogYear = dogYearFuture - dogYearOfBirth;

const shouldShowResultInDogYears = true;

if (shouldShowResultInDogYears) {
  console.log(
    "Your dog will be " +
      dogYear * 7 +
      " dog years old in the year " +
      dogYearFuture +
      "."
  );
} else {
  console.log(
    "Your dog will be " +
      dogYear +
      " human years old in the year " +
      dogYearFuture +
      "."
  );
}
