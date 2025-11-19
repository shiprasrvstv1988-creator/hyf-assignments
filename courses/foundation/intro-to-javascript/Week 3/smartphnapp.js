const activities = [];
let usageLimitInMinutes = 120;

function addActivity(date, activity, duration) {
  activities.push({
    date: date,
    activity: activity,
    durationInMinutes: duration,
  });
  return activities;
}

function showStatus(activities) {
  if (activities.length === 0) {
    return "Add some activities before calling showStatus";
  }

  const numberOfActivities = activities.length;

  let totalDuration = 0;
  for (let i = 0; i < activities.length; i++) {
    totalDuration += activities[i].durationInMinutes;
  }

  // Check if above limit
  if (totalDuration > usageLimitInMinutes) {
    return "You have reached your limit, no more smartphoning for you!";
  }

  // Default message
  return (
    "You have added " +
    numberOfActivities +
    " activities. They amount to " +
    totalDuration +
    " min. of usage"
  );
}

//the activity a user has spent the most time on.
function getMostSpentActivity(activities) {
  let maxDuration = 0;
  let maxActivity = "";

  for (let i = 0; i < activities.length; i++) {
    let currentDuration = activities[i].durationInMinutes;

    if (currentDuration > maxDuration) {
      maxDuration = currentDuration;
      maxActivity = activities[i].activity;
    }
  }
  return (
    "The activity you spent the most time on is " +
    maxActivity +
    " with " +
    maxDuration +
    " minutes."
  );
}

console.log(addActivity("2025-11-18", "Instagram", 30));
console.log(addActivity("2025-11-18", "News", 40));
console.log(addActivity("2025-11-18", "Podcast", 20));
console.log(addActivity("2025-11-18", "Blogs", 15));

console.log(showStatus(activities));

console.log(getMostSpentActivity(activities));
