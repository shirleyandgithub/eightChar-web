export interface iEight {
    name: string,
    recordId: number,
    major: {
        year: string,
        month: string,
        day: string,
        hour: string
    },
    heaven: {
        year: string,
        month: string,
        day: string,
        hour: string
    },
    earth: {
        year: string,
        month: string,
        day: string,
        hour: string
    },
    hidden: {
        year: string[],
        month: string[],
        day: string[],
        hour: string[]
    },
    deputyStar: {
        year: string[],
        month: string[],
        day: string[],
        hour: string[]
    },
    naYin:{
        year: string,
        month: string,
        day: string,
        hour: string
    },
    starFortune:{
        year: string,
        month: string,
        day: string,
        hour: string
    },
    kongWang:{
        year: string,
        month: string,
        day: string,
        hour: string
    },
    shenSha:{
        year: string[],
        month: string[],
        day: string[],
        hour: string[]
    },
    baseInfo:{
        gcalendar: string,
        lunarCalendar: string,
        solarTerms: string,
        constellation: string,
        kongWang: string,
        lifePalace: string
    }
}