// Quản Lý Nhân Viên
var stuffList = [];

// BT1. In ra Table danh sach sinh vien
//BT2. Thêm nhân viên mới
//BT3. Tạo đối tượng nhân viên với thông tin lấy từ form người dùng nhập vào.

document.getElementById("btnThemNV").onclick = function createStuff() {
    //1. dom lay input
    var id = document.getElementById("tknv").value;
    var fullName = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var datePickup = document.getElementById("datepicker").value*1;
    var salary = document.getElementById("luongCB").value *1;
    var position = document.getElementById("chucvu").value;
    var workingHours = document.getElementById("gioLam").value*1;

    // 2. check trùng id
for (var i=0; i < stuffList.length; i++ ) {
    if (stuffList[i].stuffId === id) {
        alert ("Id đã tồn tại ")
    }
}
// 3. Tao đối tượng sinh viên
var stuff = new stuffs(
    id,
    fullName,
    email,
    password,
    datePickup,
    salary,
    position,
    workingHours
)

//  4.Thêm đối tg sv vào danh sách
stuffList.push(stuff);

//Hiện danh sách sv ra màn hình
renderstuffs();

// Lưu ds sv hiện tại xuống local
saveStuffList();
}

function renderstuffs() {
    var html = "";
    for ( var i =0; i < stuffList.length; i++ ) {
        html += `<tr>
		<td>${stuffList[i].stuffId} </td>
        <td>${stuffList[i].fullName} </td>
        <td>${stuffList[i].email} </td>
        <td>${stuffList[i].workingHours} </td>
        <td>${stuffList[i].position} </td>
        <td>${stuffList[i].salary} </td>
        <td>
                  <button 
                    onclick="deleteStuff('${stuffList[i].StuffId}')" 
                    class="btn btn-danger">Xoá</button>
                  <button 
                    onclick="getUpdateStuff('${stuffList[i].StuffId}')"  
                    class="btn btn-info">Sửa</button>
                </td>
	</tr> `;
    }
    document.getElementById("tableDanhSach").innerHTML = html; 
}

function saveStuffList() {
    var  stuffListJson = JSON.stringify(stuffList);
    localStorage.setItem("SL", stuffListJson);
}

function getStuffList() {
    var stuffListJson = localStorage.getItem("SL");
    if (!stuffListJson) return[];
    return JSON.parse(stuffListJson);

}

// Input data Local => output data mới
function mapStuffList(local) {
    var result = [];
    for ( i = 0; i < local.length; i++){
        var oldStuff = local[i];
        var newStuff = new stuffs(
            oldStuff.stuffId,
            oldStuff.fullName,
            oldStuff.email,
            oldStuff.password,
            oldStuff.datePickup,
            oldStuff.salary,
            oldStuff.position,
            oldStuff.workingHours
        )
        result.push(newStuff);
    }
    return result;
}

//BT7. Xóa nhân viên

