// this codebase contains the functionality for the favourite token setting and retrieval
import { toast } from 'react-toastify'; // notify user of changes

export const toggleLikeToken = (tokenId:string, tokenName:string, tokenSymbol:string, tokenOldPrice:string): any => {
    let addedTokenNotifier = `${tokenName} (${tokenSymbol}) added to liked tokens`
    let removedTokenNotifier = `${tokenName} (${tokenSymbol}) removed from liked tokens`
    // check if likes exist yet
    let anyLikesYet = localStorage['likedTokens'] === undefined ? false : true;

    if (anyLikesYet === false) {
    // if likes don't exist, create them and add the first token
        localStorage.setItem('likedTokens', JSON.stringify({[tokenId]: {"tokenName": tokenName, "tokenSymbol": tokenSymbol, "tokenOldPrice": tokenOldPrice}}));
        console.log(addedTokenNotifier, localStorage);
        toast.success(addedTokenNotifier)   
    }
    else {
        let tokenList = JSON.parse(localStorage.getItem('likedTokens') || '{}');
        let tokenIsLiked = tokenId in tokenList
        
        if (tokenIsLiked) {
        // if likes exist and the token is liked, delete it
            let currentTokenList = JSON.parse(localStorage.getItem('likedTokens') || '{}');
            delete currentTokenList[tokenId];
            localStorage.setItem('likedTokens', JSON.stringify(currentTokenList));
            // console.log(removedTokenNotifier, localStorage);
            toast.error(removedTokenNotifier)
        } 
        else {
           // if likes exist and the token isn't liked, add it
            tokenList[tokenId] = {"tokenName": tokenName, "tokenSymbol": tokenSymbol, "tokenOldPrice": tokenOldPrice};
            localStorage.setItem('likedTokens', JSON.stringify(tokenList));
            // console.log(addedTokenNotifier, localStorage);
            toast.success(addedTokenNotifier)
        }
    }


}


export const clearLikedTokens = () => {
    let clearedTokensNotifier = `Removing all liked tokens...`
    localStorage.removeItem('likedTokens');
    toast.info(clearedTokensNotifier)
    setTimeout(() => {location.reload()}, 2000)  
}