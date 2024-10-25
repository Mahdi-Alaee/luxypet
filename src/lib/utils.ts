import { toJalaali } from 'jalaali-js';
export function calculateAge(now: string, birthDate: string): string {
    // Parse the input dates (assuming format "YYYY-MM-DD" for now and "YYYY/MM/DD" for birthDate)
    const [nowYear, nowMonth, nowDay] = now.split("-").map(Number);
    const [birthYear, birthMonth, birthDay] = birthDate.split("/").map(Number);
  
    // Create Date objects for comparison (considering Gregorian calendar)
    const nowDate = new Date(nowYear, nowMonth - 1, nowDay);
    const birthDateObj = new Date(birthYear, birthMonth - 1, birthDay);
  
    // Calculate the difference in time (milliseconds)
    const diffInMs = nowDate.getTime() - birthDateObj.getTime();
    
    // Convert milliseconds to days, months, and years
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInMonths = Math.floor(diffInDays / 30); // Rough estimate for months
    const diffInYears = Math.floor(diffInDays / 365); // Rough estimate for years
  
    // Determine the appropriate age unit
    if (diffInYears > 0) {
      return `${diffInYears} ساله`;
    } else if (diffInMonths > 0) {
      return `${diffInMonths} ماهه`;
    } else {
      return `${diffInDays} روزه`;
    }
  }


export function convertGregorianToJalali(gregorianDate: string): string {
  // Parse the input date in format "YYYY-MM-DD"
  const [year, month, day] = gregorianDate.split("-").map(num => Number(num));
 
  // Convert to Jalali (Shamsi) date
  const jalaaliDate = toJalaali(year, month, day);

  // Format the result as "YYYY/MM/DD"
  return `${jalaaliDate.jy}-${String(jalaaliDate.jm).padStart(2, "0")}-${String(jalaaliDate.jd).padStart(2, "0")}`;
}