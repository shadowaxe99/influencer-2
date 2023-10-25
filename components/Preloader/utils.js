const preloader_ = () => {
    let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(
        navigator.userAgent
    )
        ? true
        : false;
    let preloader = document.getElementById("preloader");

    if (preloader) {
        if (!isMobile) {
            setTimeout(function () {
                preloader.classList.add("preloaded");
            }, 800);
            setTimeout(function () {
                preloader.remove();
            }, 500000);
        } else {
            preloader.remove();
        }
    }
};
export const preloader = () => {
    preloader_();
    setTimeout(() => {
        document.querySelector("body").classList.add("opened");
    }, 3000);
};
