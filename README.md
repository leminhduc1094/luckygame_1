# luckygame
vòng quay may mắn

Khi tạo project thì tick vào readme và .git

1 : Tạo venv
setting  -> Project: luckygame  -> Python Interpreter
Ở Python Interpreter tạo mới Python -> show all -> +  ->  OK

2 : Install library
pip install fastapi
pip install uvicorn
pip install sqlalchemy
pip freeze > requirement.txt

3 : Tạo database (là file DB khai báo cơ sở dữ liệu)

4 : Tạo file models (là file bảng DB)

5 : Tạo DateTime
import DateTime chọn sql...

6 : import từ database
Tự động tạo db (table) tương ứng với models   (dòng 9)
Tạo def để lấy SessionLocal trong main.py  (dòng 16-21)

7 : Tạo file schemas (lược đồ)



8 : Tạo thư mục view
Trong view tạo thư mục template và static
Tạo index.html trong template
Tạo index.css và index.js trong static

9 : Gắn CSS và JS cho HTML
<link rel="stylesheet" href="static/index.css">
<script rel="stylesheet" href="static/index.js"></script>


10 : Gọi file js thì chạy luôn (vào trang chủ nếu chưa login thì sẽ ra trang login)
$(document).ready(function() {
});

search : check localstorage get item
-> https://stackoverflow.com/questions/3262605/how-to-check-whether-a-storage-item-is-set

11 : cop code vào login html
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="static/login.js"></script>

12 : search button on click
https://www.w3schools.com/jsref/event_onclick.asp


Tất cả function trong .ready khi vào sẽ tự động run
Các function ngoài .ready thì cần action thì mới run

13 : Tạo function cho file login.js
Nhập email, pass ở html
Ấn submit
Sang file login.js của myFunction
Gửi data lên server rồi server trả về token để lưu ở localstorage
Local sẽ kiểm tra nếu ko có token sẽ bắt đăng nhập


14 : tạo function logout
tạo file logout.js

15 : 
check trên BE ko nhận value
=> client chưa gửi value
check bằng f12 -> request -> thấy chưa gửi value -> lỗi ở ajax -> debug ở ajax (ko thấy dữ liệu)
-> sai hàm lấy giá trị input

16 : call api update score bằng ajax từ js
file script.js dòng 81-123

17 : Tạo hàm xét datetime để 1 ngày chỉ spin được 1 lần
file crud.py - def user_score_update
check t/h user ko tồn tại
check xem có spin được hay ko
update score

*Khi dùng ajax thì nếu method là GET sẽ ko có body (data), chỉ có body khi là PUT, POST, DELETE


18 : show email trả về từ response lên FE
Login thì trả về id
Tạo ajax gọi api dùng id trả về email
show email lên FE

19 : xét hàm spin không cho quay khi hết lượt quay trong ngày
*let : dùng để hỗ trợ khai báo biến trên mọi browser



tạo 1 biến là true hoặc false
khi login sẽ get played at và so sánh xem có chơi đc ko
set played at xem là true hay false







