import { CalendarDate, DateFormatter } from '@internationalized/date'

/** 格式化  */
export function formatDate(date: Date) {
  const formatter = new DateFormatter('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  // 格式化日期并分离出各部分
  const [{ value: day }, , { value: month }, , { value: year }] = formatter.formatToParts(date)

  // 返回 yyyy-MM-dd 格式的日期
  return `${year}-${month}-${day}`
}

/** 获取当前月的范围 */
export function getCurrentMonth() {
  const now = new Date()

  // 当前月份的第一天
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  // 当前月份的最后一天
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

  // 创建 CalendarDate 对象
  const startCalendarDate = new CalendarDate(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, startOfMonth.getDate())
  const endCalendarDate = new CalendarDate(endOfMonth.getFullYear(), endOfMonth.getMonth() + 1, endOfMonth.getDate())

  return {
    startCalendarDate,
    endCalendarDate,
  }
}

/**
 *  获取指定月的范围
 * @param time yyyy-MM
 * @returns
 */
export function getTheMonthRange(time: Date) {
  const now = new Date(time)
  console.log(now)

  // 当前月份的第一天
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  // 当前月份的最后一天
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

  // 创建 CalendarDate 对象
  // const startCalendarDate = new CalendarDate(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, startOfMonth.getDate())
  // const endCalendarDate = new CalendarDate(endOfMonth.getFullYear(), endOfMonth.getMonth() + 1, endOfMonth.getDate())

  return {
    startTime: startOfMonth,
    endTime: endOfMonth,
  }
}
