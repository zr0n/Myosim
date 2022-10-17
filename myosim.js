
const body = document.querySelector("body");
const blurryAll = document.createElement("div");

//setup css and id of template blurry div
blurryAll.style.pointerEvents = "none";

blurryAll.style.position = "fixed";
blurryAll.style.width = "100%";
blurryAll.style.height = "100%";
blurryAll.style.zIndex = "99999";
blurryAll.style.top = "0";
blurryAll.id = "blurryAll";
//end css


const Myosim = {
    injectMyopia : (level = 5)  => {
        console.log("Injecting Myopia...")
        Myosim.setBlurLevel(blurryAll, level);
        body.append(blurryAll);
    },
    destroyMyopia : () => {
        console.log("removing myopia")
        document.getElementById("blurryAll").remove();
    },
    
    updateMyopia : (level = 5) => {
        Myosim.setBlurLevel(document.getElementById("blurryAll"), level);
    },
    setBlurLevel : (div, level) => {
        div.style.backdropFilter = `blur(${level}px`;
    },
    startListeningKeyboard: () => {
        document.addEventListener("keydown", (e) => {
            if(e.ctrlKey && e.key == "m"){
                let newMyopiaLevel = prompt("Insert the desired myopia level (number)");
                newMyopiaLevel = parseFloat(newMyopiaLevel);
                newMyopiaLevel /= 4;

                Myosim.updateMyopia(newMyopiaLevel);

                chrome.storage.sync.set({myopiaLevel: newMyopiaLevel}, function() {
                    console.log('Myopia level is set to ' + newMyopiaLevel);
                });
            }
        })
    }
}

Myosim.injectMyopia(1); 

window.addEventListener("load", function(){ 
    chrome.storage.sync.get(['myopiaLevel'], function(result) {
        Myosim.updateMyopia(result.myopiaLevel);
    });

    Myosim.startListeningKeyboard();
});





