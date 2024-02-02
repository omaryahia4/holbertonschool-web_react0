interface Student {
  firstName: string;
  lastName: string;
  age: number;
  location: string;
}

const student1: Student = { firstName: 'A', lastName: 'B', age: 19, location: 'Puerto Rico' };
const student2: Student = { firstName: 'C', lastName: 'D', age: 20, location: 'Puerto Rico' };
const studentsList: Array<Student> = [student1, student2];

const table = document.createElement('table');
for (const student of studentsList) {
	const row = document.createElement('tr');

	const nameCell = document.createElement('td');
	const nameCellText = document.createTextNode(student.firstName);
	nameCell.appendChild(nameCellText);

	const locationCell = document.createElement('td');
	const locationCellText = document.createTextNode(student.location);
	locationCell.appendChild(locationCellText);

	row.appendChild(nameCell);
	row.appendChild(locationCell);

	table.appendChild(row);
}
document.body.appendChild(table);
