// Build runSequentially

function runSequentially(tasks, finalCallback) {
  function runTask(index) {
    if (index === tasks.length) {
      finalCallback();
      return;
    }
    tasks[index](() => runTask(index + 1));
  }

  runTask(0);
}

// Example tasks
const tasks = [
  (done) =>
    setTimeout(() => {
      console.log("Task 1");
      done();
    }, 300),
  (done) =>
    setTimeout(() => {
      console.log("Task 2");
      done();
    }, 200),
  (done) =>
    setTimeout(() => {
      console.log("Task 3");
      done();
    }, 100),
];

// Run them sequentially
runSequentially(tasks, () => {
  console.log("All tasks complete!");
});
