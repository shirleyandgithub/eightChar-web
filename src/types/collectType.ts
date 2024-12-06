export interface iCollect{
    collectid?: string,
    pro:{
        proid: string,
        title: string,
        proname: string,
        img: string[],
        desc: string,
        label: string,
        price: number,
        collectid?: string
    }
}