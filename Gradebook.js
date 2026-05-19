/**
 * This is a simple gradebook app, which allows you to add students and their grades, and calculate the average grade for each student.
 *
 */


// This is out data storage
let students = [];


/**
 * This resets the gradebook by clering the students array. This is useful for testing purposes, so we can start with a clean slate each time we run our tests.
 */
function resetGradeBook(){
    students = [];
}

function addStudent(name, grade) {
  if(!name || typeof name !== 'string') {
    throw new Error('Name must be a non-empty string');
  }
  if(typeof grade !== 'number' || grade < 0 || grade > 100) {
    throw new Error('Grade must be a number between 0 and 100');
  }
  const newStudent = { name, grade };
  students.push(newStudent);
  return "Student " + name + " added with grade " + grade;
}

function doesStudentPass(name) {
  const student = students.find(s => s.name === name);
  if (!student) {
    throw new Error('Student not found');
  }

  return student.grade >= 60;
}

function calculateAverageGradeForClass(name) {
  if(students.length === 0) {
  
   return 0;
  }
  const totalGrade = students.reduce((sum, student) => sum + student.grade, 0);
  return totalGrade / students.length;
}

function getLetterGrade(grade) {
  if (grade >= 90) {
    return 'A';
  }
  if (grade >= 80) {
    return 'B';
  }
  if (grade >= 70) {
    return 'C';
  }
  if (grade >= 60) {
    return 'D';
  }
  return 'F';
}

function getStudents() {
  return students;
}

module.exports = {
    addStudent,
    doesStudentPass,
    calculateAverageGradeForClass,
    getStudents,
    resetGradeBook
}