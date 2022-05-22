export const OTPs = () => Math.floor(1000 + Math.random() * 9000);

export const paginator = (totalCount: number, limit: number, page: number) => {
    let firstPage: number = 0;
    let pages: number[] = [];
    let lastPage: number = 0;
    let setfirst: number = 0;
    let setlast: number = 0;

    lastPage = Math.ceil(totalCount / limit);
    if (lastPage > 0) {
        firstPage = 1;
        if (page == 1) {
            setfirst = 1;
        } else {
            setfirst = Number(page) - 2;
        }
        if (page == lastPage) {
            setlast = lastPage;
        } else {
            setlast = Number(page) + 2;
        }

        for (let i = setfirst; i < Number(setlast) + 1; i++) {
            if (i > 0 && i <= lastPage) pages.push(i);
        }
    }

    return {
        firstPage,
        lastPage,
        pages
    };
};

export const randomString = (limit: number) => {
    let result = "";
    let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < limit; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
};
