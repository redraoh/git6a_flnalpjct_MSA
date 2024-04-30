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
    if (alres.ok) {
        const aldata = await alres.json()
        return aldata;
    } else {
        throw new Error('전체 할인권 정보 조회 실패!');
    }
};

// 할인권 첫페이지 정보 조회
const getCouponInfoPage = async () => {
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

// nav test
const displayNavigation = (alcps) => {
    const navuilist = document.querySelector('#navui');

    let cpg = 1;
    let stpg = Math.floor((cpg - 1) / 10) * 10 + 1;
    let cnt = alcps.length;
    let allpage = Math.ceil(cnt / 10);

    console.log(allpage);

    let html = `
        <li class="disabled">
            <a
                class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-1 pl-2.5"
                aria-label="Go to previous page"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-4 w-4"
                >
                    <path d="m15 18-6-6 6-6"></path>
                </svg>
                <span>Previous</span>
            </a>
        </li>
    `;
    if (allpage > 1) {
        for (let i = 0; i < allpage; i++) {
            html += `
                <li class="page-item active">
                    <a class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
                       href="">${i + 1}</a>
                </li>
            `;
        }
    } else {
        html += ``;
    }
    html += `
        <li class="">
            <a
                class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-1 pr-2.5"
                aria-label="Go to next page"
            >
                <span>Next</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-4 w-4"
                >
                    <path d="m9 18 6-6-6-6"></path>
                </svg>
            </a>
        </li>
    `;
    navuilist.innerHTML = html;
};


// 페이지 로드시 실행
window.addEventListener('load', async () => {
    try {
        const alcps = await getCouponInfo();
        const coupons = await getCouponInfoPage();
        displayCouponInfo(coupons);
        displayNavigation(alcps);
        console.log(coupons);
        console.log(alcps);
    } catch (e) {
        console.error(e);
        alert('할인권 목록 조회 실패!!');
    }
});

