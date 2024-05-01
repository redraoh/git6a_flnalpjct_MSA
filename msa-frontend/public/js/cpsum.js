nowmth = new Date().toISOString().slice(0, 7);
nowdt = new Date().toISOString().substring(0, 10);
let mthrdo = document.querySelector('#month');
let dtrdo = document.querySelector('#date');

document.getElementById('monthInput').value = nowmth;
document.getElementById('monthInput').max = nowmth;

document.getElementById('dateInput').value = nowdt;
document.getElementById('dateInput').max = nowdt;

let tablemt = document.querySelector('.tablemth');
let tabledt = document.querySelector('.tabledt');


// 라디오 버튼 클릭 이벤트 리스너 추가
mthrdo.addEventListener('change', () => {
    document.querySelector('.mon').classList.remove('hid');
    document.querySelector('.dt').classList.add('hid');
});

dtrdo.addEventListener('change', () => {
    document.querySelector('.mon').classList.add('hid');
    document.querySelector('.dt').classList.remove('hid');
});


// 검색 기능
document.addEventListener('DOMContentLoaded', () => {
    let cpschbtn = document.querySelector("#cpschbtn");

    cpschbtn.addEventListener('click', () => {

        alert('공사중입니다.');
    });
});

// 할인권 정보 조회
const getCouponInfo = async () => {
    const res = await fetch(`http://127.0.0.1:8040/sumfind`)
    if (res.ok) {
        const data = await res.json()
        return data;
    } else {
        throw new Error('할인권 정보 조회 실패!');
    }
};


// coupon sum 조회
const displayCouponSum = (coupons) => {
    const couponlist = document.querySelector('#cpsumtbody');
    let html = '';
    if (coupons.length !== 0) {
        for (const c of coupons) {
            html += `
            <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td id="dsctm"
                    class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0"
                    rowspan="{{ srchcnt }}">
                    ${c.disc_time}
                </td>
                <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    ${c.disc}
                </td>
                <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    유료
                </td>
                <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    1
                </td>
            </tr>
            `;
        }
    } else {
        html += `
            <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-center" colspan="4">
                    쿠폰 사용 정보가 없습니다.
                </td>
            </tr>
        `;
    }
    html += '';
    couponlist.innerHTML = html;
};


// 페이지 로드시 실행
window.addEventListener('load', async () => {
    try {
        const coupons = await getCouponInfo();
        displayCouponSum(coupons);
        console.log(coupons);
    } catch (e) {
        console.error(e);
        alert('할인권 목록 조회 실패!!');
    }
});