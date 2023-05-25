const express = require('express');
// const mysql = require('mysql2');
const app = express();
const port = 3000;

// // MySQL 연결 설정
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'password',
//   database: 'mydatabase'
// });

// connection.connect((err) => {
//   if (err) { 
//     console.error('MySQL 연결 실패:', err);
//   } else {
//     console.log('MySQL에 연결되었습니다.');
//   }
// });

// 나머지 코드는 여기에 작성

// 서버 시작
app.listen(port, () => {
  console.log(`웹 서버가 ${port} 포트에서 실행 중입니다.`);
});







// server.js

// 가상의 주차자리 데이터 
const parkingSpots = [
  { id: 1, reserved: false, parked: false },
  { id: 2, reserved: false, parked: false },
  { id: 3, reserved: false, parked: false },
  { id: 4, reserved: false, parked: false },
  { id: 5, reserved: false, parked: false }
];

// 미들웨어 설정
app.use(express.json());

// 로그인 기능
app.post('/login', (req, res) => {
  // 사용자 로그인 처리
  const { username, password } = req.body;
  // 로그인 성공 여부에 따른 응답 전송
  if (username === 'admin' && password === 'password') {
    res.json({ success: true, message: '로그인 성공' });
  } else {
    res.json({ success: false, message: '로그인 실패' });
  }
});

// 주차자리 확인 후 예약 기능
app.post('/parking/reserve', (req, res) => {
  const { spotId } = req.body;
  // 주차자리 예약 처리
  const spot = parkingSpots.find(spot => spot.id === spotId);
  if (spot) {
    if (spot.reserved) {
      res.json({ success: false, message: '해당 주차자리는 이미 예약되었습니다.' });
    } else {
      spot.reserved = true;
      res.json({ success: true, message: '주차자리 예약이 완료되었습니다.' });
    }
  } else {
    res.json({ success: false, message: '주차자리를 찾을 수 없습니다.' });
  }
});

// 주차 인증 기능
app.post('/parking/verify', (req, res) => {
  const { spotId } = req.body;
  // 주차 인증 처리
  const spot = parkingSpots.find(spot => spot.id === spotId);
  if (spot) {
    if (spot.parked) {
      res.json({ success: false, message: '해당 주차자리는 이미 주차되었습니다.' });
    } else {
      spot.parked = true;
      res.json({ success: true, message: '주차가 인증되었습니다.' });
    }
  } else {
    res.json({ success: false, message: '주차자리를 찾을 수 없습니다.' });
  }
});

// 주차확인 및 요금 정산 기능
app.post('/parking/check', (req, res) => {
  const { spotId } = req.body;
  // 주차확인 및 요금 정산 처리
  const spot = parkingSpots.find(spot => spot.id === spotId);
  if (spot) {
    if (!spot.parked) {
      res.json({ success: false, message: '주차된 차량이 없습니다.' });
    } else {
      // 요금 계산 및 시간 측정 로직 구현
      const currentTime = new Date();
      const parkingTime = (currentTime - spot.parkedTime) / 1000; // 주차 시간 (초)
      const parkingFee = calculateParkingFee(parkingTime); // 요금 계산 함수 호출
      res.json({ success: true, message: '주차 확인 완료', parkingTime, parkingFee });
    }
  } else {
    res.json({ success: false, message: '주차자리를 찾을 수 없습니다.' });
  }
});

// 요금 계산 함수 (임의로 1초에 100원으로 가정)
function calculateParkingFee(parkingTime) {
  return parkingTime * 100;
}

