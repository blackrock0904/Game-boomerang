function formatDuration(seconds) {
  const ONE_MINUTE = 60;
  const ONE_HOUR = 60 * ONE_MINUTE;
  const ONE_DAY = 24 * ONE_HOUR;
  const ONE_YEAR = 365 * ONE_DAY;
  let y = Math.floor(seconds / ONE_YEAR);
  let d = Math.floor((seconds - y * ONE_YEAR) / ONE_DAY);
  let h = Math.floor((seconds - d * ONE_DAY - y * ONE_YEAR) / ONE_HOUR);
  let m = Math.floor((seconds - h * ONE_HOUR - d * ONE_DAY - y * ONE_YEAR) / ONE_MINUTE);
  let s = seconds - m * ONE_MINUTE - h * ONE_HOUR - d * ONE_DAY - y * ONE_YEAR;
  return `${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`;
}

module.exports = {
  formatDuration
}
