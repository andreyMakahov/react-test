var Utils = {
    isLocalStorageSupported: function () {
        "use strict";
        try {
            var supported = ("localStorage" in window && window["localStorage"]);
            if (supported) {
                localStorage.setItem("storage", "");
                localStorage.removeItem("storage");
                return supported;
            }
        }catch(err) {
            return false
        }
    },
    getFromLocalStorage: function (key) {
        "use strict";
        if(this.isLocalStorageSupported()) {
            return localStorage.getItem(key);
        }
        return null;
    },

    setToLocalStorage: function (key, value) {
        "use strict";
        if(this.isLocalStorageSupported()) {
            return localStorage.setItem(key, value);
        }
        return null;
    }
};