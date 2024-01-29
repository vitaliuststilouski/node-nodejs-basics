const parseArgs = () => {
    const { argv } = process;
    const argumentList = argv.slice(2);
    const list = [];

    for (let i = 0; i < argumentList.length; i += 2) {
        const k = argumentList[i].slice(2);
        const v = argumentList[i + 1];
        list.push(`${k} as ${v}`);
    }
    console.log(list.join(", "));
};

parseArgs();
