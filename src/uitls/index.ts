import dayjs from "dayjs";

export const dateFormat = (date: Date, format: string) => {
    return dayjs(date).format(format)
}
