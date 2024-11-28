export const recallCurrentPage:any = () => {

    let memoryPage = sessionStorage.getItem('currentPage')

    if (memoryPage == undefined) {
        return 1
    }
    else {
        return JSON.parse(memoryPage)
    }
}

export const recallCurrentStart:any = () => {

    let memoryStart = sessionStorage.getItem('currentStart')

    if (memoryStart == undefined) {
        return 0
    }
    else {
        return JSON.parse(memoryStart)
    }
}

export const storeCurrentPage:any = (page:number) => {
    sessionStorage.setItem('currentPage', JSON.stringify(page))
}

export const storeCurrentStart:any = (start:number) => {
    sessionStorage.setItem('currentStart', JSON.stringify(start))
}