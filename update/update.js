import { request as axios } from "axios";

function versionCompare(myVersion, minimumVersion) {

    var v1 = myVersion.split("."), v2 = minimumVersion.split("."), minLength;   

    minLength= Math.min(v1.length, v2.length);

    for(i=0; i<minLength; i++) {
        if(Number(v1[i]) > Number(v2[i])) {
            return true;
        }
        if(Number(v1[i]) < Number(v2[i])) {
            return false;
        }           
    }

    return (v1.length >= v2.length);
}

let worldLoadMessage = false;

register("worldLoad", () => {
    if (worldLoadMessage) return;
    try {
        axios({
            url: "https://raw.githubusercontent.com/BusterBrown1218/HTSL/main/metadata.json",
            method: 'GET'
        }).then(response => {
            const latestVersion = response.data.version;
            const currentVersion = JSON.parse(FileLib.read("HTSL", "./metadata.json")).version;
            if (versionCompare(currentVersion, latestVersion)) {
                return ChatLib.chat(`&3[HTSL] &fLoaded successfully!`);
            }
            ChatLib.chat("&3[HTSL] &fNew HTSL version available!");
            
        });
    } catch (error) {
        ChatLib.chat("&3[HTSL] &fError while checking version");
    }
    worldLoadMessage = true;
});