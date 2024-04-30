// input 기본 값 설정
let nowmth = new Date().toISOString().slice(0, 7);
let nowdt = new Date().toISOString().substring(0, 10);

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

// 할인권 전체 정보 조회
const getCouponInfo = async () => {
    const alres = await fetch(`http://127.0.0.1:8040/coupons`)
    const res = await fetch(`http://127.0.0.1:8040/coupons/1`)
    if (alres.ok) {
        const aldata = await alres.json()
        const data = await res.json()
        return aldata, data;
    } else {
        throw new Error('전체 할인권 정보 조회 실패!');
    }
};


// 할인권 첫페이지 정보 조회
const getCouponInfoFirstPage = async () => {
    const res = await fetch(`http://127.0.0.1:8040/coupons/1`)
    if (res.ok) {
        const data = await res.json()
        return data;
    } else {
        throw new Error('첫페이지 할인권 정보 조회 실패!');
    }
};

// coupon log 조회
const displayCouponInfo = (coupons) => {
    const couponlist = document.querySelector('#cptbody');
    let html = '';
    if (coupons.length !== 0) {
        for (const c of coupons) {
            html += `
            <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    ${c.disc_time}
                </td>
                <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    ${c.disc}
                </td>
                <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    유료
                </td>
                <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    ${c.usec}
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
        displayCouponInfo(coupons);
        console.log(coupons);
    } catch (e) {
        console.error(e);
        alert('할인권 목록 조회 실패!!');
    }
});

