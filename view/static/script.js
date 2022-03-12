$(document).ready(function() {
    if (localStorage.getItem("login_key") === null) {
        window.location.href = '/login'            //nếu chưa có data login thì sẽ về page login
    }
    else {
        show_email();           //gọi hàm show_email
    }
});

function show_email(){
    user_id = localStorage.getItem("login_key");
    request = $.ajax({
            url : "/users/" + user_id,
            contentType : 'application/json',     //kiểu dữ liệu truyền lên
            type : "GET",                      //method
    });
    request.done(function(response) {              //response là giá trị từ object schemas.UserDetailResponse trả về
          $('#show_email').html(response.email);
    });
    request.fail(function(content) {
          console.log(jqXHR.responseJSON);
		  $('#error_message').text(jqXHR.responseJSON)
    });
}



function shuffle(array) {
  var currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}



let can_spin = true;


function spin() {
    if (can_spin == false){
        swal(
              "Đáng tiếc",
              "Bạn đã hết lượt chơi hôm nay",
              "error"
            );
        return
    }
      // Play the sound
      wheel.play();
      // Inisialisasi variabel
      const box = document.getElementById("box");
      const element = document.getElementById("mainbox");
      let SelectedItem = "";

      // Shuffle 450 karena class box1 sudah ditambah 90 derajat diawal. minus 40 per item agar posisi panah pas ditengah.
      // Setiap item memiliki 12.5% kemenangan kecuali item sepeda yang hanya memiliki sekitar 4% peluang untuk menang.
      // Item berupa ipad dan samsung tab tidak akan pernah menang.
      // let Sepeda = shuffle([2210]); //Kemungkinan : 33% atau 1/3
      let number1 = shuffle([1600]);
      let number8 = shuffle([1720]);
      let number9 = shuffle([1675]);
      let MagicRoaster = shuffle([1890, 2250, 2610]);
      let Sepeda = shuffle([1850, 2210, 2570]); //Kemungkinan : 100%
      let RiceCooker = shuffle([1810, 2170, 2530]);
      let LunchBox = shuffle([1770, 2130, 2490]);
      let Sanken = shuffle([1750, 2110, 2470]);
      let Electrolux = shuffle([1630, 1990, 2350]);
      let JblSpeaker = shuffle([1570, 1930, 2290]);

      // Bentuk acak
      let Hasil = shuffle([
        number1[0],
        number8[0],
        number9[0],
        MagicRoaster[0],
        Sepeda[0],
        RiceCooker[0],
        LunchBox[0],
        Sanken[0],
        Electrolux[0],
        JblSpeaker[0],
      ]);
      // console.log(Hasil[0]);

      // Ambil value item yang terpilih
      if (number1.includes(Hasil[0])) SelectedItem = "1";
      if (number8.includes(Hasil[0])) SelectedItem = "8";
      if (number9.includes(Hasil[0])) SelectedItem = "9";
      if (MagicRoaster.includes(Hasil[0])) SelectedItem = "3";
      if (Sepeda.includes(Hasil[0])) SelectedItem = "4";
      if (RiceCooker.includes(Hasil[0])) SelectedItem = "5";
      if (LunchBox.includes(Hasil[0])) SelectedItem = "6";
      if (Sanken.includes(Hasil[0])) SelectedItem = "7";
      if (Electrolux.includes(Hasil[0])) SelectedItem = "10";
      if (JblSpeaker.includes(Hasil[0])) SelectedItem = "2";

      // Proses
      box.style.setProperty("transition", "all ease 5s");
      box.style.transform = "rotate(" + Hasil[0] + "deg)";

    data = {
            score: SelectedItem
        }

    user_id = localStorage.getItem("login_key");
    request = $.ajax({
            url : "/users/" + user_id + "/score",
            contentType : 'application/json',     //kiểu dữ liệu truyền lên
            type : "PUT",                      //method
            dataType : 'json',                //làm rõ loại data
            data : JSON.stringify(data)       //body của data, dữ liệu truyền trong body
        });
    request.done(function(response) {
          element.classList.remove("animate");
          setTimeout(function () {
            element.classList.add("animate");
          }, 5000);

        // Munculkan Alert
        setTimeout(function () {
                applause.play();
                swal(
                  "Xin chúc mừng",
                  "Bạn đã được " + SelectedItem + " điểm. Tổng điểm hiện tại là " + response,
                  "success"
                );
              }, 5500);

        //   Delay and set to normal state
        setTimeout(function () {
                box.style.setProperty("transition", "initial");
                box.style.transform = "rotate(90deg)";
              }, 6000);
    });
    request.fail(function(content) {
          if (content.responseJSON == "đã hết lượt quay hôm nay"){
            can_spin = false;
          };
          setTimeout(function () {
            applause.play();
            swal(
              "Rất tiếc",
              content.responseJSON,
              "error"
            );
          }, 5500);
        });
}





