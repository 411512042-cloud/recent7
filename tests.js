// 規則 1：日期範圍（包含今天及前 6 天；超過 7 天前或未來日期不算；空陣列回傳 0）
addCase({
  name: '規則 1：剛好包含今天與前第 6 天的邊界紀錄',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: 30 },
    { log_date: '2026-11-17', minutes: 20 }
  ],
  expect: { minutes: 50, count: 2 }
});

addCase({
  name: '規則 1：排除超過 7 天前（前第 7 天）與未來的日期',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: 30 },
    { log_date: '2026-11-16', minutes: 99 },
    { log_date: '2026-11-24', minutes: 50 }
  ],
  expect: { minutes: 30, count: 1 }
});

addCase({
  name: '規則 1：完全沒有任何學習紀錄時回傳 0 分鐘 0 筆',
  today: '2026-11-23',
  records: [],
  expect: { minutes: 0, count: 0 }
});

// 規則 2：minutes 為 null 或缺少 minutes 欄位不算有效紀錄
addCase({
  name: '規則 2：minutes 為 null 的紀錄不算有效筆數',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: 30 },
    { log_date: '2026-11-23', minutes: null }
  ],
  expect: { minutes: 30, count: 1 }
});

addCase({
  name: '規則 2：缺少 minutes 欄位的紀錄視同 null，不算有效筆數',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-22', minutes: 40 },
    { log_date: '2026-11-23' }
  ],
  expect: { minutes: 40, count: 1 }
});

// 規則 3：單筆學習時間超過 120 分鐘上限
addCase({
  name: '規則 3：單筆超過 120 分鐘只採計 120 分鐘（剛好 120 分鐘則全算）',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: 150 },
    { log_date: '2026-11-22', minutes: 120 }
  ],
  expect: { minutes: 240, count: 2 }
});

// 規則 4：小數分鐘照原值計算
addCase({
  name: '規則 4：小數分鐘照原值加總計算',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: 12.5 },
    { log_date: '2026-11-21', minutes: 7.5 }
  ],
  expect: { minutes: 20, count: 2 }
});

// 規則 5：同一天有多筆有效紀錄
addCase({
  name: '規則 5：同一天有多筆有效紀錄時各自計數並各自套用 120 分鐘上限',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: 140 },
    { log_date: '2026-11-23', minutes: 50 },
    { log_date: '2026-11-23', minutes: null }
  ],
  expect: { minutes: 170, count: 2 }
});

// 綜合情境（包含第 1 步老師給的五筆資料）
addCase({
  name: '規則 1、2：老師範例五筆資料綜合測試',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: 30 },
    { log_date: '2026-11-17', minutes: 20 },
    { log_date: '2026-11-23', minutes: null },
    { log_date: '2026-11-16', minutes: 99 },
    { log_date: '2026-11-24', minutes: 50 }
  ],
  expect: { minutes: 50, count: 2 }
});

addCase({
  name: '規則 1～5：所有規則混合綜合測試',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: 130 },
    { log_date: '2026-11-23', minutes: 15.5 },
    { log_date: '2026-11-17', minutes: 10 },
    { log_date: '2026-11-17' },
    { log_date: '2026-11-16', minutes: 60 },
    { log_date: '2026-11-25', minutes: 20 }
  ],
  expect: { minutes: 145.5, count: 3 }
});
