const ListUers = document.querySelector("#list-user");
const BtnEdit = document.querySelector(".btn-edit");
const FormUser = document.querySelector(".form-user");
const EditFormUser = document.querySelector("#myEditModal .form-user");
const ArrUser = [];


const url = "http://localhost:3000/users";
const FetchUrl = (url) => {
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error("có lỗi. hãy sửa nó");
      } else {
        return res.json();
      }
    })
    .then((data) => {
      data.forEach((user) => {
        renderUser(user);
      });
    });
};
FetchUrl(url);

const renderUser = (user) => {
  const output = `
        <tr data-id = '${user.id}'>
                <td><input class="checkbox-user" type="checkbox"  value='${user.id}'  /></td>
                <td>${user.fullname}</td>
                <td>${user.phone}</td>
                <td>${user.email}</td>
                <td>${user.age}</td>
                <td> <span>${user.gender}</span> </td>
                <td><a class="btn-edit btn btn-primary btn-sm">Edit</a> |
                    <a class=" btn-del btn btn-danger btn-sm">Del</a>
                </td>
            </tr>
        `;
  ListUers.insertAdjacentHTML("beforeend", output);

const CheckUseId = document.querySelector(`[data-id = '${user.id}'] .checkbox-user`);
  CheckUseId.addEventListener("change", (e) => {
    e.preventDefault();
    if(e.target.checked){
      ArrUser.push(e.target.value)
      console.log(ArrUser); 
    }else{
      const indexToRemove = ArrUser.indexOf(e.target.value);
      ArrUser.splice(indexToRemove, 1);
      console.log(ArrUser);
    }
  });
  // ArrUser.map((e)=> console.log(e))

  const BtnDel = document.querySelector(`[data-id = '${user.id}'] .btn-del`);
  BtnDel.addEventListener("click", (e) => {
    e.preventDefault();
    fetch(`${url}/${user.id}`, {
      method: "delete",
    }).then((res) => res.json());
    // .then(() => location.reload());
  });

  const BtnEdit = document.querySelector(`[data-id = '${user.id}'] .btn-edit`);

  BtnEdit.addEventListener("click", (e) => {
    e.preventDefault();
    $("#myEditModal").modal("show");
    id = user.id;
    (EditFormUser.fullname.value = user.fullname),
      (EditFormUser.phone.value = user.phone),
      (EditFormUser.email.value = user.email),
      (EditFormUser.age.value = user.age),
      (EditFormUser.gender.value = user.gender);
  });
};

FormUser.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fullname: FormUser.fullname.value,
      phone: FormUser.phone.value,
      email: FormUser.email.value,
      age: FormUser.age.value,
      gender: FormUser.gender.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      // const dataArr = [];
      // dataArr.push(data);
      // renderUser(dataArr);
    });
});

EditFormUser.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(`${url}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fullname: EditFormUser.fullname.value,
      phone: EditFormUser.phone.value,
      email: EditFormUser.email.value,
      age: EditFormUser.age.value,
      gender: EditFormUser.gender.value,
    }),
  })
    .then((res) => res.json())
    .then(() => {
      // location.reload();
    });
});
