document.getElementById("get-problem").addEventListener("click", function () {
  const rating = document.getElementById("rating").value;

  if (!rating || rating < 800 || rating > 3500) {
    alert("Please enter a valid rating between 800 and 3500");
    return;
  }

  fetch(`https://codeforces.com/api/problemset.problems`)
    .then((response) => response.json())
    .then((data) => {
      const problems = data.result.problems.filter(
        (problem) => problem.rating == rating
      );
      if (problems.length > 0) {
        const randomProblem =
          problems[Math.floor(Math.random() * problems.length)];
        const problemUrl = `https://codeforces.com/problemset/problem/${randomProblem.contestId}/${randomProblem.index}`;
        document.getElementById(
          "problem-link"
        ).innerHTML = `<a href="${problemUrl}" target="_blank">${randomProblem.name} (${randomProblem.index})</a>`;
      } else {
        document.getElementById("problem-link").innerHTML =
          "No problems found for this rating.";
      }
    })
    .catch((error) => {
      console.error("Error fetching problems:", error);
    });
});
