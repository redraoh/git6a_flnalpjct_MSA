
nowmth = new Date().toISOString().slice(0, 7);
nowdt = new Date().toISOString().substring(0, 10);
document.querySelector('#dateInput').value = nowdt;
document.querySelector('#dateInput').max = nowdt;

let schbtn = document.querySelector("#schbtn");

// 검색 기능
schbtn.addEventListener('click', () => {
    alert('공사중입니다.');
});

