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
  }
  for (let i=0; i<720; i++) {
    if(i>12*timeInput) break;
    const rotationSpace = document.createElement('div');
    rotationSpace.classList.add('rotation');
    rotationSpace.style.transform = `rotate(${90-i / 2}deg)`;
    rotationSpace.style.transformOrigin= `right bottom`;
    $("div#timerCircle").append(rotationSpace);
  }
}


// start 버튼을 눌렀을 때
function func_start(){
  let timeInput = $("#timeInput").val();
  if(timeInput==null||timeInput==""||timeInput=="0"){
    alert("타이머 값을 설정해주세요");
  } else if(timeInput=="0"){

  }


}

// stop 버튼을 눌렀을 때
function func_stop(){

}