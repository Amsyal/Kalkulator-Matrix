// Form handling and UI setup
function generateMatrixForms() {
  const rows = parseInt(document.getElementById("rows").value);
  const cols = parseInt(document.getElementById("cols").value);
  const operation = document.getElementById("operation").value;
  const matrixCount = operation === "add" || operation === "subtract" || operation === "multiply" ? 2 : 1;

  const wrapper = document.getElementById("matrixWrapper");
  wrapper.innerHTML = "";

  if (rows > 4 || cols > 4) {
    alert("Sitik wae! Ojo akeh-akeh.");
    return;
  }

  for (let m = 0; m < matrixCount; m++) {
    const container = document.createElement("div");
    const label = document.createElement("h3");
    const matrixName = String.fromCharCode(65 + m);
    label.textContent = "Matrix " + matrixName;
    container.appendChild(label);

    for (let i = 0; i < rows; i++) {
      const rowDiv = document.createElement("div");
      rowDiv.className = "matrix-row";

      for (let j = 0; j < cols; j++) {
        const input = document.createElement("input");
        input.type = "number";
        input.value = "0";
        input.id = "matrix" + matrixName + "[" + i + "][" + j + "]";
        input.className = "matrix-col";
        rowDiv.appendChild(input);
      }
      container.appendChild(rowDiv);
    }
    wrapper.appendChild(container);
  }

  createResultForm(rows, cols);
}

function getMatrix(matrixId, rows, cols) {
  const matrix = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      const input = document.getElementById(`${matrixId}[${i}][${j}]`);
      row.push(parseFloat(input.value) || 0);
    }
    matrix.push(row);
  }
  return matrix;
}

function createResultForm(rows, cols) {
  let resultWrapper = document.getElementById("result");
  resultWrapper.innerHTML = "<h3>Hasil:</h3>";

  const table = document.createElement("table");
  table.id = "resultTable";
  table.className = "matrix-table";

  for (let i = 0; i < rows; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < cols; j++) {
      const cell = document.createElement("td");
      const input = document.createElement("input");
      input.type = "text";
      input.disabled = true;
      input.id = `result[${i}][${j}]`;
      cell.appendChild(input);
      row.appendChild(cell);
    }
    table.appendChild(row);
  }

  resultWrapper.appendChild(table);
}

function displayResult(matrix) {
  if (!Array.isArray(matrix)) {
    alert("Hasil: " + matrix);
    return;
  }

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      const input = document.getElementById(`result[${i}][${j}]`);
      if (input) input.value = matrix[i][j];
    }
  }
}

function addMatrix(A, B, rows, cols) {
  const result = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(A[i][j] + B[i][j]);
    }
    result.push(row);
  }
  return result;
}

function subtractMatrix(A, B, rows, cols) {
  const result = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(A[i][j] - B[i][j]);
    }
    result.push(row);
  }
  return result;
}

function multiplyMatrix(A, B) {
  const result = [];
  for (let i = 0; i < A.length; i++) {
    const row = [];
    for (let j = 0; j < B[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < A[0].length; k++) {
        sum += A[i][k] * B[k][j];
      }
      row.push(sum);
    }
    result.push(row);
  }
  return result;
}

function transposeMatrix(A) {
  const result = [];
  const rows = A.length;
  const cols = A[0].length;

  for (let i = 0; i < cols; i++) {
    const newRow = [];
    for (let j = 0; j < rows; j++) {
      newRow.push(A[j][i]);
    }
    result.push(newRow);
  }
  return result;
}

function determinan2x2(A) {
  return A[0][0] * A[1][1] - A[0][1] * A[1][0];
}

function sarrus(matrix) {
  const p1 = matrix[0][0] * matrix[1][1] * matrix[2][2];
  const p2 = matrix[0][1] * matrix[1][2] * matrix[2][0];
  const p3 = matrix[0][2] * matrix[1][0] * matrix[2][1];
  const n1 = matrix[0][2] * matrix[1][1] * matrix[2][0];
  const n2 = matrix[0][0] * matrix[1][2] * matrix[2][1];
  const n3 = matrix[0][1] * matrix[1][0] * matrix[2][2];
  return p1 + p2 + p3 - (n1 + n2 + n3);
}

function adjoin2x2(matrix) {
  if (matrix.length !== 2 || matrix[0].length !== 2 || matrix[1].length !== 2) {
    throw new Error("Matrix harus 2x2");
  }

  const a = matrix[0][0];
  const b = matrix[0][1];
  const c = matrix[1][0];
  const d = matrix[1][1];

  return [
    [d, -b],
    [-c, a],
  ];
}

function adjoin3x3(matrix) {
  const m = matrix;

  const cofactor00 = m[1][1] * m[2][2] - m[1][2] * m[2][1];
  const cofactor01 = -(m[1][0] * m[2][2] - m[1][2] * m[2][0]);
  const cofactor02 = m[1][0] * m[2][1] - m[1][1] * m[2][0];

  const cofactor10 = -(m[0][1] * m[2][2] - m[0][2] * m[2][1]);
  const cofactor11 = m[0][0] * m[2][2] - m[0][2] * m[2][0];
  const cofactor12 = -(m[0][0] * m[2][1] - m[0][1] * m[2][0]);

  const cofactor20 = m[0][1] * m[1][2] - m[0][2] * m[1][1];
  const cofactor21 = -(m[0][0] * m[1][2] - m[0][2] * m[1][0]);
  const cofactor22 = m[0][0] * m[1][1] - m[0][1] * m[1][0];

  return [
    [cofactor00, cofactor10, cofactor20],
    [cofactor01, cofactor11, cofactor21],
    [cofactor02, cofactor12, cofactor22],
  ];
}

// MASIH ERROR
function inverseMatrix(A) {
  const rows = A.length;
  const cols = A[0].length;
  const det = rows == 2 && cols == 2 ? determinan2x2(A) : sarrus(A);
  const seperDet = 1 / det;
  const adjoin = rows == 2 && cols == 2 ? adjoin2x2(A) : adjoin3x3(A);

  const result = [];
  for (let i = 0; i < rows; i++) {
    const inverseRow = [];
    for (let j = 0; j < cols; j++) {
      inverseRow.push(seperDet * adjoin[i][j]);
    }
    result.push(inverseRow);
  }

  return result;
}

function calculate() {
  const operation = document.getElementById("operation").value;
  const rows = parseInt(document.getElementById("rows").value);
  const cols = parseInt(document.getElementById("cols").value);

  const A = getMatrix("matrixA", rows, cols);
  let B = [];
  if (["add", "subtract", "multiply"].includes(operation)) {
    B = getMatrix("matrixB", rows, cols);
  }

  let result;
  switch (operation) {
    case "add":
      result = addMatrix(A, B, rows, cols);
      break;

    case "subtract":
      result = subtractMatrix(A, B, rows, cols);
      break;

    case "multiply":
      result = multiplyMatrix(A, B);
      break;

    case "determinan":
      result = rows === 2 && cols === 2 ? determinan2x2(A) : sarrus(A);
      break;

    case "transpose":
      result = transposeMatrix(A);
      break;

    case "inverse":
      result = inverseMatrix(A);
      break;

    default:
      alert("Operasi tidak valid.");
      return;
  }

  displayResult(result);
}

document.getElementById("rows").addEventListener("input", generateMatrixForms);
document.getElementById("cols").addEventListener("input", generateMatrixForms);
document.getElementById("operation").addEventListener("change", generateMatrixForms);
window.addEventListener("DOMContentLoaded", generateMatrixForms);
