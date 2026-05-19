const gradebook = require('./Gradebook');

describe('Gradebook', () => {


beforeEach(() => {
  gradebook.resetGradeBook();
});

// Topic One: Basic Assertions 
test('Should Start with an empty student list', () => {
  expect(gradebook.getStudents()).toHaveLength(0);
});

test('Should return a success message when adding a student', () => {
  const message = gradebook.addStudent('John Doe', 85);
  expect(message).toBe('Student John Doe added with grade 85');
});


// Truthiness 
test('Should Return true is student passes ', () => {
  gradebook.addStudent('John Doe', 85);
  expect(gradebook.doesStudentPass('John Doe')).toBe(true);
});

// Testing numbers and math 
test('Average of 80 and 90 should be 85', () => {
  gradebook.addStudent('John Doe', 80);
  gradebook.addStudent('Jane Doe', 90);
  expect(gradebook.calculateAverageGradeForClass()).toBe(85);
});

test('Average of empty list should be 0 ', () => {
  expect(gradebook.calculateAverageGradeForClass()).toBe(0);
});

// Topic 4 string matching 
test('Should throw error if grade is above 100', () => {
  expect(() => gradebook.addStudent('John Doe', 101)).toThrow('Grade must be a number between 0 and 100');

});

// error handling
 test('10. Should throw an error if grade is above 100', () => {
    expect(() => {
      gradebook.addStudent('Cheater', 101);
    }).toThrow("Grade must be a number between 0 and 100");
  });






});