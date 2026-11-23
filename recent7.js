function recent7(records, today) {
  const todayDate = new Date(`${today}T00:00:00Z`);
  const firstDate = new Date(todayDate);
  firstDate.setUTCDate(firstDate.getUTCDate() - 6);

  let minutes = 0;
  let count = 0;

  for (const record of records) {
    const logDate = new Date(`${record.log_date}T00:00:00Z`);

    if (logDate < firstDate || logDate > todayDate) continue;
    if (record.minutes == null) continue;

    minutes += Math.min(record.minutes, 120);
    count += 1;
  }

  return { minutes, count };
}
