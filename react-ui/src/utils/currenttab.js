export function currentTab() {
    // return authorization header with jwt token
    let currentTab = localStorage.getItem('currentTab');

    console.log(currentTab)
    if (currentTab) {
        return currentTab;
    } else {
        return null;
    }
}