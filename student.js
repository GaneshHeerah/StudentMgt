const studentTable = document.getElementById('student-table');
const errorMessageElement = document.getElementById('error-message');

function displayStudents(students) {
  students.forEach(student => {
    const tableRow = document.createElement('tr');
    const nameCell = document.createElement('td');
    const idCell = document.createElement('td');
    const coursesCell = document.createElement('td');

    nameCell.textContent = student.name;
    idCell.textContent = student.id;
    coursesCell.textContent = student.courses.join(', ');  // Join courses into a comma-separated string

    tableRow.appendChild(nameCell);
    tableRow.appendChild(idCell);
    tableRow.appendChild(coursesCell);

    studentTable.appendChild(tableRow);
  });
}

function readFile(event) {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];

  if (!file) {
    errorMessageElement.textContent = 'Please select a file to read.';
    return;
  }

  const reader = new FileReader();

  reader.onload = function(e) {
    const data = e.target.result;
    try {
      const students = parseStudentData(data);
      displayStudents(students);
      errorMessageElement.textContent = ''; // Clear any previous error messages
    } catch (error) {
      console.error('Error parsing student data:', error);
      errorMessageElement.textContent = 'An error occurred while processing the student data file.';
    }
  };

  reader.onerror = function(e) {
    console.error('Error reading file:', e.error);
    errorMessageElement.textContent = 'An error occurred while reading the student data file.';
  };

  reader.readAsText(file);
}

// Replace this with your logic to parse student data from the file content (adapt based on your file format)
function parseStudentData(data) {
  const students = [];
  const lines = data.split('\n');
  for (const line of lines) {
    const parts = line.split(',');
    students.push({
      name: parts[0].trim(),  // Trim leading/trailing whitespace
      id: parseInt(parts[1]),
      courses: parts.slice(2).map(course => course.trim()), // Trim course names and create an array
    });
  }
  return students;
}
function parseStudentData(data) {
    const students = [];
    const lines = data.split('\n');
    for (const line of lines) {
      const parts = line.split(',');
      const name = parts[0].trim();
      const id = parseInt(parts[1]);
      const type = parts[2].trim(); // Identify student type (e.g., undergraduate, graduate)
      const courses = parts.slice(3).map(course => course.trim());
  
      let student;
      if (type.toLowerCase() === 'undergraduate') {
        student = new UndergraduateStudent(name, id, courses[0]); // Assuming major is in the first course element
      } else if (type.toLowerCase() === 'graduate') {
        student = new GraduateStudent(name, id, courses[0]); // Assuming program is in the first course element
      } else {
        console.error(`Invalid student type: ${type}`); // Handle invalid types
        continue;
      }
  
      students.push(student);
    }
    return students;
  }

class Person {
    constructor(name) {
      this.name = name;
    }
  }
  
  class Course {
    constructor(name, credits) {
      this.name = name;
      this.credits = credits;
    }
  
    getInfo() {
      return `Course: ${this.name} (Credits: ${this.credits})`;
    }
  }

  class Student extends Person {
    constructor(name, id) {
      super(name); // Call the parent constructor (Person)
      this.id = id;
      this.courses = []; // Array to hold enrolled courses
    }
  
    enroll(course) {
      this.courses.push(course);
    }
  
    getEnrolledCourses() {
      return this.courses.map(course => course.getInfo()); // Return course info
    }
  }

  class Grade {
    constructor(course, letterGrade) {
      this.course = course;
      this.letterGrade = letterGrade;
    }
  }

  class UndergraduateStudent extends Student {
    constructor(name, id, major) {
      super(name, id);
      this.major = major;
    }
  
    // You can define additional methods specific to undergraduate students
  }
  
  class GraduateStudent extends Student {
    constructor(name, id, program) {
      super(name, id);
      this.program = program;
    }
  
    // You can define additional methods specific to graduate students
  }

  class CoreCourse extends Course {
    constructor(name, credits) {
      super(name, credits);
    }
  }
  
  class ElectiveCourse extends Course {
    constructor(name, credits, department) {
      super(name, credits);
      this.department = department;
    }
  
    getInfo() {
      return super.getInfo() + ` (Department: ${this.department})`; // Override getInfo to include department
    }
  }