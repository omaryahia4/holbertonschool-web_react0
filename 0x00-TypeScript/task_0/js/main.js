var student1 = { firstName: 'A', lastName: 'B', age: 19, location: 'Puerto Rico' };
var student2 = { firstName: 'C', lastName: 'D', age: 20, location: 'Puerto Rico' };
var studentsList = [student1, student2];
var table = document.createElement('table');
for (var _i = 0, studentsList_1 = studentsList; _i < studentsList_1.length; _i++) {
    var student = studentsList_1[_i];
    var row = document.createElement('tr');
    var nameCell = document.createElement('td');
    var nameCellText = document.createTextNode(student.firstName);
    nameCell.appendChild(nameCellText);
    var locationCell = document.createElement('td');
    var locationCellText = document.createTextNode(student.location);
    locationCell.appendChild(locationCellText);
    row.appendChild(nameCell);
    row.appendChild(locationCell);
    table.appendChild(row);
}
document.body.appendChild(table);