function deleteStuff(id) {
    var index = findById(id);
    if (index === -1) return alert("Id không tồn tại");
  
    stuffList.splice(index, 1);
  
    renderStuffs();
  
    saveStuffList();
  }

  function getUpdateStuff(id) {
    var index = findById(id);
    if (index === -1) return alert("Id không tồn tại");
  
    var stuff = stuffList[index];
  
    document.getElementById("tknv").value = stuff.stuffId;
    document.getElementById("name").value = stuff.fullName;
    document.getElementById("email").value = stuff.email;
    document.getElementById("password").value = stuff.password;
    document.getElementById("datepicker").value = stuff.datePickup;
    document.getElementById("luongCB").value = stuff.salary;
    document.getElementById("chucvu").value = stuff.position;
    document.getElementById("gioLam").value = stuff.workingHours;
  
    // disable input mã sinh viên
    document.getElementById("tknv").disabled = true;
  

  
    
  }
  
  function cancelUpdate() {
    mode = "create";
    document.getElementById("btnCreate").innerHTML = "Thêm sinh viên";
    document.getElementById("btnCreate").classList.remove("btn-info");
  
    // var btnGroupDiv = document.getElementById("btnGroup");
    // btnGroupDiv.removeChild(btnGroupDiv.lastElementChild);
  
    var btnCancel = document.getElementById("btnCancel");
    btnCancel.remove();
  
    // reset form
    document.getElementById("form").reset();
  
    // gỡ disabled ra khỏi input
    document.getElementById("txtMaSV").disabled = false;
  }
  
  //8. Cập nhật nhân viên

  // Part 2: cho người dùng sửa trên form, nhấn nút lưu để cập nhật
 document.getElementById("btnCapNhat") = function updateStuff() {
    // 1.DOM lấy inputs
    var id = document.getElementById("tknv").value;
    var fullName = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var datePickup = document.getElementById("datepicker").value*1;
    var salary = document.getElementById("luongCB").value *1;
    var position = document.getElementById("chucvu").value;
    var workingHours = document.getElementById("gioLam").value*1;
  
    var index = findById(id);
    var stuff = stuffList[index];
  
    stuff.fullName = fullName;
    stuff.email = email;
    stuff.password = password;
    stuff.datePickup = datePickup;
    stuff.salary = salary;
    stuff.position = position;
    stuff.workingHours = workingHours;
  
    renderStuffs();
    saveStuffList();
  
    cancelUpdate();
  }
  
  // input: id => ouput: index
  function findById(id) {
    for (var i = 0; i < stuffList.length; i++) {
      if (stuffList[i].stuffId === id) {
        return i;
      }
    }
  
    return -1;
  }
  
  window.onload = function () {
    //code muốn chạy ngay lập tức khi load trang
    var stuffListFromLocal = getStuffList(); // => [{}, {}, {}]
    StuffList = mapStuffList(StuffListFromLocal);
  
    renderStuffs();
  };
  
document.getElementById("btnTimNV").onclick = function searchStuffs(e) {
    var keyword = e.target.value.toLowerCase().trim();
    var result = [];
  
    for (var i = 0; i < stuffList.length; i++) {
      var StuffId = StuffList[i].StuffId;
      var StuffName = StuffList[i].fullName.toLowerCase();
  
      if (stuffId === keyword || stuffName.includes(keyword)) {
        result.push(stuffList[i]);
      }
    }
  
    renderStuffs(result);
  }

//BT4. Validation
/**
 * val: string
 * config: {
 *    errorId: string
 * }
 */

function required(val, config) {
    if (val.length > 0) {
      document.getElementById(config.errorId).innerHTML = "";
      return true;
    }
  
    document.getElementById(config.errorId).innerHTML = "*Vui lòng nhập giá tri";
    return false;
  }

  // min-length vs max-length
/**
 * val: string
 * config: {
 *    errorId: string,
 *    min: number,
 *    max: number
 * }
 */
function length(val, config) {
    if (val.length < config.min || val.length > config.max) {
      document.getElementById(
        config.errorId
      ).innerHTML = `*Độ dài phải từ ${config.min} đến ${config.max} kí tự`;
      return false;
    }
    document.getElementById(config.errorId).innerHTML = "";
    return true;
  }

  // pattern - regular expression
/**
 * val: string
 * config: {
 *    errorId: string,
 *    regexp: object
 * }
 */
function pattern(val, config) {
    if (config.regexp.test(val)) {
      document.getElementById(config.errorId).innerHTML = "";
      return true;
    }
    document.getElementById(config.errorId).innerHTML =
      "*Giá trị không đúng định dạng";
    return false;
  }

  function validateForm() {
    var stuffId = document.getElementById("tknv").value;
    var fullName = document.getElementById("name").value;
  
    var textRegexp = /^[A-z\s]+$/g;
  
    // nối các hàm kiểm tra của ô stuffId
    var stuffIdValid =
      required(stuffId, { errorId: "stuffIdError" }) &&
      length(stuffId, { errorId: "stuffIdError", min: 4, max: 6 });
  
    var nameValid =
      required(fullName, { errorId: "nameError" }) &&
      pattern(fullName, { errorId: "nameError", regexp: textRegexp });
  
    // var emailValid = required(email, { errorId: "emailError" });
  
    var isFormValid = stuffIdValid && nameValid;
  
    return isFormValid;
  }
  










