let interval; // timer interval
let startingTime; // start 설정한 값
let count;  // 기록된 갯수
let today; // 오늘 날짜
let alertStatus;  // 알람여부


$(function(){
  $("img#on").hide();
  $("span#stop").hide();
  $("span#restart").hide();
  $("img#down").hide();
  func_clock();
  func_inputTime();
  $("#recodeRequest").hide();
  $("#alertModal").hide();
  $("audio").hide();

  $("#off").click(function(){
    $("img#off").hide();
    $("img#on").show();
    alertStatus=1;
  })
  $("#on").click(function(){
    $("img#off").show();
    $("img#on").hide();
    $('#alertModal').fadeOut();
    alertStatus=0;
  })

  $("#timeInput").change(function(){
    func_inputTime();
  })

  $("#start").click(function(){
    func_start();
  })
  $("#stop").click(function(){
    func_stop();
  })
  $("#restart").click(function(){
    func_restart();
  })

  $("#down").click(function(){
    func_down();
  })
  $("#up").click(function(){
    func_up();
  })

  $("#closeRecodeModal").click(function(){
    $('#recodeRequest').fadeOut();
    $("#timerEndSound").get(0).pause();
  })
  $("#recodeBtn").click(function(){
    func_recode();
    $('#alertModal').fadeOut();
  })

  $("#closeAlertModal").click(function(){
    $('#alertModal').fadeOut();
  })

})


// 초기 타이머 세팅
function func_clock(){
  for (let i=0; i<30; i++) {
    const line = document.createElement('div');
    if(i%5==0){
      line.classList.add('line2');
    }
    else {
      line.classList.add('line1');
    }
    line.classList.add('line');
    line.style.transform = `rotate(${6 * i}deg)`;
    $("div#mainClock").append(line);
  }
  for (let i=0; i<12; i++) {
    let number = document.createElement('div');
    number.style.transform = `rotate(${30*i}deg)`;
    if(i==0){
      number.innerHTML="<div class='timerNum' style='transform: rotate("+(-30*i)+"deg)'>"+0+"</div>";
    }
    else {
      number.innerHTML="<div class='timerNum' style='transform: rotate("+(-30*i)+"deg)'>"+(12-i)*5+"</div>";
    }
    number.classList.add('number');
    $("div#mainClock").append(number);
  }
}


// 타이머 세팅 후 해당시간만큼 원으로 표시
function func_inputTime(){
  $("div#timerCircle").empty();
  let timeInput = $("#timeInput").val();
  if(timeInput>60){
    $("#timeInput").val("60");
    timeInput=60;
  }
  else if(timeInput<0){
    $("#timeInput").val("0");
    timeInput=0;
  }
  for (let i=0; i<1440; i++) {
    if(i>24*timeInput) break;
    const rotationSpace = document.createElement('div');
    rotationSpace.classList.add('rotation');
    rotationSpace.style.transform = `rotate(${90-i / 4}deg)`;
    rotationSpace.style.transformOrigin= `right bottom`;
    $("div#timerCircle").append(rotationSpace);
  }
}


// timer 진행을 나타내는 함수
function func_timer(){
  let timeInput = $("#timeInput").val();
  $("#timeInput").val(timeInput-1);
  if(timeInput==1){
    clearInterval(interval);
    $("span#stop").hide();
    $("span#start").show();
    $("span#restart").show();
    if(alertStatus==1){
      $("#timerEndSound").get(0).volume=0.1;
      $("#timerEndSound").get(0).play();
    }
    $("#recodeRequest").fadeIn();
  }
  else if(timeInput>1){
    func_inputTime();
  }
}


// start 버튼을 눌렀을 때
function func_start(){
  let timeInput = $("#timeInput").val();
  startingTime = timeInput;
  if(timeInput==null||timeInput==""||timeInput=="0"){
    $("#alertModal").fadeIn();
  } else {
    $("span#start").hide();
    $("span#restart").hide();
    $("span#stop").show();
    interval = setInterval(function(){func_timer()}, 60000);
  }
  func_countRecodes();
  $("#recodeInput").val("RECODE_"+(count+1)); // 미리 모달창에 값 입력해두기
}


// stop 버튼을 눌렀을 때
function func_stop(){
  clearInterval(interval);
  $("span#stop").hide();
  $("span#restart").hide();
  $("span#start").show();
}


// restart 버튼을 눌렀을 때
function func_restart(){
  $("span#restart").hide();
  $("span#start").hide();
  $("span#stop").show();
  $("#timeInput").val(startingTime);
  func_inputTime();
  func_start();
}


// 이미 기록된 리스트 개수 알아오기
function func_countRecodes(){
  count = $("tbody tr").length;
}


// 오늘 날짜 가져오기
function func_getToday(){
  let now = new Date();
  let year = now.getFullYear();
  year = String(year).substr(2,2);
  let month = now.getMonth() + 1;
  let date = now.getDate();
  if(month<10){
    today = year + "/0" + month
  } else {
    today = year + "/" + month
  }
  if(date<10){
    today += "/0" + date
  } else {
    today += "/" + date
  }
}


// recode 제목을 입력하고 기록한 경우
function func_recode(){
  $("#recodeRequest").fadeOut();
  let recodeInput = $("#recodeInput").val();
  func_countRecodes();
  func_getToday();

  let detail = "<tr><td>"+(count+1)+"</td>"
            + "<td>"+today+"</td>"
            + "<td>"+recodeInput+"</td>"
            + "<td>"+startingTime+"</td></tr>";
  $("tbody").append(detail);
}


// 리스트 up 버튼
function func_up(){
  $("img#up").hide();
  $("img#down").show();
  $("#recodeList").hide();
}

// 리스트 down 버튼
function func_down(){
  $("img#down").hide();
  $("img#up").show();
  $("#recodeList").show();
}
