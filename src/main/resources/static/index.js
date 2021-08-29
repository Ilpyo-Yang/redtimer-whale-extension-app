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
    number.innerHTML="<div class='timerNum' style='transform: rotate("+-30*i+"deg)'>"+i*5+"</div>";
    number.classList.add('number');
    $("div#mainClock").append(number);
  }
}

// start 버튼을 눌렀을 때
function func_start(){
  let startBtn = $("#start");
  if(startBtn==null){
    $("#timeInput").innerText("15");
  } else {

  }
}

// stop 버튼을 눌렀을 때
function func_stop(){

}