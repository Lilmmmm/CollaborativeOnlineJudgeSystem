var problems = [
    {
      id : 1,
      name: "Two Sum",
      desc: `Given an array of integers, return indices of the two numbers such that they add up to a specific target. You may assume that each input would have exactly one solution, and you may not use the same element twice.`,
      difficulty: "easy"
    },
    {
      id: 2,
      name: "Add Two Numbers",
      desc: `You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.`,
      difficulty:  "Medium"
    },
    {
      id: 3,
      name: "Longest Substring Without Repeating Characters",
      desc: `Given a string, find the length of the longest substring without repeating characters.`,
      difficulty: "Medium"
    },
    {
      id: 4,
      name : "Median of Two Sorted Arrays",
      desc: `There are two sorted arrays nums1 and nums2 of size m and n respectively.

    Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).

    You may assume nums1 and nums2 cannot be both empty.`,
      difficulty: "Hard"
    },
    {
      id: 5,
      name: "Regular Expression Matching",
      desc: `Given an input string (s) and a pattern (p), implement regular expression matching with support for '.' and '*'.`,
      difficulty: "Super"
    }
];

var getProblems = function () {
  return new Promise((resolve, reject) => {
    resolve(problems);
  });
}

var getProblem = function (id) {
  return new Promise((resolve, reject) => {
    resolve(problems.find(problem => problem.id === id));
  });
}

var addProblem = function (newProblem) {
  return new Promise((resolve, reject) => {
    if (problems.find(problem => problem.name === newProblem.name)) {
      reject("Problem already exists!");
    } else {
      newProblem.id = problems.length + 1;
      problems.push(newProblem);
      resolve(newProblem);
    }
  });
}

module.exports = {
  getProblems: getProblems,
  getProblem: getProblem,
  addProblem: addProblem
}
