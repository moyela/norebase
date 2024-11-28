// retrieve session storage data for a given state value
export const recallSessionStorageState = (stateName: string, defaultResponse:any) => {
    let memory = sessionStorage.getItem(stateName)

    if (memory == undefined) {
        return defaultResponse
    }
    else {
        return JSON.parse(memory)
    }
}

// save session storage data for a given state value
export const storeSessionStorageState = (stateName: string, stateData:any) => {
    sessionStorage.setItem(stateName, JSON.stringify(stateData))
}
