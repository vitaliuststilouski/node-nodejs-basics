const parseEnv = () => {
    const { env } = process;
    const listArray = [];

    for (const [k, v] of Object.entries(env)) {
        if (k.startsWith('RSS_')) {
            listArray.push(`${k}=${v}`);
        }
    }
};

parseEnv();
