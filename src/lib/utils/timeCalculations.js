export function calculateDailyAverage(data, fromDate, toDate) {
  if (!data?.content?.domains) return [];
  
  const domainsData = data.content.domains;
  const result = [];

  const secondsToHHMMSS = (seconds) => {
    const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${secs}`;
  };

  for (const domain in domainsData) {
    const days = domainsData[domain].days;
    let totalSeconds = 0;
    let count = 0;

    for (const day in days) {
      const date = new Date(day);
      if ((!fromDate || date >= fromDate) && (!toDate || date <= toDate) && days[day].seconds != null) {
        totalSeconds += days[day].seconds;
        count += 1;
      }
    }

    if (count > 0) {
      result.push({
        domain: domain,
        average: secondsToHHMMSS(Math.round(totalSeconds / count)),
        averageSeconds: Math.round(totalSeconds / count),
        totalTime: secondsToHHMMSS(totalSeconds),
        totalTimeSeconds: totalSeconds,
        totalDays: count
      });
    }
  }

  return result.sort((a, b) => b.totalTimeSeconds - a.totalTimeSeconds);
}