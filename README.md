# app-testing (TODO)

## Description
Todo adalah aplikasi web untuk menulis task. Nanti ada halaman utama yang memunculkan untuk registrasi dan login. Setelah melakukan registrasi dan login akan masuk ke halaman home dimana ditampilkan task todo yang sudah selesai dikerjakan dan yang belum dikerjakan. Ada juga ditampilkan informasi cuaca dan lokasi yang diinginkan.

Halaman berikutnya ada untuk menulis task todo, add todo, edit todo, tag todo selesai dan delete todo. Halaman selanjutnya ada informasi profile pengguna, baik name, email, phone number. Di halaman ini juga user dapat mengubah dan memperbaharui informasi profilenya. 


## API Endpoint

List of basic routes user:

|Route                   | HTTP | Description                                     |
|------------------------|------|-------------------------------------------------|
|'/index/login'          | POST | user login into the application                 |
|'/index/register'       | POST | user register for get account                   |
|'/index/loginfb'        | POST | user login into the application with account FB |
|'/user/update-user'     | PUT  | user can edit information account               |
|'/user/change-password' | PUT  | user can edit password account                  |


List of basic routes todo:

|Route               | HTTP   | Description                |
|--------------------|--------|----------------------------|
|'/todo/show'        | GET    | getting all todo           |
|'/todo/show/:status'| GET    | getting all todo by status |
|'/todo/add'         | POST   | create a new todo          |
|'/todo/update/:id'  | PUT    | edit todo by Id            |
|'/todo/finish/:id'  | PUT    | edit status todo by Id     |
|'/todo/delete/:id'  | DELETE | delete a significant todo  |

